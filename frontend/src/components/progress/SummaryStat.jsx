const SummaryStat = ({
  label,
  value,
  unit,
  color = 'text-gray-900'
}) => <div className="bg-white border border-gray-100 rounded-xl p-4 text-center">
    <p className="text-xs text-gray-400 mb-1">{label}</p>
    <p className={`text-lg font-bold ${color}`}>{value}{unit}</p>
  </div>;
export default SummaryStat;