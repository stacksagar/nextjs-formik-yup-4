import { ErrorMessage, Field } from 'formik';

export function ClassicInputField({ label, ...allProps }) {
  return (
    <div className="mb-5">
      <label htmlFor={allProps.name}>{label}</label>
      <input
        id={allProps.name}
        className={`block w-full outline-none bg-gray-700 rounded text-white sm:p-3 p-2 focus:ring`}
        {...allProps}
      />
      <small className="text-red-500">
        <ErrorMessage name={allProps.name} />
      </small>
    </div>
  );
}

export function ClassicTextareaField({ label, ...allProps }) {
  return (
    <div className="mb-5">
      <label htmlFor={allProps.name}>{label}</label>
      <textarea
        id={allProps.name}
        className={`block w-full outline-none bg-gray-700 rounded text-white sm:p-3 p-2 focus:ring`}
        {...allProps}
      />
      <small className="text-red-400">
        <ErrorMessage name={allProps.name} />
      </small>
    </div>
  );
}

export function ClassicCheckboxField({ label, ...allProps }) {
  return (
    <div className="mb-5">
      <div className="flex justify-start items-center">
        <Field
          id={allProps.name}
          type="checkbox"
          className={`mr-1 w-5 h-5 rounded-3xl text-white focus:ring`}
          {...allProps}
        />
        <label htmlFor={allProps.name}>{label}</label>
      </div>
      <small className="text-red-500">
        <ErrorMessage name={allProps.name} />
      </small>
    </div>
  );
}
