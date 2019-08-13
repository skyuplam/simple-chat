import React from 'react';
import cn from 'clsx';
import { useField } from 'formik';
import './TextArea.css';


interface Props extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  className?: string;
  name: string;
}
function TextArea({
  className, name, ...rest
}: Props) {
  const [field, meta] = useField(name);
  const hasError = meta.touched && meta.error;
  const ErrorMsg = hasError && (
    <div className="TextAreaError">
      {meta.error}
    </div>
  );

  return (
    <div className={cn('TextArea', className)}>
      <textarea
        className="TextAreaInput"
        {...field}
        {...rest}
      />
      {ErrorMsg}
    </div>
  );
}

export default TextArea;
