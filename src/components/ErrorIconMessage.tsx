import ErrorIcon from './ErrorIcon';
import { ErrorMessage } from 'formik';
export default function ErrorIconMessage({ error, touch, name , ...other }) {
  return (
    <p className={`m-0 p-0 text-red-400 w-full ${other.left ? 'text-left' : 'text-right'} ${other.space ? other.space : ''}`}>
      {error && touch ? <ErrorIcon /> : null} <ErrorMessage name={name} />
    </p>
  );
}