import { useState } from 'react';
import { Calculator, ArrowRight } from 'lucide-react';
import axiosInstance from '../../api/axiosInstance';
const activityOptions = [{
  value: 'sedentary',
  label: 'Sedentary (little to no exercise)'
}, {
  value: 'light',
  label: 'Lightly active (1-3 days/week)'
}, {
  value: 'moderate',
  label: 'Moderately active (3-5 days/week)'
}, {
  value: 'active',
  label: 'Active (6-7 days/week)'
}, {
  value: 'very_active',
  label: 'Very active (hard exercise + physical job)'
}];
const GoalCalculator = ({
  initialStats,
  onApply
}) => {
  const [form, setForm] = useState({
    gender: initialStats?.gender || 'male',
    age: initialStats?.age || '',
    heightCm: initialStats?.heightCm || '',
    currentWeightKg: initialStats?.currentWeightKg || '',
    targetWeightKg: initialStats?.targetWeightKg || '',
    activityLevel: initialStats?.activityLevel || 'moderate',
    timeframeWeeks: initialStats?.timeframeWeeks || 12
  });
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const update = (key, value) => setForm(p => ({
    ...p,
    [key]: value
  }));
  const handleCalculate = async () => {
    setError('');
    const required = ['age', 'heightCm', 'currentWeightKg', 'targetWeightKg', 'timeframeWeeks'];
    if (required.some(k => !form[k])) {
      setError('Please fill in all fields.');
      return;
    }
    setLoading(true);
    try {
      const {
        data
      } = await axiosInstance.post('/goals/calculate', {
        ...form,
        age: Number(form.age),
        heightCm: Number(form.heightCm),
        currentWeightKg: Number(form.currentWeightKg),
        targetWeightKg: Number(form.targetWeightKg),
        timeframeWeeks: Number(form.timeframeWeeks)
      });
      setResult(data);
      axiosInstance.put('/goals/body-stats', {
        ...form,
        age: Number(form.age),
        heightCm: Number(form.heightCm),
        currentWeightKg: Number(form.currentWeightKg),
        targetWeightKg: Number(form.targetWeightKg),
        timeframeWeeks: Number(form.timeframeWeeks)
      }).catch(() => {});
    } catch (err) {
      setError(err.response?.data?.message || 'Could not calculate — please check your inputs.');
    } finally {
      setLoading(false);
    }
  };
  const handleApply = () => {
    onApply(result);
    setResult(null);
  };
  return <div className="bg-white border border-gray-100 rounded-xl p-5">
      <div className="flex items-center gap-2 mb-1">
        <Calculator size={16} className="text-brand-600" />
        <h3 className="font-semibold text-gray-900">Don't know your targets? Calculate them</h3>
      </div>
      <p className="text-sm text-gray-500 mb-4">
        Enter your details and we'll suggest calorie and macro targets based on your goal.
      </p>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Gender</label>
          <select value={form.gender} onChange={e => update('gender', e.target.value)} className="w-full px-3 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-brand-500">
            <option value="male">Male</option>
            <option value="female">Female</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Age</label>
          <input type="number" min="10" max="100" value={form.age} onChange={e => update('age', e.target.value)} placeholder="e.g. 22" className="w-full px-3 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-brand-500" />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Height (cm)</label>
          <input type="number" min="100" max="250" value={form.heightCm} onChange={e => update('heightCm', e.target.value)} placeholder="e.g. 170" className="w-full px-3 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-brand-500" />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Current Weight (kg)</label>
          <input type="number" min="30" max="250" value={form.currentWeightKg} onChange={e => update('currentWeightKg', e.target.value)} placeholder="e.g. 70" className="w-full px-3 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-brand-500" />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Target Weight (kg)</label>
          <input type="number" min="30" max="250" value={form.targetWeightKg} onChange={e => update('targetWeightKg', e.target.value)} placeholder="e.g. 65" className="w-full px-3 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-brand-500" />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Timeframe (weeks)</label>
          <input type="number" min="1" max="104" value={form.timeframeWeeks} onChange={e => update('timeframeWeeks', e.target.value)} placeholder="e.g. 12" className="w-full px-3 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-brand-500" />
        </div>

        <div className="col-span-2">
          <label className="block text-sm font-medium text-gray-700 mb-1">Activity Level</label>
          <select value={form.activityLevel} onChange={e => update('activityLevel', e.target.value)} className="w-full px-3 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-brand-500">
            {activityOptions.map(opt => <option key={opt.value} value={opt.value}>{opt.label}</option>)}
          </select>
        </div>
      </div>

      {error && <div className="mt-3 text-sm text-red-600 bg-red-50 border border-red-100 rounded-lg px-3 py-2">
          {error}
        </div>}

      <button onClick={handleCalculate} disabled={loading} className="mt-4 px-5 py-2.5 bg-brand-600 text-white text-sm font-semibold rounded-lg hover:bg-brand-700 transition disabled:opacity-60">
        {loading ? 'Calculating...' : 'Calculate My Targets'}
      </button>

      {result && <div className="mt-5 bg-brand-50 border border-brand-100 rounded-xl p-4">
          <p className="text-sm text-gray-600 mb-3">
            Based on your details (BMR: {result.bmr} kcal, maintenance: {result.tdee} kcal/day):
          </p>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-center">
            <div>
              <p className="text-lg font-bold text-orange-500">{result.calories}</p>
              <p className="text-xs text-gray-500">kcal/day</p>
            </div>
            <div>
              <p className="text-lg font-bold text-green-600">{result.protein}g</p>
              <p className="text-xs text-gray-500">Protein</p>
            </div>
            <div>
              <p className="text-lg font-bold text-blue-500">{result.carbs}g</p>
              <p className="text-xs text-gray-500">Carbs</p>
            </div>
            <div>
              <p className="text-lg font-bold text-purple-500">{result.fat}g</p>
              <p className="text-xs text-gray-500">Fat</p>
            </div>
          </div>
          <button onClick={handleApply} className="flex items-center gap-2 mt-4 px-5 py-2.5 bg-brand-600 text-white text-sm font-semibold rounded-lg hover:bg-brand-700 transition">
            Use These Targets <ArrowRight size={16} />
          </button>
        </div>}
    </div>;
};
export default GoalCalculator;