export type {
  ApiResponse,
  FailureResponse,
  GetHealthResponse,
  HealthData,
  HealthResponse,
  Response,
  Schemas,
  SuccessResponse,
} from './api';

export {
  LEAD_SOURCES,
  LEAD_STATUSES,
  ROLES,
  SERVICE_INTEREST_OPTIONS,
  SERVICE_INTERESTS,
} from './enum';
export type { LeadSource, LeadStatus, Role, ServiceInterest } from './enum';
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
  GetLeadsResponse,
  Lead,
  LeadResponse,
  LeadsResponse,
  UpdateLeadByIdParams,
  UpdateLeadByIdRequest,
  UpdateLeadByIdResponse,
  UpdateLeadInput,
} from './lead';
export type { User } from './user';

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
