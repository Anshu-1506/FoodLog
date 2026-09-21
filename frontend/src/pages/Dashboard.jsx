import { useEffect, useState } from 'react';
import { Flame, Leaf, Wheat, Droplet } from 'lucide-react';
import Sidebar from '../components/common/Sidebar';
import MacroCard from '../components/dashboard/MacroCard';
import AISuggestionCard from '../components/dashboard/AISuggestionCard';
import TodayMeals from '../components/dashboard/TodayMeals';
import CaloriesChart from '../components/dashboard/CaloriesChart';
import NutrientDonut from '../components/dashboard/NutrientDonut';
import WaterTracker from '../components/dashboard/WaterTracker';
import StreakCard from '../components/dashboard/StreakCard';
import axiosInstance from '../api/axiosInstance';
import { useAuth } from '../context/AuthContext';
const Dashboard = () => {
  const {
    user
  } = useAuth();
  const [summary, setSummary] = useState(null);
  const [weekData, setWeekData] = useState([]);
  const [water, setWater] = useState(0);
  const [loading, setLoading] = useState(true);
  const [suggestion, setSuggestion] = useState('');
  const [suggestionLoading, setSuggestionLoading] = useState(true);
  const fetchSummary = async () => {
    try {
      const {
        data
      } = await axiosInstance.get('/meals/today/summary');
      setSummary(data);
      return data;
    } catch (err) {
      console.error('Failed to load dashboard data', err);
      return null;
    } finally {
      setLoading(false);
    }
  };
  const fetchWeek = async () => {
    try {
      const {
        data
      } = await axiosInstance.get('/meals');
      const days = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];
      const byDay = {};
      data.forEach(m => {
        const d = new Date(m.loggedAt).getDay();
        byDay[d] = (byDay[d] || 0) + m.totalCalories;
      });
      setWeekData(days.map((day, i) => ({
        day,
        calories: byDay[i] || 0
      })));
    } catch (err) {
      console.error('Failed to load week data', err);
    }
  };
  const fetchSuggestion = async summaryData => {
    if (!summaryData) {
      setSuggestionLoading(false);
      return;
    }
    setSuggestionLoading(true);
    try {
      const {
        data
      } = await axiosInstance.post('/ai/suggest', {
        totals: summaryData.totals,
        goals: summaryData.goals,
        remaining: summaryData.remaining
      });
      setSuggestion(data.suggestion);
    } catch (err) {
      console.error('Failed to load AI suggestion', err);
      setSuggestion(summaryData.totals.protein < summaryData.goals.protein * 0.7 ? 'You are low on protein. Try adding paneer, curd or sprouts in your next meal.' : "You're on track! Keep it consistent through the rest of the day.");
    } finally {
      setSuggestionLoading(false);
    }
  };
  useEffect(() => {
    const load = async () => {
      const summaryData = await fetchSummary();
      fetchWeek();
      fetchSuggestion(summaryData);
    };
    load();
  }, []);
  if (loading) {
    return <div className="flex flex-col md:flex-row min-h-screen">
        <Sidebar />
        <div className="flex-1 flex items-center justify-center text-gray-400">
          Loading your dashboard...
        </div>
      </div>;
  }
  const {
    totals,
    goals,
    meals
  } = summary;
  return <div className="flex flex-col md:flex-row min-h-screen bg-gray-50">
      <Sidebar />

      <main className="flex-1 p-4 sm:p-6 md:p-8 w-full max-w-full overflow-x-hidden">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-lg sm:text-xl font-bold text-gray-900">
              Good Morning, {user?.name?.split(' ')[0]}! 👋
            </h1>
            <p className="text-sm text-gray-500">Stay consistent and achieve your goals.</p>
          </div>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4 mb-6">
          <MacroCard icon={Flame} label="Calories" value={totals.calories} goal={goals.calories} unit=" kcal" color="orange" />
          <MacroCard icon={Leaf} label="Protein" value={totals.protein} goal={goals.protein} unit="g" color="green" />
          <MacroCard icon={Wheat} label="Carbs" value={totals.carbs} goal={goals.carbs} unit="g" color="blue" />
          <MacroCard icon={Droplet} label="Fat" value={totals.fat} goal={goals.fat} unit="g" color="purple" />
          <div className="col-span-2 sm:col-span-3 md:col-span-1">
            <AISuggestionCard suggestion={suggestionLoading ? 'Thinking of a suggestion for you...' : suggestion} />
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            <TodayMeals meals={meals} />
          </div>
          <div className="space-y-6">
            <CaloriesChart weekData={weekData} goal={goals.calories} />
            <WaterTracker glasses={water} goal={goals.water} onAdd={() => setWater(w => Math.min(w + 1, goals.water))} />
            <StreakCard streak={user?.streak || 0} />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
          <NutrientDonut protein={totals.protein} carbs={totals.carbs} fat={totals.fat} />
        </div>
      </main>
    </div>;
};
export default Dashboard;