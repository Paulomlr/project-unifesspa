import styles from './Input.module.css';

const Input = ({
    label,
    name,
    type = 'text',
    placeholder,
    error,
    register,
    required = false,
    className = '',
    ...rest
}) => {
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
                name={name}
                type={type}
                placeholder={placeholder}
                className={`${styles.input} ${error ? styles.inputError : ''}`}
                {...(register ? register(name) : {})}
                {...rest}
            />
            {error && <span className={styles.errorMessage}>{error.message}</span>}
        </div>
    );
};

export default Input;
