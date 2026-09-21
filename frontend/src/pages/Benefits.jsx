import { CheckCircle } from 'lucide-react';
import PublicNavbar from '../components/common/PublicNavbar';
const benefits = ['No manual food search — describe meals the way you actually eat and speak.', 'Built for Indian meals and language — understands Hinglish and regional dishes.', 'Deterministic nutrition math — AI parses language, not numbers, so calorie counts stay reliable.', 'See your remaining budget instantly, instead of guessing what you can still eat today.', 'Preview meals before committing with the What-If Simulator.', 'Understand patterns over time, not just single-day snapshots.'];
const Benefits = () => <div className="min-h-screen bg-white">
    <PublicNavbar />
    <div className="max-w-3xl mx-auto px-4 sm:px-6 py-12 sm:py-16">
      <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 text-center">Benefits</h1>
      <p className="text-gray-500 text-center mt-3">Why FoodLog fits into real, everyday eating habits.</p>

      <div className="space-y-4 mt-12">
        {benefits.map(b => <div key={b} className="flex items-start gap-3 bg-brand-50 border border-brand-100 rounded-xl p-4">
            <CheckCircle size={20} className="text-brand-600 shrink-0 mt-0.5" />
            <p className="text-sm text-gray-700">{b}</p>
          </div>)}
      </div>
    </div>
  </div>;
export default Benefits;