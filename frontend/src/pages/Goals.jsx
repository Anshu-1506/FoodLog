import { useEffect, useState } from 'react';
import { CheckCircle } from 'lucide-react';
import Sidebar from '../components/common/Sidebar';
import GoalPresetCard from '../components/goals/GoalPresetCard';
import GoalInput from '../components/goals/GoalInput';
import GoalCalculator from '../components/goals/GoalCalculator';
import axiosInstance from '../api/axiosInstance';
const Goals = () => {
  const [goalType, setGoalType] = useState('maintain');
  const [values, setValues] = useState({
    calories: 0,
    protein: 0,
    carbs: 0,
    fat: 0,
    water: 0
  });
  const [bodyStats, setBodyStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  useEffect(() => {
    axiosInstance.get('/goals').then(({
      data
    }) => {
      setGoalType(data.goalType);
      setValues({
        calories: data.calories,
        protein: data.protein,
        carbs: data.carbs,
        fat: data.fat,
        water: data.water
      });
      setBodyStats(data.bodyStats || null);
      setLoading(false);
    });
  }, []);
  const handlePresetSelect = async key => {
    setGoalType(key);
    setSaving(true);
    try {
      const {
        data
      } = await axiosInstance.put('/goals', {
        goalType: key
      });
      setValues({
        calories: data.calories,
        protein: data.protein,
        carbs: data.carbs,
        fat: data.fat,
        water: data.water
      });
      setSaved(true);
      setTimeout(() => setSaved(false), 2000);
    } finally {
      setSaving(false);
    }
  };
  const handleCustomSave = async () => {
    setSaving(true);
    try {
      await axiosInstance.put('/goals', values);
      setSaved(true);
      setTimeout(() => setSaved(false), 2000);
    } finally {
      setSaving(false);
    }
  };
  const handleApplyCalculated = result => {
    setValues({
      calories: result.calories,
      protein: result.protein,
      carbs: result.carbs,
      fat: result.fat,
      water: result.water
    });
    if (result.suggestedGoalType) setGoalType(result.suggestedGoalType);
  };
  if (loading) {
    return <div className="flex flex-col md:flex-row min-h-screen">
        <Sidebar />
        <div className="flex-1 flex items-center justify-center text-gray-400">Loading goals...</div>
      </div>;
  }
  return <div className="flex flex-col md:flex-row min-h-screen bg-gray-50">
      <Sidebar />

      <main className="flex-1 p-4 sm:p-6 md:p-8 w-full max-w-full md:max-w-3xl overflow-x-hidden">
        <h1 className="text-lg sm:text-xl font-bold text-gray-900 mb-1">Goals</h1>
        <p className="text-sm text-gray-500 mb-6">Choose a goal type to auto-set targets, calculate them, or fine-tune manually.</p>

        <GoalPresetCard active={goalType} onSelect={handlePresetSelect} />

        <div className="mt-6">
          <GoalCalculator initialStats={bodyStats} onApply={handleApplyCalculated} />
        </div>

        <div className="bg-white border border-gray-100 rounded-xl p-5 mt-6">
          <h3 className="font-semibold text-gray-900 mb-4">Custom Targets</h3>
          <p className="text-xs text-gray-400 mb-4">
            These update automatically when you pick a preset or apply calculated targets above — you can also edit them directly.
          </p>

          <div className="grid grid-cols-2 gap-4">
            <GoalInput label="Calories" value={values.calories} unit="kcal" color="text-orange-500" onChange={v => setValues(p => ({
            ...p,
            calories: v
          }))} />
            <GoalInput label="Protein" value={values.protein} unit="g" color="text-green-600" onChange={v => setValues(p => ({
            ...p,
            protein: v
          }))} />
            <GoalInput label="Carbs" value={values.carbs} unit="g" color="text-blue-500" onChange={v => setValues(p => ({
            ...p,
            carbs: v
          }))} />
            <GoalInput label="Fat" value={values.fat} unit="g" color="text-purple-500" onChange={v => setValues(p => ({
            ...p,
            fat: v
          }))} />
            <GoalInput label="Water" value={values.water} unit="glasses" color="text-blue-400" onChange={v => setValues(p => ({
            ...p,
            water: v
          }))} />
          </div>

          <button onClick={handleCustomSave} disabled={saving} className="flex items-center gap-2 mt-5 px-5 py-2.5 bg-brand-600 text-white text-sm font-semibold rounded-lg hover:bg-brand-700 transition disabled:opacity-60">
            {saved ? <CheckCircle size={16} /> : null}
            {saving ? 'Saving...' : saved ? 'Saved!' : 'Save Custom Goals'}
          </button>
        </div>
      </main>
    </div>;
};
export default Goals;