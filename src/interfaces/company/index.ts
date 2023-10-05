import { UserInterface } from 'interfaces/user';
import { GetQueryInterface } from 'interfaces';

export interface CompanyInterface {
  id?: string;
  description?: string;
  image?: string;
  name: string;
  created_at?: any;
  updated_at?: any;
  user_id: string;
  tenant_id: string;
  industry_type?: string;
  number_of_employees?: number;
  annual_revenue?: number;
  company_location?: string;
  company_website?: string;
  company_headquarters?: string;
  company_rating?: number;
  company_ceo?: string;

  user?: UserInterface;
  _count?: {};
}

export interface CompanyGetQueryInterface extends GetQueryInterface {
  id?: string;
  description?: string;
  image?: string;
  name?: string;
  user_id?: string;
  tenant_id?: string;
  industry_type?: string;
  company_location?: string;
  company_website?: string;
  company_headquarters?: string;
  company_ceo?: string;
}
