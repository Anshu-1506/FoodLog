import PublicNavbar from '../components/common/PublicNavbar';
const AboutUs = () => <div className="min-h-screen bg-white">
    <PublicNavbar />
    <div className="max-w-3xl mx-auto px-4 sm:px-6 py-12 sm:py-16">
      <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 text-center">About Us</h1>

      <div className="mt-10 space-y-5 text-gray-600 leading-relaxed text-sm sm:text-base">
        <p>
          FoodLog was built to solve a simple problem: most nutrition trackers assume you'll manually
          search and select every food item you eat, which quickly becomes tedious and gets abandoned.
        </p>
        <p>
          We wanted logging a meal to feel as natural as telling a friend what you ate — in plain
          language, in whatever mix of English, Hindi, or Hinglish comes naturally, without hunting
          through a food database yourself.
        </p>
        <p>
          Under the hood, FoodLog keeps AI and math separate on purpose: Google Gemini handles
          understanding your sentence, while a structured, deterministic nutrition engine handles the
          actual calorie and macro calculations — so the numbers stay consistent and trustworthy every
          time.
        </p>
        <p>
          This project was built as a full-stack final-year application, combining a React/Vite
          frontend, a Node/Express backend, MongoDB for storage, and Gemini for natural language
          understanding.
        </p>
      </div>
    </div>
  </div>;
export default AboutUs;