import { BarChart, Bar, XAxis, ResponsiveContainer, Tooltip } from 'recharts';
const CaloriesChart = ({
  weekData,
  goal
}) => {
  return <div className="bg-white border border-gray-100 rounded-xl p-5">
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-semibold text-gray-900">Calories Overview</h3>
        <select className="text-sm border border-gray-200 rounded-lg px-2 py-1 text-gray-500">
          <option>This Week</option>
        </select>
      </div>

      <ResponsiveContainer width="100%" height={200}>
        <BarChart data={weekData}>
          <XAxis dataKey="day" axisLine={false} tickLine={false} tick={{
          fontSize: 12,
          fill: '#9ca3af'
        }} />
          <Tooltip cursor={{
          fill: '#f0fdf4'
        }} />
          <Bar dataKey="calories" radius={[4, 4, 0, 0]} fill="#bbf7d0" />
        </BarChart>
      </ResponsiveContainer>

      <div className="flex justify-between text-sm mt-2 border-t border-gray-100 pt-3">
        <div>
          <p className="text-gray-400 text-xs">Average</p>
          <p className="font-semibold text-gray-900">
            {Math.round(weekData.reduce((s, d) => s + d.calories, 0) / (weekData.length || 1))} kcal
          </p>
        </div>
        <div className="text-right">
          <p className="text-gray-400 text-xs">Goal</p>
          <p className="font-semibold text-gray-900">{goal} kcal</p>
        </div>
      </div>
    </div>;
};
export default CaloriesChart;