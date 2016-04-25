import angular from 'angular';
import uirouter from 'angular-ui-router';

import { routing,applicationModuleName } from './app.config';


angular.module(applicationModuleName,[uirouter])
  .config(routing);
