import { BrowserRouter, Routes, Route, Outlet } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { DemoProvider } from './context/DemoContext';
import ProtectedRoute from './components/common/ProtectedRoute';
import LandingPage from './pages/LandingPage';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Features from './pages/Features';
import HowItWorks from './pages/HowItWorks';
import Benefits from './pages/Benefits';
import AboutUs from './pages/AboutUs';
import FAQ from './pages/FAQ';
import DemoDashboard from './pages/DemoDashboard';
import DemoAddMeal from './pages/DemoAddMeal';
import Dashboard from './pages/Dashboard';
import AddMeal from './pages/AddMeal';
import MealsHistory from './pages/MealsHistory';
import Progress from './pages/Progress';
import Insights from './pages/Insights';
import Goals from './pages/Goals';
import Recipes from './pages/Recipes';
import Profile from './pages/Profile';
import Settings from './pages/Settings';
import Suggestions from './pages/Suggestions';
function App() {
  return <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/features" element={<Features />} />
          <Route path="/how-it-works" element={<HowItWorks />} />
          <Route path="/benefits" element={<Benefits />} />
          <Route path="/about" element={<AboutUs />} />
          <Route path="/faq" element={<FAQ />} />

          {}
          <Route element={<DemoProvider><Outlet /></DemoProvider>}>
            <Route path="/demo" element={<DemoDashboard />} />
            <Route path="/demo/add-meal" element={<DemoAddMeal />} />
          </Route>

          <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
          <Route path="/add-meal" element={<ProtectedRoute><AddMeal /></ProtectedRoute>} />
          <Route path="/meals" element={<ProtectedRoute><MealsHistory /></ProtectedRoute>} />
          <Route path="/progress" element={<ProtectedRoute><Progress /></ProtectedRoute>} />
          <Route path="/insights" element={<ProtectedRoute><Insights /></ProtectedRoute>} />
          <Route path="/goals" element={<ProtectedRoute><Goals /></ProtectedRoute>} />
          <Route path="/recipes" element={<ProtectedRoute><Recipes /></ProtectedRoute>} />
          <Route path="/profile" element={<ProtectedRoute><Profile /></ProtectedRoute>} />
          <Route path="/settings" element={<ProtectedRoute><Settings /></ProtectedRoute>} />
          <Route path="/suggestions" element={<ProtectedRoute><Suggestions /></ProtectedRoute>} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>;
}
export default App;