import { useEffect, useState, useCallback } from 'react';
import Sidebar from '../components/common/Sidebar';
import RangeTabs from '../components/progress/RangeTabs';
import MacroLineChart from '../components/progress/MacroLineChart';
import SummaryStat from '../components/progress/SummaryStat';
import axiosInstance from '../api/axiosInstance';
const rangeDays = {
  daily: 1,
  weekly: 7,
  monthly: 30
};
const buildChartData = (meals, range) => {
  const byDay = {};
  meals.forEach(m => {
    const key = new Date(m.loggedAt).toISOString().slice(0, 10);
    if (!byDay[key]) byDay[key] = {
      calories: 0,
      protein: 0,
      carbs: 0,
      fat: 0
    };
    byDay[key].calories += m.totalCalories;
    byDay[key].protein += m.totalProtein;
    byDay[key].carbs += m.totalCarbs;
    byDay[key].fat += m.totalFat;
  });
  const sortedDates = Object.keys(byDay).sort();
  if (range === 'daily') {
    return meals.filter(m => new Date(m.loggedAt).toISOString().slice(0, 10) === sortedDates[sortedDates.length - 1]).map(m => ({
      label: new Date(m.loggedAt).toLocaleTimeString('en-IN', {
        hour: '2-digit',
        minute: '2-digit'
      }),
      calories: m.totalCalories,
      protein: m.totalProtein,
      carbs: m.totalCarbs,
      fat: m.totalFat
    }));
  }
  return sortedDates.map(date => ({
    label: new Date(date).toLocaleDateString('en-IN', {
      day: 'numeric',
      month: 'short'
    }),
    ...byDay[date]
  }));
};
const Progress = () => {
  const [range, setRange] = useState('weekly');
  const [meals, setMeals] = useState([]);
  const [loading, setLoading] = useState(true);
  const fetchData = useCallback(async () => {
    setLoading(true);
    try {
      const days = rangeDays[range];
      const start = new Date();
      start.setDate(start.getDate() - days);
      const {
        data
      } = await axiosInstance.get('/meals');
      setMeals(data.filter(m => new Date(m.loggedAt) >= start));
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }, [range]);
  useEffect(() => {
    fetchData();
  }, [fetchData]);
  const chartData = buildChartData(meals, range);
  const totals = meals.reduce((acc, m) => ({
    calories: acc.calories + m.totalCalories,
    protein: acc.protein + m.totalProtein,
    carbs: acc.carbs + m.totalCarbs,
    fat: acc.fat + m.totalFat
  }), {
    calories: 0,
    protein: 0,
    carbs: 0,
    fat: 0
  });
  const dayCount = new Set(meals.map(m => new Date(m.loggedAt).toISOString().slice(0, 10))).size || 1;
  return <div className="flex flex-col md:flex-row min-h-screen bg-gray-50">
      <Sidebar />

      <main className="flex-1 p-4 sm:p-6 md:p-8 w-full max-w-full overflow-x-hidden">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-6 gap-4">
          <div>
            <h1 className="text-lg sm:text-xl font-bold text-gray-900 mb-1">Progress</h1>
            <p className="text-sm text-gray-500">Track your calorie and macro trends over time.</p>
          </div>
          <RangeTabs active={range} onChange={setRange} />
        </div>

        {loading ? <p className="text-sm text-gray-400">Loading progress...</p> : meals.length === 0 ? <p className="text-sm text-gray-400">No meals logged in this period yet.</p> : <>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
              <SummaryStat label="Avg Calories/Day" value={Math.round(totals.calories / dayCount)} unit=" kcal" color="text-orange-500" />
              <SummaryStat label="Avg Protein/Day" value={Math.round(totals.protein / dayCount)} unit="g" color="text-green-600" />
              <SummaryStat label="Avg Carbs/Day" value={Math.round(totals.carbs / dayCount)} unit="g" color="text-blue-500" />
              <SummaryStat label="Avg Fat/Day" value={Math.round(totals.fat / dayCount)} unit="g" color="text-purple-500" />
            </div>
            <MacroLineChart data={chartData} title={range === 'daily' ? "Today's Meals" : range === 'weekly' ? 'Last 7 Days' : 'Last 30 Days'} />
          </>}
      </main>
    </div>;
};
export default Progress;