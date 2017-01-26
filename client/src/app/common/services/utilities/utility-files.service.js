(function() {
    'use strict';

    angular
        .module('app.services.utility')
        .factory('fileService', fileService);

    function fileService($log, $q, Upload, AWS_S3_UPLOAD) {
        var form = {};

        form.uploadFile = function(file) {
            if (file && !(typeof file === 'string' || file instanceof String)) {

                return Upload.upload({
                    url: AWS_S3_UPLOAD.s3url, //S3 upload url including bucket name
                    method: 'POST',
                    data: {
                        key: file.name, // the key to store the file on S3, could be file name or customized
                        AWSAccessKeyId: AWS_S3_UPLOAD.AWSAccessKeyId,
                        acl: 'public-read', // sets the access to the uploaded file in the bucket: private, public-read, ...
                        policy: AWS_S3_UPLOAD.policy,
                        signature: AWS_S3_UPLOAD.signature, // base64-encoded signature based on policy string (see article below)
                        "Content-Type": file.type != '' ? file.type : 'application/octet-stream', // content type of the file (NotEmpty)
                        filename: file.name, // this is needed for Flash polyfill IE8-9
                        file: file
                    },
                    headers: {
                        'Authorization': undefined // we dont want to send auth: bearer JWT for s3 uploads
                    }
                }).then(function(response) {
                    $log.debug('Upload to S3 Success:', response);

                    var url = response.config.url + response.config.data.filename;

                    return url;

                }, function(resp) {
                    $log.error('Error status: ' + resp.status);
                }, function(evt) {
                    var progressPercentage = parseInt(100.0 * evt.loaded / evt.total);
                    $log.debug('progress: ' + progressPercentage + '% ' + evt.config.data.file.name);
                });
            }
            else {
                $log.debug('No file to upload');
                return $q.when(file);
            }
        };

        return form;
    }


})();
