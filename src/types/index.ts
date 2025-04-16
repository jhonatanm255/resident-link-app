
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
