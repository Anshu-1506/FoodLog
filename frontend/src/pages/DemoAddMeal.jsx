import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { CheckCircle, ArrowLeft } from 'lucide-react';
import axios from 'axios';
import MealInput from '../components/meals/MealInput';
import MealPreviewCard from '../components/meals/MealPreviewCard';
import { useDemo } from '../context/DemoContext';
const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';
const DemoAddMeal = () => {
  const {
    addMeal
  } = useDemo();
  const navigate = useNavigate();
  const [analyzing, setAnalyzing] = useState(false);
  const [preview, setPreview] = useState(null);
  const [pendingMealType, setPendingMealType] = useState(null);
  const [error, setError] = useState('');
  const handleAnalyze = async ({
    text,
    mealType
  }) => {
    setError('');
    setAnalyzing(true);
    setPreview(null);
    try {
      const {
        data
      } = await axios.post(`${API_URL}/ai/demo-parse`, {
        text
      });
      if (!data.items.length) {
        setError(data.notes || "Couldn't identify any food items — try something like '2 roti, dal, rice'.");
        return;
      }
      setPreview({
        items: data.items,
        totals: data.totals,
        rawInput: text
      });
      setPendingMealType(mealType);
    } catch (err) {
      if (err.response?.status === 429) {
        setError(err.response.data?.message || 'Demo limit reached — sign up for unlimited AI meal analysis.');
      } else {
        setError('Something went wrong analyzing this meal.');
      }
    } finally {
      setAnalyzing(false);
    }
  };
  const handleSave = () => {
    addMeal({
      mealType: pendingMealType,
      rawInput: preview.rawInput,
      items: preview.items,
      totalCalories: preview.totals.calories,
      totalProtein: preview.totals.protein,
      totalCarbs: preview.totals.carbs,
      totalFat: preview.totals.fat
    });
    navigate('/demo');
  };
  return <div className="min-h-screen bg-gray-50 p-4 sm:p-6 md:p-8 max-w-2xl mx-auto">
      <Link to="/demo" className="inline-flex items-center gap-1 text-sm text-gray-500 hover:text-brand-600 mb-4">
        <ArrowLeft size={16} /> Back to Dashboard
      </Link>

      <h1 className="text-lg sm:text-xl font-bold text-gray-900 mb-1">Add Meal (Demo)</h1>
      <p className="text-sm text-gray-500 mb-6">
        This uses real AI to analyze your meal — nothing is saved to a database.
      </p>

      <MealInput onAnalyze={handleAnalyze} loading={analyzing} />

      {error && <div className="mt-4 text-sm text-amber-700 bg-amber-50 border border-amber-100 rounded-lg px-3 py-2">
          {error}
        </div>}

      {preview && <>
          <MealPreviewCard items={preview.items} totals={preview.totals} />
          <button onClick={handleSave} className="flex items-center gap-2 mt-4 px-5 py-2.5 bg-brand-600 text-white text-sm font-semibold rounded-lg hover:bg-brand-700 transition">
            <CheckCircle size={16} />
            Add to Demo Dashboard
          </button>
        </>}
    </div>;
};
export default DemoAddMeal;