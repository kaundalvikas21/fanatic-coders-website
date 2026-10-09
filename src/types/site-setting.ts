import type { operations } from './backend-types';
import type { Schemas } from './api';

export type SiteSetting = Schemas['SiteSetting'];
export type SiteSettingResponse = Schemas['SiteSettingResponse'];
export type GetSiteSettingResponse =
  operations['getSiteSetting']['responses'][200]['content']['application/json'];
export type UpdateSiteSettingRequest =
  operations['updateSiteSetting']['requestBody']['content']['application/json'];
export type UpdateSiteSettingResponse =
  operations['updateSiteSetting']['responses'][200]['content']['application/json'];
