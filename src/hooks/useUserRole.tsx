
import { useAuth } from '@/contexts/AuthContext';

export const useUserRole = () => {
  const { currentUser } = useAuth();
  
  // Simulación de roles basada en email
  // En producción esto vendría de la base de datos
  const getUserRole = (email: string) => {
    if (email === 'jhonm21@gmail.com') return 'admin';
    if (email.includes('committee') || email.includes('comite')) return 'committee';
    if (email.includes('concierge') || email.includes('conserje')) return 'concierge';
    return 'resident';
  };

  const role = currentUser ? getUserRole(currentUser.email || '') : null;

  return {
    role,
    isAdmin: role === 'admin',
    isResident: role === 'resident',
    isConcierge: role === 'concierge',
    isCommittee: role === 'committee'
  };
};
