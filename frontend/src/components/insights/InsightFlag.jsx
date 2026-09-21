import { AlertCircle, TrendingUp, CalendarX } from 'lucide-react';
const flagStyles = {
  low_protein: {
    icon: AlertCircle,
    bg: 'bg-amber-50',
    border: 'border-amber-100',
    text: 'text-amber-700',
    iconColor: 'text-amber-500'
  },
  weekend_spike: {
    icon: TrendingUp,
    bg: 'bg-orange-50',
    border: 'border-orange-100',
    text: 'text-orange-700',
    iconColor: 'text-orange-500'
  },
  inconsistent_logging: {
    icon: CalendarX,
    bg: 'bg-red-50',
    border: 'border-red-100',
    text: 'text-red-700',
    iconColor: 'text-red-500'
  }
};
const InsightFlag = ({
  flag
}) => {
  const style = flagStyles[flag.type] || flagStyles.low_protein;
  const Icon = style.icon;
  return <div className={`flex items-start gap-3 p-4 rounded-xl border ${style.bg} ${style.border}`}>
      <Icon size={18} className={`${style.iconColor} mt-0.5 shrink-0`} />
      <p className={`text-sm ${style.text}`}>{flag.message}</p>
    </div>;
};
export default InsightFlag;