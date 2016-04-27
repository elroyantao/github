export const applicationModuleName = 'github';

routing.$inject = ['$urlRouterProvider', '$locationProvider'];
export function routing($urlRouterProvider, $locationProvider) {
    $urlRouterProvider.otherwise('/');
};

token.$inject = ['$window', '$rootScope']
export function token($window, $rootScope) {
    console.log($window.token);
    $rootScope.user = $window.user;
};
