import { Field } from "formik";

export default function FieldCheckbox({ value, valueForTerms, name }: any) {
  const getValue = value || valueForTerms
  return (
    <div className="flex justify-start items-center my-5">
      <Field
        id={getValue}
        className="bg-gray-600 text-white mr-1 rounded focus:ring focus:outline-none"
        name={name}
        type="checkbox"
        value={value && value}
      />
      <label className="-mt-1 mr-5" htmlFor={getValue}>
        {getValue}
      </label>
    </div>
  );
}
 