export default function ({
  name,
  placeholder,
  errors,
  forwardRef,
  type,
  autocomplete = 'off'
}) {
  return (
    <div className='form-group'>
      <label htmlFor={name}>{placeholder}</label>
      <input
        name={name}
        placeholder={placeholder}
        className={`form-control ${errors ? 'is-invalid' : ''}`}
        ref={forwardRef}
        type={type}
        autoComplete={autocomplete}
      />
    </div>
  )
}
