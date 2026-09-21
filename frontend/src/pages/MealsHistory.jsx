import { useEffect, useState, useCallback } from 'react';
import { Search } from 'lucide-react';
import Sidebar from '../components/common/Sidebar';
import MealCard from '../components/meals/MealCard';
import EditMealModal from '../components/meals/EditMealModal';
import axiosInstance from '../api/axiosInstance';
const mealTypes = ['all', 'breakfast', 'lunch', 'snack', 'dinner'];
const MealsHistory = () => {
  const [meals, setMeals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [filterType, setFilterType] = useState('all');
  const [date, setDate] = useState('');
  const [editingMeal, setEditingMeal] = useState(null);
  const fetchMeals = useCallback(async () => {
    setLoading(true);
    try {
      const params = {};
      if (search) params.search = search;
      if (filterType !== 'all') params.mealType = filterType;
      if (date) params.date = date;
      const {
        data
      } = await axiosInstance.get('/meals', {
        params
      });
      setMeals(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }, [search, filterType, date]);
  useEffect(() => {
    const timeout = setTimeout(fetchMeals, 300);
    return () => clearTimeout(timeout);
  }, [fetchMeals]);
  const handleDelete = async id => {
    if (!window.confirm('Delete this meal?')) return;
    try {
      await axiosInstance.delete(`/meals/${id}`);
      setMeals(prev => prev.filter(m => m._id !== id));
    } catch (err) {
      console.error(err);
    }
  };
  const handleSaveEdit = async (id, updates) => {
    try {
      const {
        data
      } = await axiosInstance.put(`/meals/${id}`, updates);
      setMeals(prev => prev.map(m => m._id === id ? data : m));
      setEditingMeal(null);
    } catch (err) {
      console.error(err);
    }
  };
  return <div className="flex flex-col md:flex-row min-h-screen bg-gray-50">
      <Sidebar />

      <main className="flex-1 p-4 sm:p-6 md:p-8 w-full max-w-full overflow-x-hidden">
        <h1 className="text-lg sm:text-xl font-bold text-gray-900 mb-1">Meals History</h1>
        <p className="text-sm text-gray-500 mb-6">Review, search and manage everything you've logged.</p>

        <div className="flex flex-col sm:flex-row gap-3 mb-6">
          <div className="relative flex-1 min-w-0">
            <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input type="text" placeholder="Search meals..." value={search} onChange={e => setSearch(e.target.value)} className="w-full pl-9 pr-3 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-brand-500" />
          </div>

          <input type="date" value={date} onChange={e => setDate(e.target.value)} className="border border-gray-200 rounded-lg px-3 py-2.5 text-sm text-gray-600 w-full sm:w-auto" />

          <div className="flex gap-2 overflow-x-auto pb-1 sm:pb-0">
            {mealTypes.map(type => <button key={type} onClick={() => setFilterType(type)} className={`px-3 py-2 text-sm rounded-lg capitalize border transition whitespace-nowrap ${filterType === type ? 'bg-brand-600 text-white border-brand-600' : 'border-gray-200 text-gray-500 hover:border-brand-300'}`}>
                {type}
              </button>)}
          </div>
        </div>

        {loading ? <p className="text-sm text-gray-400">Loading meals...</p> : meals.length === 0 ? <p className="text-sm text-gray-400">No meals found for these filters.</p> : <div className="space-y-3">
            {meals.map(meal => <MealCard key={meal._id} meal={meal} onEdit={setEditingMeal} onDelete={handleDelete} />)}
          </div>}
      </main>

      {editingMeal && <EditMealModal meal={editingMeal} onClose={() => setEditingMeal(null)} onSave={handleSaveEdit} />}
    </div>;
};
export default MealsHistory;