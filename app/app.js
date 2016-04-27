import angular from 'angular';
import uirouter from 'angular-ui-router';

import {
    routing,
    applicationModuleName,
    token
} from './config';

import list from './list';
import repo from './repo';

require('./style.less');

angular.module(applicationModuleName, [uirouter, list, repo])
    .run(token)
    .config(routing);
