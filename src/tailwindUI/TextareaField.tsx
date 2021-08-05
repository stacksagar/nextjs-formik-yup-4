import { useState } from 'react';
import { ErrorMessage } from 'formik';
import ErrorIcon from 'components/ErrorIcon';
import ErrorIconMessage from 'components/ErrorIconMessage';

export default function TextareaField({
  error,
  touch,
  name,
  value,
  label,
  ...allProps
}) {
  const [isFocus, setIsFocus] = useState(false);
  return (
    <div className="p-2 mb-2 pl-0 rounded relative flex flex-col">
      <label
        style={{ top: `${isFocus ? '-5px' : '20px'}` }}
        className={`transition-all absolute flex items-center z-10 ${
          isFocus ? 'text-sm text-gray-300' : 'text-lg'
        }`}
      >
        {label}
      </label>
      <textarea
        autoComplete="off"
        name={name}
        {...allProps}
        className={`transition-all py-2 outline-none bg-transparent z-20 border-b-2
        ${isFocus && !value && 'border-red-500'}
        ${value && 'border-green-500'}
        `}
        onFocus={() => setIsFocus(true)}
        onBlur={() => {
          if (!value) {
            setIsFocus(false);
          }
        }}
      />
      <ErrorIconMessage name={name} touch={touch} error={error} />
    </div>
  );
}