const StatCard = ({
  label,
  value
}) => <div className="bg-white border border-gray-100 rounded-xl p-4 text-center">
    <p className="text-lg font-bold text-gray-900">{value}</p>
    <p className="text-xs text-gray-400 mt-1">{label}</p>
  </div>;
export default StatCard;