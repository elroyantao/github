import angular from 'angular';
import uirouter from 'angular-ui-router';

import routing from './configs/list.routes';
import ListController from './controllers/list.controller';
import GithubHelper from './services/github.services';

export default angular.module('list', [uirouter])
    .factory('GithubHelper', GithubHelper)
    .controller('ListController', ListController)
    .config(routing)
    .name;
