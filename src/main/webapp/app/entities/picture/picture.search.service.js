(function() {
    'use strict';

    angular
        .module('krakowskiTargApp')
        .factory('PictureSearch', PictureSearch);

    PictureSearch.$inject = ['$resource'];

    function PictureSearch($resource) {
        var resourceUrl =  'api/_search/pictures/:id';

        return $resource(resourceUrl, {}, {
            'query': { method: 'GET', isArray: true}
        });
    }
})();
