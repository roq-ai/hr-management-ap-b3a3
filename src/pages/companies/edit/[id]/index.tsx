import {
  FormControl,
  FormLabel,
  Input,
  Button,
  Text,
  Box,
  Spinner,
  FormErrorMessage,
  Switch,
  Flex,
  Center,
} from '@chakra-ui/react';
import Breadcrumbs from 'components/breadcrumb';
import DatePicker from 'components/date-picker';
import { Error } from 'components/error';
import { FormWrapper } from 'components/form-wrapper';
import { NumberInput } from 'components/number-input';
import { SelectInput } from 'components/select-input';
import { AsyncSelect } from 'components/async-select';
import { TextInput } from 'components/text-input';
import AppLayout from 'layout/app-layout';
import { FormikHelpers, useFormik } from 'formik';
import { useRouter } from 'next/router';
import { FunctionComponent, useState, useRef } from 'react';
import * as yup from 'yup';
import useSWR from 'swr';
import { AccessOperationEnum, AccessServiceEnum, requireNextAuth, withAuthorization } from '@roq/nextjs';
import { compose } from 'lib/compose';
import { ImagePicker } from 'components/image-file-picker';
import { getCompanyById, updateCompanyById } from 'apiSdk/companies';
import { companyValidationSchema } from 'validationSchema/companies';
import { CompanyInterface } from 'interfaces/company';
import { UserInterface } from 'interfaces/user';
import { getUsers } from 'apiSdk/users';

function CompanyEditPage() {
  const router = useRouter();
  const id = router.query.id as string;
  const imageUploaderRef = useRef(null);
  const { data, error, isLoading, mutate } = useSWR<CompanyInterface>(
    () => (id ? `/companies/${id}` : null),
    () => getCompanyById(id),
  );
  const [formError, setFormError] = useState(null);

  const handleSubmit = async (values: CompanyInterface, { resetForm }: FormikHelpers<any>) => {
    setFormError(null);
    try {
      await imageUploaderRef.current.handleUpload();
      const updated = await updateCompanyById(id, values);
      mutate(updated);
      resetForm();
      router.push('/companies');
    } catch (error: any) {
      if (error?.response.status === 403) {
        setFormError({ message: "You don't have permisisons to update this resource" });
      } else {
        setFormError(error);
      }
    }
  };

  const handleImageChange = async (file: File | null) => {
    //
  };

  const formik = useFormik<CompanyInterface>({
    initialValues: data,
    validationSchema: companyValidationSchema,
    onSubmit: handleSubmit,
    enableReinitialize: true,
    validateOnChange: false,
    validateOnBlur: false,
  });

  return (
    <AppLayout
      breadcrumbs={
        <Breadcrumbs
          items={[
            {
              label: 'Companies',
              link: '/companies',
            },
            {
              label: 'Update Company',
              isCurrent: true,
            },
          ]}
        />
      }
    >
      <Box rounded="md">
        <Box mb={4}>
          <Text as="h1" fontSize={{ base: '1.5rem', md: '1.875rem' }} fontWeight="bold" color="base.content">
            Update Company
          </Text>
        </Box>
        {(error || formError) && (
          <Box mb={4}>
            <Error error={error || formError} />
          </Box>
        )}

        <FormWrapper wrapperProps={{ mb: 3 }}>
          <ImagePicker ref={imageUploaderRef} onChange={handleImageChange} entity="company" entityId={id} />
        </FormWrapper>

        <FormWrapper onSubmit={formik.handleSubmit}>
          <TextInput
            error={formik.errors.description}
            label={'Description'}
            props={{
              name: 'description',
              placeholder: 'Description',
              value: formik.values?.description,
              onChange: formik.handleChange,
            }}
          />

          <TextInput
            error={formik.errors.image}
            label={'Image'}
            props={{
              name: 'image',
              placeholder: 'Image',
              value: formik.values?.image,
              onChange: formik.handleChange,
            }}
          />

          <TextInput
            error={formik.errors.name}
            label={'Name'}
            props={{
              name: 'name',
              placeholder: 'Name',
              value: formik.values?.name,
              onChange: formik.handleChange,
            }}
          />

          <TextInput
            error={formik.errors.industry_type}
            label={'Industry Type'}
            props={{
              name: 'industry_type',
              placeholder: 'Industry Type',
              value: formik.values?.industry_type,
              onChange: formik.handleChange,
            }}
          />

          <NumberInput
            label="Number Of Employees"
            formControlProps={{
              id: 'number_of_employees',
              isInvalid: !!formik.errors?.number_of_employees,
            }}
            name="number_of_employees"
            error={formik.errors?.number_of_employees}
            value={formik.values?.number_of_employees}
            onChange={(valueString, valueNumber) =>
              formik.setFieldValue('number_of_employees', Number.isNaN(valueNumber) ? 0 : valueNumber)
            }
          />

          <NumberInput
            label="Annual Revenue"
            formControlProps={{
              id: 'annual_revenue',
              isInvalid: !!formik.errors?.annual_revenue,
            }}
            name="annual_revenue"
            error={formik.errors?.annual_revenue}
            value={formik.values?.annual_revenue}
            onChange={(valueString, valueNumber) =>
              formik.setFieldValue('annual_revenue', Number.isNaN(valueNumber) ? 0 : valueNumber)
            }
          />

          <TextInput
            error={formik.errors.company_location}
            label={'Company Location'}
            props={{
              name: 'company_location',
              placeholder: 'Company Location',
              value: formik.values?.company_location,
              onChange: formik.handleChange,
            }}
          />

          <TextInput
            error={formik.errors.company_website}
            label={'Company Website'}
            props={{
              name: 'company_website',
              placeholder: 'Company Website',
              value: formik.values?.company_website,
              onChange: formik.handleChange,
            }}
          />

          <TextInput
            error={formik.errors.company_headquarters}
            label={'Company Headquarters'}
            props={{
              name: 'company_headquarters',
              placeholder: 'Company Headquarters',
              value: formik.values?.company_headquarters,
              onChange: formik.handleChange,
            }}
          />

          <NumberInput
            label="Company Rating"
            formControlProps={{
              id: 'company_rating',
              isInvalid: !!formik.errors?.company_rating,
            }}
            name="company_rating"
            error={formik.errors?.company_rating}
            value={formik.values?.company_rating}
            onChange={(valueString, valueNumber) =>
              formik.setFieldValue('company_rating', Number.isNaN(valueNumber) ? 0 : valueNumber)
            }
          />

          <TextInput
            error={formik.errors.company_ceo}
            label={'Company Ceo'}
            props={{
              name: 'company_ceo',
              placeholder: 'Company Ceo',
              value: formik.values?.company_ceo,
              onChange: formik.handleChange,
            }}
          />

          <AsyncSelect<UserInterface>
            formik={formik}
            name={'user_id'}
            label={'Select User'}
            placeholder={'Select User'}
            fetcher={getUsers}
            labelField={'email'}
          />
          <Flex justifyContent={'flex-start'}>
            <Button
              isDisabled={formik?.isSubmitting}
              bg="state.info.main"
              color="base.100"
              type="submit"
              display="flex"
              height="2.5rem"
              padding="0rem 1rem"
              justifyContent="center"
              alignItems="center"
              gap="0.5rem"
              mr="4"
              _hover={{
                bg: 'state.info.main',
                color: 'base.100',
              }}
            >
              Submit
            </Button>
            <Button
              bg="neutral.transparent"
              color="neutral.main"
              type="button"
              display="flex"
              height="2.5rem"
              padding="0rem 1rem"
              justifyContent="center"
              alignItems="center"
              gap="0.5rem"
              mr="4"
              onClick={() => router.push('/companies')}
              _hover={{
                bg: 'neutral.transparent',
                color: 'neutral.main',
              }}
            >
              Cancel
            </Button>
          </Flex>
        </FormWrapper>
      </Box>
    </AppLayout>
  );
}

export default compose(
  requireNextAuth({
    redirectTo: '/',
  }),
  withAuthorization({
    service: AccessServiceEnum.PROJECT,
    entity: 'company',
    operation: AccessOperationEnum.UPDATE,
  }),
)(CompanyEditPage);
