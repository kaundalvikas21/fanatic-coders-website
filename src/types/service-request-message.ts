import type { Response } from './api';

export type ServiceRequestMessageAuthor = {
  id: string;
  role: string;
  user: {
    id: string;
    name: string;
    image: string | null;
  };
};

export type ServiceRequestMessage = {
  id: string;
  serviceRequestId: string;
  authorMemberId: string;
  body: string;
  isInternal: boolean;
  createdAt: string;
  updatedAt: string;
  author: ServiceRequestMessageAuthor;
};

export type CreateServiceRequestMessageRequest = {
  body: string;
  isInternal?: boolean;
};

export type ServiceRequestMessageResponse = Response<ServiceRequestMessage>;
export type ServiceRequestMessagesResponse = Response<ServiceRequestMessage[]>;
