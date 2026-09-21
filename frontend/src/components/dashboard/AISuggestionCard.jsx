import { useNavigate } from 'react-router-dom';
import { Info, ArrowRight } from 'lucide-react';
import botImage from '../../assets/images/bot.png';
const AISuggestionCard = ({
  suggestion
}) => {
  const navigate = useNavigate();
  return <div className="bg-white border border-gray-100 rounded-xl p-5 shadow-md shadow-gray-200/50 hover:shadow-lg hover:shadow-gray-200/60 transition-shadow">
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 bg-brand-500 rounded-full" />
          <span className="text-sm font-semibold text-gray-900">AI Suggestion</span>
        </div>
        <Info size={15} className="text-gray-300" />
      </div>

      <div className="flex items-start gap-3">
        <img src={botImage} alt="FoodLog AI" className="w-12 h-12 shrink-0" />
        <p className="text-sm text-gray-600 leading-relaxed">
          {suggestion || 'Log a meal to get your first personalized suggestion.'}
        </p>
      </div>

      <button onClick={() => navigate('/suggestions')} className="flex items-center gap-1 text-sm font-medium text-brand-600 mt-4 hover:underline">
        View Suggestions <ArrowRight size={14} />
      </button>
    </div>;
};
export default AISuggestionCard;