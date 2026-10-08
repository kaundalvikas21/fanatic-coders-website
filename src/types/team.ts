import type { Response, Schemas } from './api';

export type TeamMember = Schemas['PublicTeamMember'];
export type TeamResponse = Response<TeamMember[]>;
