import { useEffect, useState } from 'react';
import { Sparkles, Target, Utensils, Clock, Heart, RefreshCw } from 'lucide-react';
import Sidebar from '../components/common/Sidebar';
import axiosInstance from '../api/axiosInstance';
import botImage from '../assets/images/bot.png';
const categoryIcons = {
  Macros: Target,
  'Food Choice': Utensils,
  Habit: Clock,
  Encouragement: Heart
};
const categoryColors = {
  Macros: 'bg-orange-50 text-orange-600',
  'Food Choice': 'bg-green-50 text-green-600',
  Habit: 'bg-blue-50 text-blue-600',
  Encouragement: 'bg-purple-50 text-purple-600'
};
const Suggestions = () => {
  const [suggestions, setSuggestions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState('');
  const fetchSuggestions = async (isRefresh = false) => {
    if (isRefresh) setRefreshing(true);
    setError('');
    try {
      const {
        data
      } = await axiosInstance.get('/ai/suggestions');
      setSuggestions(data.suggestions);
    } catch (err) {
      setError(err.response?.data?.message || 'Could not load suggestions right now.');
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };
  useEffect(() => {
    fetchSuggestions();
  }, []);
  return <div className="flex flex-col md:flex-row min-h-screen bg-gray-50">
      <Sidebar />

      <main className="flex-1 p-4 sm:p-6 md:p-8 w-full max-w-full overflow-x-hidden">
        <div className="flex items-center justify-between mb-6 flex-wrap gap-4">
          <div className="flex items-center gap-3">
            <img src={botImage} alt="FoodLog AI" className="w-10 h-10" />
            <div>
              <h1 className="text-lg sm:text-xl font-bold text-gray-900">AI Suggestions</h1>
              <p className="text-sm text-gray-500">Personalized tips based on what you've eaten today.</p>
            </div>
          </div>
          <button onClick={() => fetchSuggestions(true)} disabled={refreshing} className="flex items-center gap-2 px-4 py-2 border border-gray-200 rounded-lg text-sm font-medium text-gray-600 hover:border-brand-300 hover:text-brand-600 transition disabled:opacity-60">
            <RefreshCw size={14} className={refreshing ? 'animate-spin' : ''} />
            Refresh
          </button>
        </div>

        {loading ? <p className="text-sm text-gray-400">Generating your suggestions...</p> : error ? <div className="text-sm text-amber-700 bg-amber-50 border border-amber-100 rounded-lg p-4">{error}</div> : suggestions.length === 0 ? <p className="text-sm text-gray-400">No suggestions yet — log a meal today to get personalized tips.</p> : <div className="grid sm:grid-cols-2 gap-4">
            {suggestions.map((s, i) => {
          const Icon = categoryIcons[s.category] || Sparkles;
          const colorClass = categoryColors[s.category] || 'bg-brand-50 text-brand-600';
          return <div key={i} className="bg-white border border-gray-100 rounded-xl p-5">
                  <div className={`w-9 h-9 rounded-full flex items-center justify-center mb-3 ${colorClass}`}>
                    <Icon size={16} />
                  </div>
                  <p className="text-xs font-medium text-gray-400 mb-1">{s.category}</p>
                  <p className="text-sm text-gray-700 leading-relaxed">{s.text}</p>
                </div>;
        })}
          </div>}
      </main>
    </div>;
};
export default Suggestions;