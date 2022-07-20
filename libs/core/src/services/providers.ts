import { Provider } from '@spryker-oryx/injector';
import {
  AccessTokenService,
  AuthService,
  DefaultAccessTokenService,
  DefaultAuthService,
} from './auth';
import { ContextService, DefaultContextService } from './context';
import { DefaultHttpService, HttpService } from './http';
import { DefaultStorageService, StorageService } from './storage';
import {
  DefaultJsonAPITransformerService,
  DefaultTransformerService,
  JsonAPITransformerService,
  TransformerService,
} from './transformer';

export const CORE_PROVIDERS: Provider[] = [
  {
    provide: HttpService,
    useClass: DefaultHttpService,
  },
  {
    provide: ContextService,
    useClass: DefaultContextService,
  },
  {
    provide: AccessTokenService,
    useClass: DefaultAccessTokenService,
  },
  {
    provide: AuthService,
    useClass: DefaultAuthService,
  },
  {
    provide: JsonAPITransformerService,
    useClass: DefaultJsonAPITransformerService,
  },
  {
    provide: TransformerService,
    useClass: DefaultTransformerService,
  },
  {
    provide: StorageService,
    useClass: DefaultStorageService,
  },
];
