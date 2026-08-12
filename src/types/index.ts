export type {
  AccessModel,
  AccessOperation,
  AccessPermissions,
  CurrentAccess,
  CurrentAccessData,
  GetCurrentAccessResponse,
} from './access';
export type {
  ApiResponse,
  FailureResponse,
  GetHealthResponse,
  HealthData,
  HealthResponse,
  Pagination,
  RequestPasswordResetRequest,
  RequestPasswordResetResponse,
  Response,
  Schemas,
  SuccessResponse,
} from './api';

export {
  DEFAULT_PROJECT_CURRENCY,
  LEAD_SOURCES,
  LEAD_STATUS_BADGE_VARIANTS,
  LEAD_STATUS_OPTIONS,
  LEAD_STATUSES,
  PROJECT_CURRENCIES,
  PROJECT_CURRENCY_OPTIONS,
  SERVICE_INTEREST_OPTIONS,
  SERVICE_INTERESTS,
  PROJECT_STATUS_BADGE_VARIANTS,
  PROJECT_STATUS_OPTIONS,
  PROJECT_STATUSES,
  SERVICE_REQUEST_STATUS_BADGE_VARIANTS,
  SERVICE_REQUEST_STATUS_OPTIONS,
  SERVICE_REQUEST_STATUSES,
} from './enum';
export type {
  LeadSource,
  LeadStatus,
  ProjectCurrency,
  ProjectMemberRole,
  ProjectStatus,
  ServiceInterest,
  ServiceRequestStatus,
} from './enum';
export type {
  AdminDashboardAttentionTask,
  AdminDashboardAttentionTasksResponse,
  AdminDashboardLeadDistribution,
  AdminDashboardLeadDistributionResponse,
  AdminDashboardOverview,
  AdminDashboardOverviewResponse,
  AdminDashboardRecentLead,
  AdminDashboardRecentLeadsResponse,
  AdminDashboardTaskDistribution,
  AdminDashboardTaskDistributionResponse,
} from './dashboard';
export type {
  GetInvitationsResponse,
  Invitation,
  InvitationListItem,
  InvitationsData,
  InviteMemberRequest,
  InviteMemberResponse,
  InviteMemberRole,
} from './invitation';
export type {
  CreateLeadInput,
  CreateLeadRequest,
  CreateLeadResponse,
  CreatePublicLeadRequest,
  CreatePublicLeadResponse,
  DeleteLeadByIdParams,
  DeleteLeadByIdResponse,
  GetLeadByIdParams,
  GetLeadByIdResponse,
  GetLeadsInput,
  GetLeadsResponse,
  Lead,
  LeadResponse,
  LeadsResponse,
  PaginatedLeads,
  UpdateLeadByIdParams,
  UpdateLeadByIdRequest,
  UpdateLeadByIdResponse,
  UpdateLeadInput,
} from './lead';
export type {
  CreateProposalRequest,
  Proposal,
  ProposalPaymentStatus,
  ProposalResponse,
  ProposalStatus,
  UpdateProposalRequest,
} from './proposal';
export type {
  GetPaymentsInput,
  GetPaymentsResponse,
  PaginatedPayments,
  Payment,
  PaymentsResponse,
  PaymentStatus,
} from './payment';
export type {
  CreateProjectFromServiceRequestRequest,
  CreateProjectFromServiceRequestResponse,
  CreateProjectInput,
  CreateProjectRequest,
  CreateProjectResponse,
  DeleteProjectByIdParams,
  DeleteProjectByIdResponse,
  GetProjectByIdParams,
  GetProjectByIdResponse,
  GetProjectsInput,
  GetProjectsResponse,
  PaginatedProjects,
  Project,
  ProjectMember,
  ProjectResponse,
  ProjectsResponse,
  UpdateProjectByIdParams,
  UpdateProjectByIdRequest,
  UpdateProjectByIdResponse,
  UpdateProjectInput,
} from './project';
export type {
  CreateServiceRequestInput,
  CreateServiceRequestRequest,
  CreateServiceRequestResponse,
  DeleteServiceRequestByIdParams,
  DeleteServiceRequestByIdResponse,
  GetServiceRequestByIdParams,
  GetServiceRequestByIdResponse,
  GetServiceRequestsResponse,
  ServiceRequest,
  ServiceRequestData,
  ServiceRequestResponse,
  ServiceRequestsResponse,
  UpdateServiceRequestByIdParams,
  UpdateServiceRequestByIdRequest,
  UpdateServiceRequestByIdResponse,
  UpdateServiceRequestInput,
} from './service-request';
export { USER_SORT_FIELDS } from './user';
export type {
  CreateTaskRequest,
  Task,
  TaskAssignee,
  TaskPriority,
  TaskResponse,
  TasksResponse,
  TaskStatus,
  UpdateTaskRequest,
} from './task';
export {
  TASK_PRIORITIES,
  TASK_PRIORITY_BADGE_VARIANTS,
  TASK_PRIORITY_OPTIONS,
  TASK_STATUSES,
  TASK_STATUS_BADGE_VARIANTS,
  TASK_STATUS_OPTIONS,
} from './task';
export type {
  DeleteAvatarResponse,
  GetUserMemberResponse,
  GetUsersInput,
  GetUsersResponse,
  OrganizationMemberRole,
  ProfileUser,
  UpdateAvatarResponse,
  User,
  UserListItem,
  UserSortField,
  UsersData,
} from './user';

export interface NavLink {
  label: string;
  href: string;
}

export interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  date: string;
  readTime: string;
  category: string;
  slug: string;
  coverUrl?: string;
  author?: string;
  authorRole?: string;
  authorAvatar?: string;
  tags?: string[];
  /** Article body as headed sections (each id anchors the table of contents). */
  sections?: Array<{ id: string; heading: string; paragraphs?: string[]; blocks?: ArticleBlock[] }>;
  /** Short scannable summary points. */
  takeaways?: string[];
}

/** A rich content block inside an article section. Renders when `blocks` is set; otherwise the section falls back to `paragraphs`. */
export type ArticleBlock =
  | { type: 'p'; text: string }
  | { type: 'code'; lang?: string; code: string }
  | { type: 'list'; ordered?: boolean; items: string[] }
  | { type: 'quote'; text: string; cite?: string };

export interface Service {
  id: string;
  title: string;
  description: string;
  icon: string;
  tags: string[];
  featured?: boolean;
}

export interface Testimonial {
  id: string;
  name: string;
  role: string;
  company: string;
  quote: string;
  rating: number;
  initials: string;
}

export interface TechItem {
  name: string;
  description: string;
  icon?: string;
}

export interface TechCategory {
  label: string;
  items: TechItem[];
}

export interface FAQItem {
  id: string;
  question: string;
  answer: string;
}

export interface PortfolioProject {
  id: string;
  title: string;
  description: string;
  tags: string[];
  stats: Array<{ label: string; value: string; caption?: string; icon?: string }>;
  imageUrl?: string;
  client?: string;
  year?: string;
  industry?: string;
  duration?: string;
  services?: string[];
  overview?: string;
  /** Case-study body blocks (e.g. Challenge / Approach / Result). */
  sections?: Array<{ heading: string; body: string }>;
  /** Delivery steps for the case study: short title, rough duration, what we did. */
  approach?: Array<{ title: string; duration: string; desc: string }>;
  tech?: string[];
  quote?: { text: string; author: string; role: string };
  gallery?: string[];
}

export interface CoreValue {
  id: string;
  title: string;
  description: string;
  icon: string;
}

export interface Partner {
  name: string;
  logoPath: string;
}

export interface TeamMember {
  id: string;
  name: string;
  role: string;
  bio: string;
  avatarUrl: string;
  socials?: { github?: string; linkedin?: string; twitter?: string };
}
