import { ChangeEventHandler } from 'react';
import styles from './input.module.css';

interface InputProps {
  className?: string;
  type?: string;
  value?: string | number;
  onChange?: ChangeEventHandler;
  placeholder?: string;
  label?: string;
  readOnly?: boolean;
  name ?: string;
  onBlur ?: any;
}

const DefaultInput = ({ type, className, value, onChange, placeholder, label, readOnly , name , onBlur }: InputProps) => {
  return (
    <div className={`${styles['input-container']} ${className}`}>
      <label>{label}</label>
      <input
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        name={name}
        onBlur={onBlur}
        readOnly={readOnly}
      />
    </div>
  );
};

export default DefaultInput;
