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
  Under the hood, FoodLog uses OpenRouter's AI models to understand natural language and estimate
  nutrition based on real recipe knowledge — grounded with reference data for common Indian dishes
  so the numbers stay realistic and consistent rather than arbitrary.
</p>
<p>
  This project was built as a full-stack final-year application, combining a React/Vite
  frontend, a Node/Express backend, MongoDB for storage, and OpenRouter for natural language
  understanding and nutrition estimation.
</p>
      </div>
    </div>
  </div>;
export default AboutUs;