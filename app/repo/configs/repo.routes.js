var template = require('repo/views/repo.html');

routes.$inject = ['$stateProvider'];
export default function routes($stateProvider) {
    $stateProvider
        .state('repo', {
            url: '/repo/:username/:repo',
            templateUrl: template,
            controller: 'RepoController',
            controllerAs: 'repo',
            resolve: {
                Repository: ['GithubHelper', '$stateParams', function(GithubHelper, $stateParams) {
                    return GithubHelper.getRepository($stateParams.username, $stateParams.repo);
                }]
            }
        });
};
