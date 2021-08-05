import { Formik, Form, ErrorMessage } from 'formik';
import Button from 'tailwindUI/Button';
import { object, array, string } from 'yup';
import DZUploadField from './DZUploadField';

export default function Form3() {
  return (
    <div className="p-10 -mt-2 bg-gray-900 text-white ">
      <Formik
        initialValues={{ files: [] }}
        onSubmit={() => {
          alert('Completed!');
          return new Promise((res) => setTimeout(res, 500));
        }}
        // validationSchema={object({
        //   files: array(object({
        //     url: string().required()
        //   }))
        // })}

        validationSchema={object({
          files: array().min(1),
        })}
      >
        {({ values }) => (
          <Form className="md:w-3/4 w-full bg-gray-800 md:p-10 p-5 rounded mx-auto">
            <DZUploadField name="files" />

            <Button className="mt-6 block" type="submit">
              Submit
            </Button>

            <pre className="p-3 bg-gray-900 rounded mt-8 text-blue-300">
              {JSON.stringify({ values }, null, 3)}
            </pre>
          </Form>
        )}
      </Formik>
    </div>
  );
}
