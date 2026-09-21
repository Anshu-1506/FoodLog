import { PieChart, Pie, Cell } from 'recharts';
const COLORS = ['#22c55e', '#3b82f6', '#a855f7'];
const NutrientDonut = ({
  protein,
  carbs,
  fat
}) => {
  const total = protein + carbs + fat || 1;
  const data = [{
    name: 'Protein',
    value: protein
  }, {
    name: 'Carbs',
    value: carbs
  }, {
    name: 'Fat',
    value: fat
  }];
  return <div className="bg-white border border-gray-100 rounded-xl p-5">
      <h3 className="font-semibold text-gray-900 mb-4">Nutrient Distribution</h3>
      <div className="flex items-center gap-6">
        <PieChart width={110} height={110}>
          <Pie data={data} innerRadius={35} outerRadius={50} dataKey="value">
            {data.map((_, i) => <Cell key={i} fill={COLORS[i]} />)}
          </Pie>
        </PieChart>

        <div className="space-y-2 text-sm">
          {data.map((d, i) => <div key={d.name} className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full" style={{
            background: COLORS[i]
          }} />
              <span className="text-gray-600">{d.name}</span>
              <span className="font-medium text-gray-900">
                {Math.round(d.value)}g ({Math.round(d.value / total * 100)}%)
              </span>
            </div>)}
        </div>
      </div>
    </div>;
};
export default NutrientDonut;