
export type UserRole = 'admin' | 'resident' | 'concierge' | 'committee';

export interface UserProfile {
  id: string;
  email: string;
  role: UserRole;
  name?: string;
  condominiumId?: string;
  apartmentId?: string;
}
