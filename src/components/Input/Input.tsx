import { UseFormRegister, FieldValues, FieldError, Path } from 'react-hook-form';
import { InputHTMLAttributes } from 'react';
import styles from './Input.module.css';

interface InputProps<T extends FieldValues> extends InputHTMLAttributes<HTMLInputElement> {
    label?: string;
    name: Path<T>;
    register?: UseFormRegister<T>;
    error?: FieldError;
}

const Input = <T extends FieldValues>({
    label,
    name,
    type = 'text',
    placeholder,
    error,
    register,
    required = false,
    className = '',
    ...rest
}: InputProps<T>) => {
    return (
        <div className={`${styles.inputGroup} ${className}`}>
            {label && (
                <label htmlFor={name} className={styles.label}>
                    {label}
                    {required && <span className={styles.required}>*</span>}
                </label>
            )}
            <input
                id={name}
                type={type}
                placeholder={placeholder}
                className={`${styles.input} ${error ? styles.inputError : ''}`}
                {...(register ? register(name, { required }) : {})}
                {...rest}
            />
            {error && <span className={styles.errorMessage}>{error.message}</span>}
        </div>
    );
};

export default Input;
