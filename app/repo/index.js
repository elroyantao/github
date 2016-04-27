import angular from 'angular';
import uirouter from 'angular-ui-router';

import routing from './configs/repo.routes';
import RepoController from './controllers/repo.controller';
import GithubHelper from '../list/services/github.services';

export default angular.module('repo', [uirouter])
    .factory('GithubHelper', GithubHelper)
    .controller('RepoController', RepoController)
    .config(routing)
    .name;

console.log('done');
