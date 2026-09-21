import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid, Legend } from 'recharts';
const MacroLineChart = ({
  data,
  title
}) => {
  return <div className="bg-white border border-gray-100 rounded-xl p-5">
      <h3 className="font-semibold text-gray-900 mb-4">{title}</h3>
      <ResponsiveContainer width="100%" height={260}>
        <LineChart data={data}>
          <CartesianGrid stroke="#f3f4f6" vertical={false} />
          <XAxis dataKey="label" tick={{
          fontSize: 12,
          fill: '#9ca3af'
        }} axisLine={false} tickLine={false} />
          <YAxis tick={{
          fontSize: 12,
          fill: '#9ca3af'
        }} axisLine={false} tickLine={false} />
          <Tooltip />
          <Legend wrapperStyle={{
          fontSize: 12
        }} />
          <Line type="monotone" dataKey="calories" stroke="#f97316" strokeWidth={2} dot={false} />
          <Line type="monotone" dataKey="protein" stroke="#22c55e" strokeWidth={2} dot={false} />
          <Line type="monotone" dataKey="carbs" stroke="#3b82f6" strokeWidth={2} dot={false} />
          <Line type="monotone" dataKey="fat" stroke="#a855f7" strokeWidth={2} dot={false} />
        </LineChart>
      </ResponsiveContainer>
    </div>;
};
export default MacroLineChart;