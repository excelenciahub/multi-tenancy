import { ApiPath } from './api';
import { environment } from 'src/environments/environment';
import { Routes } from './route.url';

export const GlobalConstants = {
    Host: environment.Host,
    CookieKeys: {
        Token: 'Ad-Angular-loginToken',
    },
    HeaderValues: {
        ApplicationJSON: 'application/json',
    },
    DefaultCookieExpirationInHours: 720,
    ApiPath: ApiPath,
    Routes: Routes,

    PhoneRgex: '^(1[ \\-\\+]{0,3}|\\+1[ -\\+]{0,3}|\\+1|\\+)?((\\(\\+?1-[0-9][0-9]{1,2}\\))|(\\(\\+?[0-9][0-9][0-9]\\))|(\\(\\+?[1-9][0-9]\\))|(\\(\\+?[17]\\))|(\\([0-9][0-9]\\))|([ \\-]{0,3}[0-9]{2,4}))?([ \\-][0-9])?([ \\-]{0,3}[0-9]{2,4}){2,3}$',
};

