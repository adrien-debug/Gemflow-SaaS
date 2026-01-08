export interface CrmContact {
  id: number;
  clientId?: number;
  clientName?: string;
  email: string;
  firstName?: string;
  lastName?: string;
  fullName: string;
  phone?: string;
  company?: string;
  notes?: string;
  tags?: string;
  createdAt: string;
  updatedAt: string;
}

