var gulp = require('gulp');
var async = require('async');
var exit = require('gulp-exit');
var Q = require('q');
var mongoose = require('mongoose');
var passwordUtility = require('../api/utilities/password-helper');
var config = require('../api/config.local');
const Config = require('../config');
const USER_ROLES = Config.get('/constants/USER_ROLES');
const BUILDING_MANAGER_ROLES = Config.get('/constants/USER_ROLES');

var applicantBulkData = {
  '2014-12-01-2014-12-07': {
    applied: 100,
    quiz_started: 50,
    quiz_completed: 20,
    onboarding_requested: 10,
    onboarding_completed: 5,
    hired: 1,
    rejected: 0
  },
  '2014-12-08-2014-12-14': {
    applied: 200,
    quiz_started: 75,
    quiz_completed: 50,
    onboarding_requested: 20,
    onboarding_completed: 10,
    hired: 5,
    rejected: 0
  },
  '2014-12-15-2014-12-21': {
    applied: 70,
    quiz_started: 20,
    quiz_completed: 10,
    onboarding_requested: 0,
    onboarding_completed: 0,
    hired: 0,
    rejected: 0
  },
  '2014-12-22-2014-12-28': {
    applied: 40,
    quiz_started: 20,
    quiz_completed: 15,
    onboarding_requested: 5,
    onboarding_completed: 1,
    hired: 1,
    rejected: 0
  }
}
gulp.task('seed', [], function() {

    mongoose.connect(config.mongo.URI);

    var generateModels = require('../api/models');


    return generateModels(mongoose).then(function(models) {

        return dropCollections(models).then(function() {
            var part2applicants = [];
            async.forEach(Object.keys(applicantBulkData), function(week, callbackOne) {
                async.forEach(Object.keys(applicantBulkData[week]), function(applicant_type, callbackTwo) {
                    if(applicantBulkData[week][applicant_type] !== 0) {
                        async.times(applicantBulkData[week][applicant_type], function(index, callbackThree){
                            var result = new Date(week.slice(0,10));
                            result.setDate(new Date(week.slice(0,10)).getDate() + Math.round(Math.random()*6));
                            var applicant = {
                                timeApplied: result,
                                workflow_status: applicant_type
                            };
                            part2applicants.push(applicant);

                            callbackThree()
                        }, function(err, objects) {
                            console.log('step4')
                            callbackTwo();
                        });
                    } else {
                        callbackTwo();
                    }
                }, function (err) {
                    if(err) {
                        console.log(err)
                    } else {
                        console.log('step3')
                        callbackOne();
                    }
                })
            }, function (err) {
                if(err) {
                    console.log(err)
                }

                return models.part2application.create(part2applicants, function (error, result) {
                    if (error) {
                        console.log(error);
                    }
                    console.log(result)

                    return gulp.src("").pipe(exit());
                });
            })
        })
    });
});

function dropCollections(models) {
    var deferred = Q.defer();
    models.part2application.remove({}, function(err) {
        console.log('part 2 applicants removed');
        deferred.resolve();
    });
    return deferred.promise;
}

gulp.task('models', function() {
    return gulp.src('./seed/**/*.*')
        .pipe(gulp.dest('api/models'));
});
