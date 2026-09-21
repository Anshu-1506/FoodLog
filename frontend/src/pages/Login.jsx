import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Mail, Lock, Eye, EyeOff } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import authPanel from '../assets/images/auth-panel.png';
import { GoogleLogin } from '@react-oauth/google';
const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const {
    login,
    googleLogin
  } = useAuth();
  const navigate = useNavigate();
  const handleSubmit = async e => {
    e.preventDefault();
    setError('');
    if (!email || !password) {
      setError('Please fill in both fields.');
      return;
    }
    try {
      setLoading(true);
      await login(email, password);
      navigate('/dashboard');
    } catch (err) {
      setError(err.response?.data?.message || 'Login failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };
  return <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
      <div className="w-full max-w-5xl bg-white rounded-2xl shadow-sm overflow-hidden grid md:grid-cols-2">

        {}
<div className="hidden md:flex w-full h-full bg-brand-50 items-center justify-center overflow-hidden">
  <img src={authPanel} alt="FoodLog" className="w-full h-full object-contain" />
</div>

        {}
        <div className="p-8 md:p-12 flex flex-col justify-center">
          <h2 className="text-2xl font-bold text-gray-900">Welcome back!</h2>
          <p className="text-gray-500 mt-1 mb-6">Log in to continue your healthy journey </p>

          {error && <div className="mb-4 text-sm text-red-600 bg-red-50 border border-red-100 rounded-lg px-3 py-2">
              {error}
            </div>}

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
              <div className="relative">
                <Mail size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                <input type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="Enter your email" className="w-full pl-10 pr-3 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500" />
              </div>
            </div>

            <div>
              <div className="flex justify-between items-center mb-1">
                <label className="block text-sm font-medium text-gray-700">Password</label>
                <Link to="/forgot-password" className="text-sm text-green-600 hover:underline">
                  Forgot Password?
                </Link>
              </div>
              <div className="relative">
                <Lock size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                <input type={showPassword ? 'text' : 'password'} value={password} onChange={e => setPassword(e.target.value)} placeholder="Enter your password" className="w-full pl-10 pr-10 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500" />
                <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400">
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            <label className="flex items-center gap-2 text-sm text-gray-600">
              <input type="checkbox" checked={rememberMe} onChange={e => setRememberMe(e.target.checked)} className="accent-green-600" />
              Remember me
            </label>

            <button type="submit" disabled={loading} className="w-full py-3 bg-green-600 text-white font-semibold rounded-lg hover:bg-green-700 transition disabled:opacity-60">
              {loading ? 'Logging in...' : 'Log In'}
            </button>
          </form>

          <div className="flex items-center gap-3 my-6">
            <div className="flex-1 h-px bg-gray-200" />
            <span className="text-sm text-gray-400">or continue with</span>
            <div className="flex-1 h-px bg-gray-200" />
          </div>

        <div className="flex justify-center">
  <GoogleLogin onSuccess={async credentialResponse => {
            try {
              setError('');
              await googleLogin(credentialResponse.credential);
              navigate('/dashboard');
            } catch (err) {
              setError('Google sign-in failed. Please try again.');
            }
          }} onError={() => setError('Google sign-in failed. Please try again.')} width="320" />
</div>

          <p className="text-center text-sm text-gray-500 mt-6">
            Don't have an account?{' '}
            <Link to="/signup" className="text-green-600 font-medium hover:underline">
              Sign Up
            </Link>
          </p>
        </div>
      </div>
    </div>;
};
export default Login;