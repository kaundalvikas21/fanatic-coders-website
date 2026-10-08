import type { operations } from './backend-types';
import type { Response, Schemas } from './api';

export type Portfolio = Schemas['Portfolio'];
export type PortfolioAddon = Schemas['PortfolioAddon'];
export type PortfolioAddonInput = Schemas['PortfolioAddonInput'];
export type PortfolioSectionType = Extract<
  PortfolioAddonInput['type'],
  'CHALLENGE' | 'APPROACH' | 'DELIVERY' | 'RESULTS'
>;
export type PortfolioAddonWriteRequest = Pick<
  PortfolioAddonInput,
  'title' | 'content' | 'imageUrl'
> & { type: PortfolioSectionType; cards?: (PortfolioStepCard | PortfolioMetricCard)[] };
export type PortfolioStepCard = Schemas['PortfolioStepCard'];
export type PortfolioMetricCard = Omit<Schemas['PortfolioMetricCard'], 'icon'>;
export type CreatePortfolioInput = Schemas['CreatePortfolioRequest'];
export type UpdatePortfolioInput = Schemas['UpdatePortfolioRequest'];

export type PaginatedPortfolios = Schemas['PortfoliosResponse']['data'];
export type PortfoliosResponse = Response<PaginatedPortfolios>;
export type PortfolioResponse = Response<Portfolio>;
export type PortfolioAddonResponse = Response<PortfolioAddon>;

export type GetPortfoliosInput = NonNullable<operations['getPortfolios']['parameters']['query']> & {
  title?: string;
};
export type GetPortfoliosResponse = PortfoliosResponse;
export type GetPublishedPortfoliosInput = NonNullable<
  operations['getPublishedPortfolios']['parameters']['query']
>;
export type GetPublishedPortfoliosResponse = PortfoliosResponse;
export type GetPublishedPortfolioBySlugParams =
  operations['getPublishedPortfolioBySlug']['parameters']['path'];
export type GetPublishedPortfolioBySlugResponse = PortfolioResponse;
export type CreatePortfolioRequest = CreatePortfolioInput;
export type CreatePortfolioResponse = PortfolioResponse;
export type GetPortfolioByIdParams = operations['getPortfolioById']['parameters']['path'];
export type GetPortfolioByIdResponse = PortfolioResponse;
export type UpdatePortfolioByIdParams = operations['updatePortfolioById']['parameters']['path'];
export type UpdatePortfolioByIdRequest = UpdatePortfolioInput;
export type UpdatePortfolioByIdResponse = PortfolioResponse;
export type DeletePortfolioByIdParams = operations['deletePortfolioById']['parameters']['path'];
export type DeletePortfolioByIdResponse = PortfolioResponse;
