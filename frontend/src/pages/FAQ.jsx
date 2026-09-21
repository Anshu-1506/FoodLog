import { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import PublicNavbar from '../components/common/PublicNavbar';
const faqs = [{
  q: 'How accurate is the nutrition calculation?',
  a: 'AI only parses your natural language input into food items and quantities. The actual calorie and macro numbers come from a structured, deterministic food database — not from AI guessing — so results stay consistent every time.'
}, {
  q: 'What if FoodLog doesn\'t recognize a food I mention?',
  a: 'It will flag the item as unrecognized and show an approximate result instead of a confident number, so you always know when to double-check.'
}, {
  q: 'Can I use Hindi or Hinglish?',
  a: 'Yes — you can describe meals in English, Hindi, or a mix of both, the way you\'d naturally say it.'
}, {
  q: 'What is the What-If Meal Simulator?',
  a: 'It lets you preview how a meal would affect your day\'s calories and macros without actually saving it, so you can decide before you eat.'
}, {
  q: 'Is my data private?',
  a: 'Your meals and goals are tied to your account with JWT-based authentication and are not shared publicly.'
}];
const FAQ = () => {
  const [open, setOpen] = useState(null);
  return <div className="min-h-screen bg-white">
      <PublicNavbar />
      <div className="max-w-2xl mx-auto px-4 sm:px-6 py-12 sm:py-16">
        <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 text-center">Frequently Asked Questions</h1>

        <div className="mt-10 space-y-3">
          {faqs.map((faq, i) => <div key={i} className="border border-gray-100 rounded-xl overflow-hidden">
              <button onClick={() => setOpen(open === i ? null : i)} className="w-full flex items-center justify-between px-5 py-4 text-left">
                <span className="text-sm sm:text-base font-medium text-gray-900">{faq.q}</span>
                <ChevronDown size={18} className={`text-gray-400 transition-transform shrink-0 ml-3 ${open === i ? 'rotate-180' : ''}`} />
              </button>
              {open === i && <div className="px-5 pb-4 text-sm text-gray-500 leading-relaxed">{faq.a}</div>}
            </div>)}
        </div>
      </div>
    </div>;
};
export default FAQ;