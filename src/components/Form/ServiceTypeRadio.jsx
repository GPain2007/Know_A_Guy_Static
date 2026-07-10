const OPTIONS = [
  { value: "one-time service", label: "One-Time Service" },
  { value: "Longterm", label: "Long-Term" },
];

export default function ServiceTypeRadio({ name, value, onChange }) {
  return (
    <div className="control no-margin">
      <label>Service Type</label>
      <div className="radio-group">
        {OPTIONS.map((option) => (
          <label className="radio-option" key={option.value}>
            <input
              type="radio"
              name={name}
              value={option.value}
              checked={value === option.value}
              onChange={onChange}
            />
            {option.label}
          </label>
        ))}
      </div>
    </div>
  );
}
