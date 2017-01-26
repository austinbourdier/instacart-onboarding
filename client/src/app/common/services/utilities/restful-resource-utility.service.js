'use strict';

//TODO: automatically delete association arrays before update

angular.module('app.services.utility')
    .factory('restfulResourceHelper', function ($log, $http, API, stringHelper) {
        return {
            generateCrudCallers:function(resourceRoute){

                return {
                    list:this.generateListCaller(resourceRoute),
                    find:this.generateFindCaller(resourceRoute),
                    update:this.generateUpdateCaller(resourceRoute),
                    create:this.generateCreateCaller(resourceRoute),
                    deleteOne:this.generateDeleteOneCaller(resourceRoute),
                    deleteMany:this.generateDeleteManyCaller(resourceRoute)
                }
            },
            generateListCaller:function(resourceRoute){
                return function(params){
                    $log.debug(resourceRoute + ".list + params: ", params);

                    if (!params) {
                        params = { isDeleted: false };
                    }
                    else if (!params.isDeleted) {
                        params.isDeleted = false;
                    }

                    return $http.get(API.BASE_URL + resourceRoute, { params:params })
                        .then(function(response){
                            $log.debug(resourceRoute + ".list response:\n", response);
                            return response;
                        })
                        .catch(function(error){
                            $log.error(resourceRoute + ".list error:\n", error);
                            throw error;
                        });
                }
            },
            generateFindCaller:function(resourceRoute){
                return function(_id, params){
                    $log.debug(resourceRoute + ".find + _id: ", _id, ", params: ", params);

                    return $http.get(API.BASE_URL + resourceRoute + "/" + _id, { params:params })
                        .then(function(response){
                            $log.debug(resourceRoute + ".find response:\n", response);
                            return response;
                        })
                        .catch(function(error){
                            $log.error(resourceRoute + ".find error:\n", error);
                            throw error;
                        });
                }
            },
            generateUpdateCaller:function(resourceRoute){
                return function(_id, payload){
                    delete payload.createdAt;
                    delete payload.updatedAt;
                    delete payload.isDeleted;
                    $log.debug(resourceRoute + ".update + _id: ", _id, ", payload: ", payload);

                    return $http.put(API.BASE_URL + resourceRoute + "/" + _id, payload)
                        .then(function(response){
                            $log.debug(resourceRoute + ".update response:\n", response);
                            return response;
                        })
                        .catch(function(error){
                            $log.error(resourceRoute + ".update error:\n", error);
                            throw error;
                        });
                }
            },
            generateCreateCaller:function(resourceRoute){
                return function(payload){
                    $log.debug(resourceRoute + ".create + payload: ", payload);

                    return $http.post(API.BASE_URL + resourceRoute, payload)
                        .then(function(response){
                            $log.debug(resourceRoute + ".create response:\n", response);
                            return response;
                        })
                        .catch(function(error){
                            $log.error(resourceRoute + ".create error:\n", error);
                            throw error;
                        });
                }
            },
            generateDeleteOneCaller:function(resourceRoute){
                return function(_id, hardDelete){
                    hardDelete = hardDelete || false;
                    $log.debug(resourceRoute + ".deleteOne + _id: ", _id, ", hardDelete: ", hardDelete);

                    return $http({
                        method: 'DELETE',
                        url: API.BASE_URL + resourceRoute + "/" + _id,
                        data: { hardDelete: hardDelete }
                    })
                        .then(function(response){
                            $log.debug(resourceRoute + ".delete response:\n", response);
                            return response;
                        })
                        .catch(function(error){
                            $log.debug(resourceRoute + ".delete error:\n", error);
                            throw error;
                        });
                }
            },
            generateDeleteManyCaller:function(resourceRoute){
                return function(payload){
                    $log.debug(resourceRoute + ".deleteMany + payload", payload);

                    return $http({
                        method: 'DELETE',
                        url: API.BASE_URL,
                        data: payload
                    })
                        .then(function(response){
                            $log.debug(resourceRoute + ".delete response:\n", response);
                            return response;
                        })
                        .catch(function(error){
                            $log.debug(resourceRoute + ".delete error:\n", error);
                            throw error;
                        });
                }
            },
            generateOneToManyAssociationCallers:function(ownerRoute, associationName, associationRoute, childName){
                var resourceMethodName = associationName[0].toUpperCase() + associationName.slice(1);
                var callers = {};
                callers["get" + resourceMethodName + "s"] = this.generateGetAssociationsAssociationCaller(ownerRoute, associationRoute);
                callers["addOne" + resourceMethodName] = this.generateAddOneAssociationCaller(ownerRoute, associationRoute);
                callers["removeOne" + resourceMethodName] = this.generateRemoveOneAssociationCaller(ownerRoute, associationRoute);
                callers["addMany" + resourceMethodName + "s"] = this.generateAddManyAssociationCaller(ownerRoute, associationRoute);
                callers["removeMany" + resourceMethodName + "s"] = this.generateRemoveManyAssociationCaller(ownerRoute, associationRoute);

                callers["flatten" + resourceMethodName + "s"] = this.generateFlattenAssociationData(associationName, childName);
                return callers;
            },
            generateGetAssociationsAssociationCaller:function(ownerRoute, associationRoute){
                return function(ownerId, params){
                    $log.debug(ownerRoute + ".getAssociations + ownerId: ", ownerId, ", params: ", params);

                    if (!params) {
                        params = { isDeleted: false };
                    }
                    else if (!params.isDeleted) {
                        params.isDeleted = false;
                    }

                    return $http.get(API.BASE_URL + ownerRoute + "/" + ownerId + "/" + associationRoute, {
                        params:params
                    })
                        .then(function(response){
                            $log.debug(ownerRoute + ".getAssociations response:\n", response);
                            return response;
                        })
                        .catch(function(error){
                            $log.error(ownerRoute + ".getAssociations error:\n", error);
                            throw error;
                        });
                }
            },
            generateAddOneAssociationCaller:function(ownerRoute, associationRoute){
                return function(ownerId, childId, payload) {
                    $log.debug(ownerRoute + ".addOneAssociation + ownerId: ", ownerId, "childId: ", childId, ", payload: ", payload);

                    return $http.put(API.BASE_URL + ownerRoute + "/" + ownerId + "/" + associationRoute + "/" + childId, payload)
                        .then(function (response) {
                            $log.debug(ownerRoute + ".addOneAssociation response:\n", response);
                            return response;
                        })
                        .catch(function (error) {
                            $log.error(ownerRoute + ".addOneAssociation error:\n", error);
                            throw error;
                        });
                }
            },
            generateRemoveOneAssociationCaller:function(ownerRoute, associationRoute){
                return function(ownerId, childId){
                    $log.debug(ownerRoute + ".removeOneAssociation + ownerId: ", ownerId, "childResource: ", associationRoute, "childId: ", childId);

                    return $http.delete(API.BASE_URL + ownerRoute + "/" + ownerId + "/" + associationRoute + "/" + childId)
                        .then(function(response){
                            $log.debug(ownerRoute + ".removeOneAssociation response:\n", response);
                            return response;
                        })
                        .catch(function(error){
                            $log.error(ownerRoute + ".removeOneAssociation error:\n", error);
                            throw error;
                        });
                }
            },
            generateAddManyAssociationCaller:function(ownerRoute, associationRoute){
                return function(ownerId, payload){
                    $log.debug(ownerRoute + ".addManyAssociations + ownerId: ", ownerId, ", payload: ", payload);

                    return $http.post(API.BASE_URL + ownerRoute + "/" + ownerId + "/" + associationRoute, payload)
                        .then(function(response){
                            $log.debug(ownerRoute + ".addManyAssociations response:\n", response);
                            return response;
                        })
                        .catch(function(error){
                            $log.error(ownerRoute + ".addManyAssociations error:\n", error);
                            throw error;
                        });
                }
            },
            generateRemoveManyAssociationCaller:function(ownerRoute, associationRoute){
                return function(ownerId, payload){
                    $log.debug(ownerRoute + ".removeManyAssociations + ownerId: ", ownerId, ", payload: ", payload);

                    return $http({
                        method: 'DELETE',
                        url: API.BASE_URL + ownerRoute + "/" + ownerId + "/" + associationRoute,
                        data: payload
                    })
                        .then(function(response){
                            $log.debug(ownerRoute + ".removeManyAssociations response:\n", response);
                            return response;
                        })
                        .catch(function(error){
                            $log.error(ownerRoute + ".removeManyAssociations error:\n", error);
                            throw error;
                        });
                }
            },
            /**
             * Flattens MANY_MANY relationships so just the associated object is returned and no extra fields
             * @returns {Function}
             */
            generateFlattenAssociationData:function(associationName, childName) {
                return function(data) {
                    if (!data) {
                        return [];
                    }
                    return data.map(function(object) {
                        if (childName) {
                            return object[childName];
                        }
                        else {
                            return object[associationName];
                        }
                    })
                }
            }
        }
    });
