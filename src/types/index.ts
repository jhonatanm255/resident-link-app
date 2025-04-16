
export interface Resident {
  id: string;
  name: string;
}

export interface Apartment {
  id: string;
  apartmentNumber: string;
  parkingNumber: string;
  storageUnitNumber: string;
  residents: Resident[];
  condominiumId: string;
}

export interface Condominium {
  id: string;
  name: string;
  address: string;
  apartments: Apartment[];
}

// Nuevas interfaces para funcionalidades móviles

export interface DeviceInfo {
  platform: 'ios' | 'android' | 'web';
  isOnline: boolean;
  appVersion: string;
}

export interface AppSettings {
  notificationsEnabled: boolean;
  darkMode: boolean;
  language: 'es' | 'en';
  autoSync: boolean;
}
