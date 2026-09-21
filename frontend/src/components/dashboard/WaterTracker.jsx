import { GlassWater } from 'lucide-react';
const WaterTracker = ({
  glasses,
  goal,
  onAdd
}) => {
  return <div className="bg-white border border-gray-200 rounded-xl p-5 shadow-[0_4px_20px_rgba(0,0,0,0.08)] hover:shadow-[0_8px_28px_rgba(0,0,0,0.12)] transition-shadow">
      <div className="flex items-center justify-between mb-3">
        <h3 className="font-semibold text-gray-900">Water Intake</h3>
        <span className="text-sm text-gray-500">{glasses} / {goal} Glasses</span>
      </div>
      <div className="flex gap-2 mb-2">
        {Array.from({
        length: goal
      }).map((_, i) => <GlassWater key={i} size={22} className={i < glasses ? 'text-blue-400 fill-blue-100' : 'text-gray-200'} />)}
      </div>
      <button onClick={onAdd} className="text-xs font-medium text-brand-600 hover:underline">
        + Add a glass
      </button>
    </div>;
};
export default WaterTracker;