import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { CheckCircle } from 'lucide-react';
import Sidebar from '../components/common/Sidebar';
import MealInput from '../components/meals/MealInput';
import MealPreviewCard from '../components/meals/MealPreviewCard';
import WhatIfSimulator from '../components/meals/WhatIfSimulator';
import axiosInstance from '../api/axiosInstance';

const AddMeal = () => {
  const navigate = useNavigate();
  const [analyzing, setAnalyzing] = useState(false);
  const [preview, setPreview] = useState(null);
  const [error, setError] = useState('');
  const [summary, setSummary] = useState(null);
  useEffect(() => {
    axiosInstance.get('/meals/today/summary').then(res => setSummary(res.data)).catch(() => {});
  }, []);
  const handleAnalyze = async ({
    text,
    mealType
  }) => {
    setError('');
    setAnalyzing(true);
    setPreview(null);
    try {
      const {
        data: parsed
      } = await axiosInstance.post('/ai/parse', {
        text
      });
      if (!parsed.items.length) {
        setError(parsed.notes || "Couldn't identify any food items — try naming them more clearly.");
        return;
      }
      const res = await axiosInstance.post('/meals', {
        mealType,
        rawInput: text,
        items: parsed.items
      });
      setPreview({
        ...res.data,
        mealType,
        rawInput: text,
        aiNotes: parsed.notes
      });
    } catch (err) {
      setError(err.response?.data?.message || 'Something went wrong analyzing this meal.');
    } finally {
      setAnalyzing(false);
    }
  };
  const handleConfirm = () => navigate('/dashboard');
  return <div className="flex flex-col md:flex-row min-h-screen bg-gray-50">
      <Sidebar />

      <main className="flex-1 p-4 sm:p-6 md:p-8 w-full max-w-full md:max-w-3xl overflow-x-hidden">
        <h1 className="text-lg sm:text-xl font-bold text-gray-900 mb-1">Add Meal</h1>
        <p className="text-sm text-gray-500 mb-6">
          Tell FoodLog what you ate — AI will identify the items and calculate nutrition.
        </p>

        <MealInput onAnalyze={handleAnalyze} loading={analyzing} />

        {error && <div className="mt-4 text-sm text-red-600 bg-red-50 border border-red-100 rounded-lg px-3 py-2">
            {error}
          </div>}

        {preview && <>
            <MealPreviewCard items={preview.items} totals={{
          calories: preview.totalCalories,
          protein: preview.totalProtein,
          carbs: preview.totalCarbs,
          fat: preview.totalFat
        }} />
            <div className="flex items-center gap-3 mt-4">
              <button onClick={handleConfirm} className="flex items-center gap-2 px-5 py-2.5 bg-brand-600 text-white text-sm font-semibold rounded-lg hover:bg-brand-700 transition">
                <CheckCircle size={16} />
                Done — View Dashboard
              </button>
            </div>
          </>}

        {summary && <div className="mt-8">
            <WhatIfSimulator currentTotals={summary.totals} goals={summary.goals} />
          </div>}
      </main>
    </div>;
};
export default AddMeal;