const AverageCard = ({
  label,
  value,
  unit,
  color
}) => <div className="bg-white border border-gray-100 rounded-xl p-5 text-center">
    <p className="text-sm text-gray-400 mb-1">{label}</p>
    <p className={`text-2xl font-bold ${color}`}>{value}{unit}</p>
    <p className="text-xs text-gray-400 mt-1">daily average</p>
  </div>;
export default AverageCard;