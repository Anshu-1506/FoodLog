import { Link } from 'react-router-dom';
import { MessageSquare, Cpu, BarChart3, Rocket } from 'lucide-react';
import PublicNavbar from '../components/common/PublicNavbar';
const steps = [{
  icon: MessageSquare,
  title: 'Describe your meal',
  desc: 'Type naturally in English, Hindi, or Hinglish — "Lunch mein 4 roti, dal, rice aur salad khaya".'
}, { icon: Cpu,
   title: 'AI analyzes your meal',
   desc: 'OpenRouter AI identifies the food items and quantities, then estimates calories, protein, carbs and fat based on typical Indian recipe preparations and serving sizes.'
 }, {
  icon: BarChart3,
  title: 'See your dashboard update',
  desc: 'Your remaining calorie and macro budget, weekly charts, and AI suggestions update instantly based on what you just logged.'
}, {
  icon: Rocket,
  title: 'Get better every day',
  desc: 'Insights surface patterns over 7 or 30 days, and Recipes recommends meals that fit whatever budget you have left.'
}];
const HowItWorks = () => <div className="min-h-screen bg-white">
    <PublicNavbar />
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-12 sm:py-16">
      <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 text-center">How It Works</h1>
      <p className="text-gray-500 text-center mt-3 max-w-xl mx-auto">
        From a single sentence to a full nutrition breakdown, in four steps.
      </p>

      <div className="mt-12 space-y-6">
        {steps.map(({
        icon: Icon,
        title,
        desc
      }, i) => <div key={title} className="flex gap-5 bg-white border border-gray-100 rounded-xl p-6">
            <div className="flex flex-col items-center shrink-0">
              <div className="w-10 h-10 rounded-full bg-brand-600 text-white flex items-center justify-center font-bold text-sm">
                {i + 1}
              </div>
              {i < steps.length - 1 && <div className="w-px flex-1 bg-gray-100 mt-2" />}
            </div>
            <div>
              <div className="flex items-center gap-2 mb-1">
                <Icon size={18} className="text-brand-600" />
                <h3 className="font-semibold text-gray-900">{title}</h3>
              </div>
              <p className="text-sm text-gray-500 leading-relaxed">{desc}</p>
            </div>
          </div>)}
      </div>

      <div className="text-center mt-12">
        <Link to="/signup" className="inline-flex items-center gap-2 px-6 py-3 bg-green-600 text-white font-semibold rounded-lg hover:bg-green-700 transition">
          Try It Yourself
        </Link>
      </div>
    </div>
  </div>;
export default HowItWorks;