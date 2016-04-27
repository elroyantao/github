var template = require('list/views/list.html');

routes.$inject = ['$stateProvider'];
export default function routes($stateProvider) {
    $stateProvider
        .state('list', {
            url: '/',
            templateUrl: template,
            controller: 'ListController',
            controllerAs: 'list',
            resolve: {
                Repositories: ['GithubHelper', function(GithubHelper) {
                    console.log('xx');
                    return GithubHelper.getMyRepositories();
                }]
            }
        });
};
