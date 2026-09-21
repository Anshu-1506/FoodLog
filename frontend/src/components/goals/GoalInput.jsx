const GoalInput = ({
  label,
  value,
  onChange,
  unit,
  color = 'text-gray-900'
}) => <div>
    <label className="block text-sm font-medium text-gray-700 mb-1">{label}</label>
    <div className="relative">
      <input type="number" min="0" value={value} onChange={e => onChange(Number(e.target.value))} className={`w-full px-3 py-2.5 border border-gray-200 rounded-lg text-sm font-semibold ${color} focus:outline-none focus:ring-2 focus:ring-brand-500`} />
      <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-gray-400">{unit}</span>
    </div>
  </div>;
export default GoalInput;