const colorMap = {
  orange: {
    bg: 'bg-orange-50',
    text: 'text-orange-500',
    bar: 'bg-orange-500'
  },
  green: {
    bg: 'bg-green-50',
    text: 'text-green-600',
    bar: 'bg-green-600'
  },
  blue: {
    bg: 'bg-blue-50',
    text: 'text-blue-500',
    bar: 'bg-blue-500'
  },
  purple: {
    bg: 'bg-purple-50',
    text: 'text-purple-500',
    bar: 'bg-purple-500'
  }
};
const MacroCard = ({
  icon: Icon,
  label,
  value,
  goal,
  unit = '',
  color = 'green'
}) => {
  const c = colorMap[color];
  const remaining = Math.max(goal - value, 0);
  const pct = Math.min(value / goal * 100, 100);
  return <div className="bg-white border border-gray-100 rounded-xl p-5 shadow-md shadow-gray-200/50 hover:shadow-lg hover:shadow-gray-200/60 transition-shadow">
      <div className="flex items-center gap-2 mb-3">
        <div className={`w-8 h-8 rounded-full flex items-center justify-center ${c.bg}`}>
          <Icon size={16} className={c.text} />
        </div>
        <span className="text-sm text-gray-500">{label}</span>
      </div>

      <p className="text-2xl font-bold text-gray-900">
        {Math.round(value)}
        <span className="text-base font-medium text-gray-400"> / {goal}{unit}</span>
      </p>

      <div className="w-full h-1.5 bg-gray-100 rounded-full mt-3 overflow-hidden">
        <div className={`h-full ${c.bar} rounded-full`} style={{
        width: `${pct}%`
      }} />
      </div>

      <p className={`text-xs font-medium mt-2 ${c.text}`}>
        {Math.round(remaining)}{unit} left
      </p>
    </div>;
};
export default MacroCard;