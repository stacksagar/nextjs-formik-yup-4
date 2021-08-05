export default function Button(props) {
  const { children, bg, color, className, ...otherProps } = props;
  return (
    <button
      type={props.type ? props.type : 'button'}
      className={`sm:py-2 px-4 outline-none rounded focus:ring ${className} ${
        bg && !className ? bg : 'bg-gray-500'
      } ${color && !className ? color : 'bg-gray-500'} `}
      {...otherProps}
    >
      {children}
    </button>
  );
}
