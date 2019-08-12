import React, { useState } from 'react';
import cn from 'clsx';
import { useField } from 'formik';
import './Input.css';


interface Props extends React.InputHTMLAttributes<HTMLInputElement> {
  className?: string;
  label?: React.ReactNode;
  id?: string;
  name: string;
  onChange?: (evt: React.ChangeEvent<HTMLInputElement>) => void;
}
function Input({
  className, label, id, name, onChange, disabled, ...rest
}: Props) {
  const [field, meta] = useField(name);
  const [focused, setFocused] = useState(false);
  const { onBlur, onChange: onFieldChange, ...restField } = field;

  const hasError = meta.touched && meta.error;
  const ErrorMsg = hasError && (
    <div className="InputErrorContainer">
      {meta.error}
    </div>
  );

  function handleOnFocus() {
    setFocused(true);
  }

  function handleOnBlur(evt: React.FocusEvent<HTMLInputElement>) {
    setFocused(false);
    onBlur(evt);
  }

  function handleOnChange(evt: React.ChangeEvent<HTMLInputElement>) {
    if (onChange) {
      onChange(evt);
    }

    onFieldChange(evt);
  }

  return (
    <div className={cn('InputRoot', { InputDisabled: disabled }, className)}>
      <div className="InputLabelContainer">
        <label className="InputLabel" htmlFor={id || name}>
          {label}
        </label>
      </div>
      <div className={cn(
        'InputContainer',
        { 'InputFocused': focused },
      )}>
        <input
          id={id || name}
          name={name}
          className="InputBase"
          {...rest}
          onFocus={handleOnFocus}
          onBlur={handleOnBlur}
          onChange={handleOnChange}
          disabled={disabled}
          {...restField}
        />
      </div>
      {ErrorMsg}
    </div>
  );
}

export default Input;
