
var template = require('repo/views/repo.html');

routes.$inject = ['$stateProvider'];
export default function routes($stateProvider) {
  $stateProvider
    .state('repo', {
      url: '/repo/:id',
      templateUrl: template,
      controller: 'RepoController',
      controllerAs: 'repo',
      resolve : {
        Repository : ['GithubHelper','$stateParams',function(GithubHelper,$stateParams){
          return GithubHelper.getRepository($stateParams.id);
        }]
      }
    });
};
