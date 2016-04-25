export const applicationModuleName = 'github';

routing.$inject = ['$urlRouterProvider', '$locationProvider'];
export function routing($urlRouterProvider, $locationProvider) {
  $locationProvider.html5Mode(true);
  $urlRouterProvider.otherwise('/');
};
