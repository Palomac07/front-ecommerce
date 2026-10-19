
export default function FormField({
  label,
  name,
  type = 'text',
  value,
  onChange,
  error,
  required = false,
  placeholder = '',
  min,
  step,
  children
}) {
  const inputId = `producto-${name}`

  return (
    <div className="producto-form-field">
      <label htmlFor={inputId}>
        {label}
        {required && <span className="campo-obligatorio"> *</span>}
      </label>

      {children ? (
        children
      ) : (
        <input
          id={inputId}
          name={name}
          type={type}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          min={min}
          step={step}
          required={required}
          aria-invalid={Boolean(error)}
          aria-describedby={error ? `${inputId}-error` : undefined}
        />
      )}

      {error && (
        <small id={`${inputId}-error`} className="campo-error">
          {error}
        </small>
      )}
    </div>
  )
}
