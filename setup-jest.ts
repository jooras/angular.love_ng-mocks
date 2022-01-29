import 'jest-preset-angular/setup-jest';
import './jest-global-mocks';
import { ngMocks } from 'ng-mocks';

ngMocks.autoSpy('jest');
