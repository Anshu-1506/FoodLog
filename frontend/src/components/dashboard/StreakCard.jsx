import { Flame } from 'lucide-react';
const StreakCard = ({
  streak
}) => {
  return <div className="bg-white border border-gray-100 rounded-xl p-5 flex items-center justify-between">
      <div className="flex items-center gap-2">
        <Flame size={18} className="text-orange-500" />
        <h3 className="font-semibold text-gray-900">Streak</h3>
      </div>
      <div className="text-right">
        <p className="font-bold text-gray-900">{streak} Days</p>
        <p className="text-xs text-gray-400">Keep it up! You're on fire 🔥</p>
      </div>
    </div>;
};
export default StreakCard;