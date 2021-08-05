import {
  ClassicCheckboxField,
  ClassicInputField,
  ClassicTextareaField,
} from 'tailwindUI/ClassicField';
import FieldCheckbox from 'components/FieldCheckbox';
import {
  Formik,
  Form,
  Field,
  FieldArray,
  ErrorMessage,
  validateYupSchema,
  FormikConfig,
  FormikValues,
} from 'formik';
import React from 'react';
import { useState } from 'react';
import { Fragment } from 'react';
import InputField from 'tailwindUI/InputField';
import { Form3ValuesTypes } from 'types/FormikTypes';
import {
  array,
  bool,
  mixed,
  number,
  object,
  string,
  ValidationError,
} from 'yup';
import Button from 'tailwindUI/Button';
import TextareaField from 'tailwindUI/TextareaField';
import TailwindStepper from 'tailwindUI/TailwindStepper';

const initialValues: Form3ValuesTypes = {
  firstName: '',
  lastName: '',
  millionaire: false,
  money: 0,
  description: '',
};

export default function form() {
  return (
    <div className="p-10 -mt-2 bg-gray-900 text-white ">
      <FormikStepper
        initialValues={initialValues}
        onSubmit={(values, helpers) => {
          alert('Successfull Completed!');
        }}
      >
        <FormikStep
          validationSchema={object({
            firstName: string().required('First name is required! '),
            lastName: string().required('Last name is required! '),
            millionaire: bool(),
          })}
        >
          <Field
            label="First Name *"
            as={ClassicInputField}
            placeholder="first name"
            name="firstName"
          />
          <Field
            label="Last Name *"
            as={ClassicInputField}
            placeholder="last name"
            name="lastName"
          />
          <ClassicCheckboxField label="I am millionaire" name="millionaire" />
        </FormikStep>

        <FormikStep
          validationSchema={object({
            money: mixed().when('millionaire', {
              is: true,
              then: number()
                .required('Money is required!')
                .min(
                  1000000,
                  'you need at least 1M, because you said you are a millionaire!'
                ),
              otherwise: number().min(1, 'Money is required!'),
            }),
          })}
        >
          <Field
            label="Money ($) *"
            as={ClassicInputField}
            placeholder="$"
            name="money"
            type="number"
          />
        </FormikStep>

        <FormikStep
          validationSchema={object({
            description: string().required('Description is required!'),
          })}
        >
          <Field
            label="Description *"
            as={ClassicTextareaField}
            placeholder="write des..."
            name="description"
          />
        </FormikStep>
      </FormikStepper>
    </div>
  );
}

interface FormikStepProps {
  children: any;
  validationSchema: any;
}

function FormikStep({ children }: FormikStepProps) {
  return <>{children}</>;
}

function FormikStepper({ children, ...props }: FormikConfig<FormikValues>) {
  const childrenArray = React.Children.toArray(children);
  const [step, setStep] = React.useState(0);
  const currentChild = childrenArray[
    step
  ] as React.ReactElement<FormikStepProps>;

  const isLastStep = step == childrenArray.length - 1;

  const backStep = () => {
    if (step == 0) return;
    setStep((prev) => prev - 1);
  };
  const nextStep = () => {
    if (isLastStep) return;
    setStep((prev) => prev + 1);
  };

  return (
    <Formik
      {...props}
      validationSchema={currentChild.props.validationSchema}
      onSubmit={async (values, helpers) => {
        if (isLastStep) {
          await props.onSubmit(values, helpers);
        } else {
          nextStep();
        }
      }}
    >
      {({ isValid, values }) => {
        
        const isAllCompleted = Object.keys(
          currentChild.props.validationSchema.fields
        )
          .map((key) => key)
          .every((item) => {
            if (item !== 'millionaire') return values[item];
            return true;
          });

        return (
          <Form className="md:w-3/4 w-full bg-gray-800 md:p-10 p-5 rounded mx-auto">
            <TailwindStepper
              allSteps={3}
              currentStep={`${isValid && isAllCompleted ? step + 2 : step + 1}`}
              stepNames={['Personal Info', 'Bank Accounts', 'More Info']}
            />

            {currentChild}

            <div className="flex justify-end">
              <Button
                onClick={backStep}
                className={`bg-blue-600 mr-2 ${step <= 0 ? 'hidden' : ''}`}
              >
                Back
              </Button>
              <Button type="submit" className={`bg-blue-600 mr-2`}>
                {isLastStep ? 'Submit' : 'Next'}
              </Button>
            </div>

            <pre className="bg-gray-900 p-3 mt-5 rounded text-blue-300">{JSON.stringify({values}, null, 3)}</pre>

          </Form>
        );
      }}
    </Formik>
  );
}
