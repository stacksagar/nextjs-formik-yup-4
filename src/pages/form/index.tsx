import ErrorIconMessage from 'components/ErrorIconMessage';
import FieldCheckbox from 'components/FieldCheckbox';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { FormValuesTypes } from 'types/FormikTypes';
import { object, string, number, array, boolean, mixed } from 'yup';
import InputField from 'tailwindUI/InputField';
const initialValues: FormValuesTypes = {
  fullName: '',
  initialInvestment: 0,
  investmentRisk: [],
  commentAboutInvestmentRisk: '',
  dependents: -1,
  acceptedTermsAndConditions: false,
};
export default function form() {
  return (
    <div className="p-10 -mt-2 bg-gray-900 text-white ">
      <Formik
        validationSchema={object({
          fullName: string()
            .min(3, 'Your name must be at least 3 characters')
            .required('Name is required!'),
          initialInvestment: number().min(
            100,
            'Initial Investment is required! ( minimum 100 )'
          ),
          dependents: number()
            .min(0, 'Dependents is required! min-0 & max-5')
            .max(5),
          acceptedTermsAndConditions: boolean().isTrue(
            'If you agree our terms and conditions then you can create your account!'
          ),
          investmentRisk: array(string().oneOf(['Low', 'Medium', 'High'])).min(
            1,
            'Investment Risk must be at least one!'
          ),
          commentAboutInvestmentRisk: mixed().when('investmentRisk', {
            is: (ir: string[]) => ir.find((ir) => ir === 'High'),
            then: string()
              .min(
                10,
                'Comment about investment risk must be at least 10 characters'
              )
              .required('Comment About Investment required! for Highly Risk!'),
            otherwise: string().min(10).max(100),
          }),
        })}
        initialValues={initialValues}
        onSubmit={() => {
          setTimeout(() => {
            alert('Successfully created!');
          }, 1500);
          return new Promise((res) => setTimeout(res, 1500));
        }}
      >
        {({ values, errors, touched, isSubmitting, isValid }) => (
          <Form className="md:w-3/4 w-full bg-gray-800 md:p-10 p-5 rounded mx-auto">
            {values.fullName && isValid ? (
              <p className="bg-green-600 text-white px-5 py-1 mb-1 inline-block rounded right-1">
                All Field is Completed!
              </p>
            ) : null}

            <Field
              as={InputField}
              name="fullName"
              label="Last Name"
              value={values.fullName}
              error={`fullName`}
              touch={errors.fullName}
            />

            <Field
              as={InputField}
              name="initialInvestment"
              label="Initial Investment"
              value={values.initialInvestment}
              error={`initialInvestment`}
              touch={errors.initialInvestment}
            />

            <div className="bg-gray-900 p-3">
              <p className="text-xl mb-1 text-gray-200">Investment Risk *</p>
              <div className="mb-3 flex">
                <FieldCheckbox value="Low" name="investmentRisk" />
                <FieldCheckbox value="Medium" name="investmentRisk" />
                <FieldCheckbox value="High" name="investmentRisk" />
              </div>
            </div>
            <ErrorIconMessage
              name="investmentRisk"
              error={errors.investmentRisk}
              touch={touched.investmentRisk}
              space="mb-5"
              left={true}
            />

            <p className="text-xl mb-1 text-gray-200">
              Comment About Investment Risk{' '}
              {values.investmentRisk.includes('High') ? ' *' : ''}
            </p>
            <Field
              className="w-full h-40 bg-gray-600 text-white md:p-3 py-1 px-2 block rounded focus:ring focus:outline-none"
              name="commentAboutInvestmentRisk"
              placeholder="Comment..."
              as="textarea"
            />
            <ErrorIconMessage
              name="commentAboutInvestmentRisk"
              error={errors.commentAboutInvestmentRisk}
              touch={touched.commentAboutInvestmentRisk}
              space="mb-5"
              left={true}
            />

            <p className="text-xl mb-1 text-gray-200">Select Dependents *</p>
            <Field
              className="w-full bg-gray-600 text-white md:p-3 py-1 px-2 block rounded focus:ring focus:outline-none"
              name="dependents"
              placeholder="Dependents"
              as="select"
            >
              <option value={-1}> Select </option>
              <option value={0}> 0 </option>
              <option value={1}> 1 </option>
              <option value={2}> 2 </option>
              <option value={3}> 3 </option>
              <option value={4}> 4 </option>
              <option value={5}> 5 </option>
            </Field>
            <ErrorIconMessage
              name="dependents"
              error={errors.dependents}
              touch={touched.dependents}
              space="mb-5"
              left={true}
            />

            <div className="flex justify-start mb-10">
              <FieldCheckbox
                name="acceptedTermsAndConditions"
                valueForTerms="I accept terms and conditions!"
              />
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full px-3 py-2 rounded bg-blue-500 text-white focus:ring"
            >
              {isSubmitting ? 'submittion' : 'submit'}
            </button>

            <pre className="mt-10 bg-gray-900 p-4 text-blue-400 rounded-xl">
              {' '}
              {JSON.stringify({ values }, null, 2)}{' '}
            </pre>
          </Form>
        )}
      </Formik>
    </div>
  );
}
