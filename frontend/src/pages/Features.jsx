import { Sparkles, Utensils, TrendingUp, Target, BookOpen, Sliders } from 'lucide-react';
import PublicNavbar from '../components/common/PublicNavbar';
const features = [{
  icon: Utensils,
  title: 'Natural Language Logging',
  desc: 'Type your meal the way you\'d say it out loud — "2 aloo parathe aur chai" — no manual food search needed.'
}, {
  icon: Sparkles,
  title: 'AI-Powered Parsing',
  desc: 'Gemini identifies food items and quantities from your text, while a structured food database handles the actual nutrition math.'
}, {
  icon: Target,
  title: 'Remaining Nutrition Budget',
  desc: 'See exactly how many calories, protein, carbs and fat you have left for the day — updated the moment you log a meal.'
}, {
  icon: Sliders,
  title: 'What-If Meal Simulator',
  desc: 'Preview how a meal would affect your day before committing to it — "Agar main 2 paneer parathe khaun?"'
}, {
  icon: TrendingUp,
  title: 'Progress & Insights',
  desc: 'Daily, weekly and monthly trend charts, plus automatic detection of patterns like low protein or weekend calorie spikes.'
}, {
  icon: BookOpen,
  title: 'Smart Recipes',
  desc: 'Get meal recommendations that actually fit your remaining budget and diet preference for the day.'
}];
const Features = () => <div className="min-h-screen bg-white">
    <PublicNavbar />
    <div className="max-w-5xl mx-auto px-4 sm:px-6 py-12 sm:py-16">
      <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 text-center">Features</h1>
      <p className="text-gray-500 text-center mt-3 max-w-xl mx-auto">
        Everything FoodLog does to make nutrition tracking effortless.
      </p>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-12">
        {features.map(({
        icon: Icon,
        title,
        desc
      }) => <div key={title} className="bg-white border border-gray-100 rounded-xl p-6 hover:shadow-sm transition">
            <div className="w-10 h-10 rounded-full bg-brand-50 flex items-center justify-center mb-4">
              <Icon size={20} className="text-brand-600" />
            </div>
            <h3 className="font-semibold text-gray-900 mb-2">{title}</h3>
            <p className="text-sm text-gray-500 leading-relaxed">{desc}</p>
          </div>)}
      </div>
    </div>
  </div>;
export default Features;