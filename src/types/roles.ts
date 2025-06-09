
export type UserRole = 'admin' | 'resident' | 'concierge';

export interface UserProfile {
  id: string;
  email: string;
  role: UserRole;
  name?: string;
  condominiumId?: string;
  apartmentId?: string;
}
