
export interface Visit {
  id: string;
  residentId: string;
  residentName: string;
  visitorName: string;
  visitorDocument: string;
  visitDate: string;
  visitTime: string;
  qrCode: string;
  numericCode: string;
  status: 'pending' | 'approved' | 'completed' | 'rejected';
  createdAt: string;
  condominiumId: string;
  apartmentNumber: string;
  purpose?: string;
}
