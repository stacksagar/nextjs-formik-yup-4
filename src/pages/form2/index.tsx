import ErrorIconMessage from 'components/ErrorIconMessage';
import FieldCheckbox from 'components/FieldCheckbox';
import { Formik, Form, Field, FieldArray, ErrorMessage } from 'formik';
import { Fragment } from 'react';
import { form2DonationsTypes, Form2ValuesTypes } from 'types/FormikTypes';
import { array, bool, number, object, string, ValidationError } from 'yup';
import InputField, { InputWithoutError } from 'tailwindUI/InputField';

const emptyDonation: form2DonationsTypes = {
  institution: '',
  percentage: 0,
};

const initialValues: Form2ValuesTypes = {
  fullName: '',
  termsAndConditions: false,
  donationAmount: 0,
  donations: [emptyDonation],
};

export default function form() {
  return (
    <div className="p-10 -mt-2 bg-gray-900 text-white ">
      <Formik
        validationSchema={object({
          fullName: string().required('Name is required field!'),
          termsAndConditions: bool().isTrue(
            'You have to accept our terms and conditions!'
          ),
          donationAmount: number().min(5, 'Donation must be at least 5!'),
          donations: array(
            object({
              institution: string().required('Institution is needed!'),
              percentage: number()
                .min(1, 'percentage must be at least 1!')
                .max(100, 'percentage must be greather or equal 100!')
                .required('Percentage is needed!'),
            })
          )
            .min(1)
            .max(3)
            .test((donations: Array<{ percentage: number }>) => {
              const sum = donations.reduce(
                (acc, don) => acc + don.percentage,
                0
              );

              if (sum !== 100) {
                return new ValidationError(
                  `Total percentage should be 100%, but you have ${sum}%`,
                  undefined,
                  'donations'
                );
              }

              return true;
            }),
        })}
        initialValues={initialValues}
        onSubmit={() => {
          setTimeout(() => {
            alert('Successfull donatate!');
          }, 1500);
          return new Promise((res) => setTimeout(res, 1500));
        }}
      >
        {({ values, errors, touched, isSubmitting, isValid }) => {
          return (
            <Form className="md:w-3/4 w-full bg-gray-800 md:p-10 p-5 rounded mx-auto">
              {values.fullName && isValid ? (
                <p className="bg-green-600 text-white px-5 py-1 mb-1 inline-block rounded right-1">
                  All Field is Completed!
                </p>
              ) : null}

              <Field
                name="fullName"
                as={InputField}
                label="Full Name"
                value={values.fullName}
                error={`fullName`}
                touch={errors.fullName}
              />

              <Field
                name="donationAmount"
                as={InputField}
                label="Donation ($)"
                value={values.donationAmount}
                error={`donationAmount`}
                type="number"
                touch={errors.donationAmount}
              />

              <div className="flex justify-start mb-5">
                <FieldCheckbox
                  name="termsAndConditions"
                  valueForTerms="I accept the terms and conditions!"
                />
              </div>

              <FieldArray name="donations">
                {({ push, remove }) => (
                  <Fragment>
                    <p className="text-xl mb-2"> All Donations *</p>

                    {values.donations.map((_, i) => (
                      <div
                        key={i}
                        className="sm:flex justify-between items-center mb-5"
                      >
                        <div className="w-full sm:mx-3 relative sm:mb-0 mb-4">
                          <Field
                            name={`donations[${i}].institution`}
                            as={InputWithoutError}
                            label="Institution"
                            value={values.donations[i].institution}
                          />
                          <small className="text-red-500">
                            <ErrorMessage name={`donations[${i}].institution`} />
                          </small>
                        </div>

                        <div className="w-full sm:mx-3 relative sm:mb-0 mb-4">
                          <Field
                            name={`donations[${i}].percentage`}
                            as={InputWithoutError}
                            label="Percentage (%)"
                            value={values.donations[i].percentage}
                            type="number"
                          />
                          <small className="text-red-500">
                            <ErrorMessage name={`donations[${i}].institution`} />
                          </small>
                        </div>

                        <button
                          disabled={isSubmitting}
                          type="button"
                          className="sm:-mb-2 mb-4 sm:mt-0 mt-1 px-2 py-1 rounded bg-red-600 text-white focus:ring"
                          onClick={() => remove(i)}
                        >
                          {' '}
                          Delete{' '}
                        </button>
                      </div>
                    ))}

                    {typeof errors.donations == 'string' ? (
                      <ErrorIconMessage
                        error={errors.donations}
                        touch={errors.donations}
                        name="donations"
                      />
                    ) : null}

                    <button
                      disabled={isSubmitting}
                      type="button"
                      className="mt-3 mb-10 ml-1 px-2 py-1 rounded bg-green-600 text-white focus:ring"
                      onClick={() => push(emptyDonation)}
                    >
                      {' '}
                      Add Donation{' '}
                    </button>
                  </Fragment>
                )}
              </FieldArray>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full px-3 py-2 rounded bg-blue-500 text-white focus:ring"
              >
                {isSubmitting ? 'submitting' : 'submit'}
              </button>

              <pre className="mt-10 bg-gray-900 p-4 text-blue-400 rounded-xl">
                {' '}
                {JSON.stringify({ values }, null, 2)}{' '}
              </pre>
            </Form>
          );
        }}
      </Formik>
    </div>
  );
}
