import { Link } from 'react-router-dom';
import { Rocket, PlayCircle, Sparkles } from 'lucide-react';
import PublicNavbar from '../components/common/PublicNavbar';
import heroTop from '../assets/images/landing-hero-top.png';
import heroBottom from '../assets/images/landing-hero-bottom.png';
const LandingPage = () => {
  return <div className="min-h-screen bg-white overflow-x-hidden">
      <PublicNavbar />

      <section className="grid md:grid-cols-2 gap-8 md:gap-12 items-center px-4 sm:px-6 md:px-12 py-10 md:py-16 max-w-7xl mx-auto">
        <div>
          <span className="inline-flex items-center gap-1.5 bg-brand-50 text-brand-700 text-xs font-medium px-3 py-1.5 rounded-full mb-5">
            <Sparkles size={12} />
            AI-Powered Nutrition Tracker
          </span>

          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 leading-tight">
            Log your food.<br />
            Understand your <span className="text-green-600">nutrition.</span>
          </h1>

          <p className="text-gray-500 text-sm sm:text-base mt-5 leading-relaxed max-w-md">
            FoodLog helps you track your meals, analyze calories and macros, and get AI-powered suggestions to help you eat better, every day.
          </p>

          <div className="flex flex-col sm:flex-row gap-3 mt-7">
            <Link to="/demo" className="flex items-center gap-2 px-6 py-3 bg-green-600 text-white text-sm sm:text-base font-semibold rounded-lg hover:bg-green-700 transition justify-center">
              <Rocket size={18} />
               Get Started for Free
            </Link>
            <Link to="/how-it-works" className="flex items-center gap-2 px-6 py-3 border border-gray-300 text-sm sm:text-base font-semibold rounded-lg hover:border-green-600 hover:text-green-600 transition justify-center">
              <PlayCircle size={18} />
              See How It Works
            </Link>
          </div>

          <div className="flex flex-wrap gap-6 sm:gap-8 mt-8 pt-6 border-t border-gray-100">
  <div>
    <p className="text-lg sm:text-xl font-bold text-gray-900">100%</p>
    <p className="text-xs sm:text-sm text-gray-400">Free to Use</p>
  </div>
  <div>
    <p className="text-lg sm:text-xl font-bold text-gray-900">AI-Powered</p>
    <p className="text-xs sm:text-sm text-gray-400">Nutrition Estimates</p>
  </div>
  <div>
    <p className="text-lg sm:text-xl font-bold text-gray-900">Hinglish</p>
    <p className="text-xs sm:text-sm text-gray-400">Supported</p>
  </div>
</div>
        </div>

        <img src={heroTop} alt="FoodLog app preview" className="w-full" />
      </section>

      <img src={heroBottom} alt="FoodLog features overview" className="w-full block" />
    </div>;
};
export default LandingPage;