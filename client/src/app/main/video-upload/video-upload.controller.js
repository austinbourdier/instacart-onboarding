(function() {
    'use strict';

    angular
        .module('main.video-upload')
        .controller('VideoUploadModalController', VideoUploadModalController);

    function VideoUploadModalController($scope, $log, $http, Upload, $uibModalInstance, videoUploadService, AWS_S3_UPLOAD) {
        $scope.vm = {
            title: null,
            video: null,
            progress: 0,
            addVideoFile: addVideoFile,
            upload: upload,
            cancel: cancel,
            done: done
        };

        var cleanedFilename;
        var videoExtension = "";

        function addVideoFile(file) {
            if (file) {
                $scope.vm.video = file;
                $scope.add_video.file.$invalid = false;
                $scope.add_video.file.$error.required = false;

                videoExtension = file.name.substr((~-file.name.lastIndexOf(".") >>> 0) + 2);
            }
        }

        function upload() {
            if ($scope.add_video.$valid && $scope.vm.video) {

                // convert filename spaces and special chars
                cleanedFilename = cleanFilename($scope.vm.title);

                Upload.upload({
                    url: AWS_S3_UPLOAD.s3url, //S3 upload url including bucket name
                    method: 'POST',
                    data: {
                        key: cleanedFilename + "." + videoExtension, // the key to store the file on S3, could be file name or customized
                        AWSAccessKeyId: AWS_S3_UPLOAD.AWSAccessKeyId,
                        acl: 'public-read', // sets the access to the uploaded file in the bucket: private, public-read, ...
                        policy: AWS_S3_UPLOAD.policy,
                        signature: AWS_S3_UPLOAD.signature, // base64-encoded signature based on policy string (see article below)
                        "Content-Type": $scope.vm.video.type != '' ? $scope.vm.video.type : 'application/octet-stream', // content type of the file (NotEmpty)
                        filename: cleanedFilename + "." + videoExtension, // this is needed for Flash polyfill IE8-9
                        file: $scope.vm.video
                    },
                    headers: {
                        'Authorization': undefined // we dont want to send auth: bearer JWT for s3 uploads
                    }
                }).then(function(response) {
                    $log.debug('Upload to S3 Success:', response);

                    var title = $scope.vm.title;
                    var url = response.config.url + response.config.data.filename;
                    //$log.debug('url: ' + url);

                    // video to db
                    videoUploadService.create(title,url).then(function(response) {

                        if (response) {
                            $log.debug('VIDEO ADDED', response);
                        }
                    });

                }, function(resp) {
                    $log.debug('Error status: ' + resp.status);
                }, function(evt) {
                    var progressPercentage = parseInt(100.0 * evt.loaded / evt.total);
                    $scope.vm.progress = progressPercentage;
                    $log.debug('progress: ' + progressPercentage + '% ' + evt.config.data.file.name);
                });
            }
            else {
                $scope.add_video.submitted = true;
                if (!$scope.vm.video) {
                    $scope.add_video.file.$invalid = true;
                    $scope.add_video.file.$error.required = true;
                }
            }
        }

        function cancel() {
            $uibModalInstance.close();
        }

        function done() {
            $log.debug($scope.vm.video)
            $uibModalInstance.close({
                src: AWS_S3_UPLOAD.s3url + cleanedFilename + "." + videoExtension,
                title: $scope.vm.title,
                ext: videoExtension
            })
        }

        // private - clean filename of spaces and special characters
        function cleanFilename(inputString){
            // get timestamp in milliseconds
            var timestamp = Date.now();

            //filename contains "~!@#$%^&*()_+=`{}[]|\:;'<>,./?Some actual text to keep, maybe...",
            var outputString = inputString.replace(/([~!@#$%^&*()_+=`{}\[\]\|\\:;'<>,.\/? ])+/g, '-').replace(/^(-)+|(-)+$/g,'');
            var outputStringWithTimestamp = outputString+'-'+timestamp;
            $log.debug("cleanedFilename-outputStringWithTimestamp", outputStringWithTimestamp);
            return outputStringWithTimestamp;

            // var cleaned;
            // cleaned = filename.replace(/[`~!@#$%^&*()_|+\-=?;:'",.<>\{\}\[\]\\\/]/gi, '');
            // cleaned = cleaned.replace(' ','-');
            // return cleaned;
        }

    }

})();
