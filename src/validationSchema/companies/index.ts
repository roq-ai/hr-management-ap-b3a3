import * as yup from 'yup';

export const companyValidationSchema = yup.object().shape({
  description: yup.string().nullable(),
  image: yup.string().nullable(),
  name: yup.string().required(),
  industry_type: yup.string().nullable(),
  number_of_employees: yup.number().integer().nullable(),
  annual_revenue: yup.number().nullable(),
  company_location: yup.string().nullable(),
  company_website: yup.string().nullable(),
  company_headquarters: yup.string().nullable(),
  company_rating: yup.number().nullable(),
  company_ceo: yup.string().nullable(),
  user_id: yup.string().nullable().required(),
});
