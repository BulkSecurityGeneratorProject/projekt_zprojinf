(function() {
    'use strict';

    angular
        .module('krakowskiTargApp')
        .config(stateConfig);

    stateConfig.$inject = ['$stateProvider'];

    function stateConfig($stateProvider) {
        $stateProvider
        .state('picture', {
            parent: 'entity',
            url: '/picture',
            data: {
                authorities: ['ROLE_USER'],
                pageTitle: 'krakowskiTargApp.picture.home.title'
            },
            views: {
                'content@': {
                    templateUrl: 'app/entities/picture/pictures.html',
                    controller: 'PictureController',
                    controllerAs: 'vm'
                }
            },
            resolve: {
                translatePartialLoader: ['$translate', '$translatePartialLoader', function ($translate, $translatePartialLoader) {
                    $translatePartialLoader.addPart('picture');
                    $translatePartialLoader.addPart('global');
                    return $translate.refresh();
                }]
            }
        })
        .state('picture-detail', {
            parent: 'picture',
            url: '/picture/{id}',
            data: {
                authorities: ['ROLE_USER'],
                pageTitle: 'krakowskiTargApp.picture.detail.title'
            },
            views: {
                'content@': {
                    templateUrl: 'app/entities/picture/picture-detail.html',
                    controller: 'PictureDetailController',
                    controllerAs: 'vm'
                }
            },
            resolve: {
                translatePartialLoader: ['$translate', '$translatePartialLoader', function ($translate, $translatePartialLoader) {
                    $translatePartialLoader.addPart('picture');
                    return $translate.refresh();
                }],
                entity: ['$stateParams', 'Picture', function($stateParams, Picture) {
                    return Picture.get({id : $stateParams.id}).$promise;
                }],
                previousState: ["$state", function ($state) {
                    var currentStateData = {
                        name: $state.current.name || 'picture',
                        params: $state.params,
                        url: $state.href($state.current.name, $state.params)
                    };
                    return currentStateData;
                }]
            }
        })
        .state('picture-detail.edit', {
            parent: 'picture-detail',
            url: '/detail/edit',
            data: {
                authorities: ['ROLE_USER']
            },
            onEnter: ['$stateParams', '$state', '$uibModal', function($stateParams, $state, $uibModal) {
                $uibModal.open({
                    templateUrl: 'app/entities/picture/picture-dialog.html',
                    controller: 'PictureDialogController',
                    controllerAs: 'vm',
                    backdrop: 'static',
                    size: 'lg',
                    resolve: {
                        entity: ['Picture', function(Picture) {
                            return Picture.get({id : $stateParams.id}).$promise;
                        }]
                    }
                }).result.then(function() {
                    $state.go('^', {}, { reload: false });
                }, function() {
                    $state.go('^');
                });
            }]
        })
        .state('picture.new', {
            parent: 'picture',
            url: '/new',
            data: {
                authorities: ['ROLE_USER']
            },
            onEnter: ['$stateParams', '$state', '$uibModal', function($stateParams, $state, $uibModal) {
                $uibModal.open({
                    templateUrl: 'app/entities/picture/picture-dialog.html',
                    controller: 'PictureDialogController',
                    controllerAs: 'vm',
                    backdrop: 'static',
                    size: 'lg',
                    resolve: {
                        entity: function () {
                            return {
                                id: null
                            };
                        }
                    }
                }).result.then(function() {
                    $state.go('picture', null, { reload: 'picture' });
                }, function() {
                    $state.go('picture');
                });
            }]
        })
        .state('picture.edit', {
            parent: 'picture',
            url: '/{id}/edit',
            data: {
                authorities: ['ROLE_USER']
            },
            onEnter: ['$stateParams', '$state', '$uibModal', function($stateParams, $state, $uibModal) {
                $uibModal.open({
                    templateUrl: 'app/entities/picture/picture-dialog.html',
                    controller: 'PictureDialogController',
                    controllerAs: 'vm',
                    backdrop: 'static',
                    size: 'lg',
                    resolve: {
                        entity: ['Picture', function(Picture) {
                            return Picture.get({id : $stateParams.id}).$promise;
                        }]
                    }
                }).result.then(function() {
                    $state.go('picture', null, { reload: 'picture' });
                }, function() {
                    $state.go('^');
                });
            }]
        })
        .state('picture.delete', {
            parent: 'picture',
            url: '/{id}/delete',
            data: {
                authorities: ['ROLE_USER']
            },
            onEnter: ['$stateParams', '$state', '$uibModal', function($stateParams, $state, $uibModal) {
                $uibModal.open({
                    templateUrl: 'app/entities/picture/picture-delete-dialog.html',
                    controller: 'PictureDeleteController',
                    controllerAs: 'vm',
                    size: 'md',
                    resolve: {
                        entity: ['Picture', function(Picture) {
                            return Picture.get({id : $stateParams.id}).$promise;
                        }]
                    }
                }).result.then(function() {
                    $state.go('picture', null, { reload: 'picture' });
                }, function() {
                    $state.go('^');
                });
            }]
        });
    }

})();
