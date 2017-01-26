var gulp = require('gulp');
var exit = require('gulp-exit');
var Q = require('q');
var mongoose = require('mongoose');
var passwordUtility = require('../api/utilities/password-helper');
var config = require('../api/config.local');
const Config = require('../config');
const USER_ROLES = Config.get('/constants/USER_ROLES');
const BUILDING_MANAGER_ROLES = Config.get('/constants/USER_ROLES');


gulp.task('seed', [], function() {

    mongoose.connect(config.mongo.URI);

    var generateModels = require('../api/models');

    // var hashedPassword = passwordUtility.hash_password('1234');

    return generateModels(mongoose).then(function(models) {

        return models.user.generatePasswordHash("root", function(err, hashedPassword) {

            var password = hashedPassword.hash;

            return dropCollections(models).then(function() {
                console.log("seeding trade expert categories");
                var tradeExpertCategories = [
                    {
                        name: "Mechanical",
                        properties: "For mechanical issues",
                        timeCreated: Date.now()
                    },
                    {
                        name: "Plumbing",
                        properties: "Plumbing related",
                        timeCreated: Date.now()
                    },
                    {
                        name: "Janitorial",
                        properties: "Cleaning related tasks",
                        timeCreated: Date.now()
                    }
                ];
                return models.tradeExpertCategory.create(tradeExpertCategories, function (error, tradeExpertCategories) {

                    if (error) {
                        console.log(error);
                    }
                    console.log("seeding users");
                    var users = [
                        {
                            firstName: 'test',
                            lastName: 'admin',
                            email: 'admin@scal.io',
                            password: password,
                            role: USER_ROLES.ADMIN,
                            timeCreated: Date.now()
                        },
                        {
                            firstName: 'test',
                            lastName: 'bm',
                            email: 'test@buildingManager.com',
                            password: password,
                            role: USER_ROLES.BUILDING_MANAGER,
                            timeCreated: Date.now()
                        },
                        {
                            firstName: 'test',
                            lastName: 'te',
                            email: 'test@tradeExpert.com',
                            password: password,
                            role: USER_ROLES.TRADE_EXPERT,
                            timeCreated: Date.now()
                        }
                    ];
                    return models.user.create(users, function (error, users) {
                        if (error) {
                            console.log(error);
                        }
                        console.log("seeding admin profiles");
                        var admins = [
                            {
                                user: users[0]._id,
                                timeCreated: Date.now()
                            }
                        ];
                        return models.admin.create(admins, function (error, admins) {

                            if (error) {
                                console.log(error);
                            }
                            console.log("seeding building manager profiles");
                            var buildingManagers = [
                                {
                                    user: users[1]._id,
                                    role: BUILDING_MANAGER_ROLES.ADMIN,
                                    timeCreated: Date.now()
                                }
                            ];
                            return models.buildingManager.create(buildingManagers, function (error, buildingManagers) {
                                if (error) {
                                    console.log(error);
                                }
                                console.log("seeding trade expert profiles");
                                var tradeExperts = [
                                    {
                                        user: users[2]._id,
                                        category: tradeExpertCategories[0]._id,
                                        timeCreated: Date.now()
                                    }
                                ];
                                return models.tradeExpert.create(tradeExperts, function (error, tradeExperts) {
                                    if (error) {
                                        console.log(error);
                                    }
                                    console.log("linking admin profile to user");
                                    users[0].admin = admins[0]._id;
                                    return models.user.findByIdAndUpdate(users[0]._id, users[0], function (error, user0) {
                                        if (error) {
                                            console.log(error);
                                        }
                                        console.log("linking building manager profile to user");
                                        users[1].buildingManager = buildingManagers[0]._id;
                                        return models.user.findByIdAndUpdate(users[1]._id, users[1], function (error, user1) {
                                            if (error) {
                                                console.log(error);
                                            }
                                            console.log("linking trade expert profile to user");
                                            users[2].tradeExpert = tradeExperts[0]._id;
                                            return models.user.findByIdAndUpdate(users[2]._id, users[2], function (error, user2) {
                                                if (error) {
                                                    console.log(error);
                                                }
                                                console.log("seeding facilities");
                                                var facilities = [
                                                    {
                                                        name: 'Kitchen',
                                                        type: 'Culinary',
                                                        timeCreated: Date.now()
                                                    },
                                                    {
                                                        name: 'Pantry',
                                                        type: 'Storage',
                                                        timeCreated: Date.now()
                                                    },
                                                ];
                                                return models.facility.create(facilities, function (error, facilities) {
                                                    if (error) {
                                                        console.log(error);
                                                    }
                                                    console.log("seeding facility incidents");
                                                    var facilityIncidents = [
                                                        {
                                                            name: 'Spill',
                                                            category: tradeExpertCategories[2]._id,
                                                            facility: facilities[0]._id,
                                                            timeCreated: Date.now()
                                                        },
                                                        {
                                                            name: 'Explosion',
                                                            category: tradeExpertCategories[0]._id,
                                                            facility: facilities[1]._id,
                                                            timeCreated: Date.now()
                                                        },
                                                        {
                                                            name: 'Clog',
                                                            category: tradeExpertCategories[1]._id,
                                                            facility: facilities[0]._id,
                                                            timeCreated: Date.now()
                                                        },
                                                    ];
                                                    return models.facilityIncident.create(facilityIncidents, function (error, facilityIncidents) {
                                                        if (error) {
                                                            console.log(error);
                                                        }
                                                        return gulp.src("")
                                                            .pipe(exit());
                                                    });
                                                });
                                            });
                                        });
                                    });
                                });
                            });
                        });
                    })
                });
            })
        })
    });
});

function dropCollections(models) {
    var deferred = Q.defer();
    models.tradeExpertCategory.remove({}, function(err) {
        console.log('trade expert categories removed');
        models.user.remove({}, function(err) {
            console.log('users removed');
            models.admin.remove({}, function (err) {
                console.log('admin removed');
                models.buildingManager.remove({}, function (err) {
                    console.log('buildingManager removed');
                    models.tradeExpert.remove({}, function (err) {
                        console.log('tradeExpert removed');
                        models.facility.remove({}, function (err) {
                            console.log('facility removed');
                            models.facilityIncident.remove({}, function (err) {
                                console.log('facilityIncident removed');
                                deferred.resolve();
                            });
                        });
                    });
                });
            });
        })
    });
    return deferred.promise;
}

gulp.task('models', function() {
    return gulp.src('./seed/**/*.*')
        .pipe(gulp.dest('api/models'));
});