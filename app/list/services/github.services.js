GithubHelper.$inject = ['$http', '$rootScope']
export default function GithubHelper($http, $rootScope) {

    var getMyRepositories = function() {
        return $http.get('//api.github.com/user/repos?access_token=' + $rootScope.user.accessToken)
            .then(function(repos) {
                return repos.data.sort(function(a, b) {
                    if (a.stargazers_count < b.stargazers_count) return 1;
                    else if (a.stargazers_count > b.stargazers_count) return -1;
                    else return 0;
                });
            });
    };

    var getRepository = function(id){
      return $http.get('//api.github.com/repos/'+$rootScope.user.login+'/'+id+'?access_token=' + $rootScope.user.accessToken)
      .then(function(repo){
        return repo.data;
      })
    }

    var hostObject = {
        getMyRepositories: getMyRepositories,
        getRepository : getRepository
    };
    return hostObject;
}
