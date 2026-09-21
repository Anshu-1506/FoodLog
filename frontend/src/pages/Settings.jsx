import { useState } from 'react';
import { Lock, Bell, LogOut, Trash2 } from 'lucide-react';
import Sidebar from '../components/common/Sidebar';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
const Toggle = ({
  checked,
  onChange
}) => <button onClick={() => onChange(!checked)} className={`w-11 h-6 rounded-full transition relative shrink-0 ${checked ? 'bg-brand-600' : 'bg-gray-200'}`}>
    <span className={`absolute top-0.5 w-5 h-5 bg-white rounded-full shadow transition-transform ${checked ? 'translate-x-5' : 'translate-x-0.5'}`} />
  </button>;
const Settings = () => {
  const {
    logout
  } = useAuth();
  const navigate = useNavigate();
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [mealReminders, setMealReminders] = useState(true);
  const [weeklyReport, setWeeklyReport] = useState(true);
  const [error, setError] = useState('');
  const handlePasswordChange = e => {
    e.preventDefault();
    setError("Password change isn't available yet — coming soon.");
  };
  const handleLogout = () => {
    logout();
    navigate('/login');
  };
  return <div className="flex flex-col md:flex-row min-h-screen bg-gray-50">
      <Sidebar />

      <main className="flex-1 p-4 sm:p-6 md:p-8 w-full max-w-full md:max-w-2xl space-y-6 overflow-x-hidden">
        <div>
          <h1 className="text-lg sm:text-xl font-bold text-gray-900 mb-1">Settings</h1>
          <p className="text-sm text-gray-500">Manage your account preferences and security.</p>
        </div>

        <div className="bg-white border border-gray-100 rounded-xl p-4 sm:p-6">
          <div className="flex items-center gap-2 mb-4">
            <Lock size={16} className="text-gray-500" />
            <h3 className="font-semibold text-gray-900">Change Password</h3>
          </div>

          {error && <div className="mb-4 text-sm text-amber-700 bg-amber-50 border border-amber-100 rounded-lg px-3 py-2">{error}</div>}

          <form onSubmit={handlePasswordChange} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Current Password</label>
              <input type="password" value={currentPassword} onChange={e => setCurrentPassword(e.target.value)} className="w-full px-3 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-brand-500" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">New Password</label>
              <input type="password" value={newPassword} onChange={e => setNewPassword(e.target.value)} className="w-full px-3 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-brand-500" />
            </div>
            <button type="submit" className="px-5 py-2.5 bg-brand-600 text-white text-sm font-semibold rounded-lg hover:bg-brand-700 transition">
              Update Password
            </button>
          </form>
        </div>

        <div className="bg-white border border-gray-100 rounded-xl p-4 sm:p-6">
          <div className="flex items-center gap-2 mb-4">
            <Bell size={16} className="text-gray-500" />
            <h3 className="font-semibold text-gray-900">Notifications</h3>
          </div>
          <div className="space-y-4">
            <div className="flex items-center justify-between gap-4">
              <div className="min-w-0">
                <p className="text-sm font-medium text-gray-800">Meal Reminders</p>
                <p className="text-xs text-gray-400">Get reminded to log your meals</p>
              </div>
              <Toggle checked={mealReminders} onChange={setMealReminders} />
            </div>
            <div className="flex items-center justify-between gap-4">
              <div className="min-w-0">
                <p className="text-sm font-medium text-gray-800">Weekly Report</p>
                <p className="text-xs text-gray-400">Receive a summary of your week</p>
              </div>
              <Toggle checked={weeklyReport} onChange={setWeeklyReport} />
            </div>
          </div>
        </div>

        <div className="bg-white border border-gray-100 rounded-xl p-4 sm:p-6">
          <h3 className="font-semibold text-gray-900 mb-4">Account</h3>
          <div className="flex flex-col gap-3">
            <button onClick={handleLogout} className="flex items-center gap-2 px-4 py-2.5 border border-gray-200 rounded-lg text-sm font-medium text-gray-600 hover:bg-gray-50 w-fit">
              <LogOut size={16} /> Log Out
            </button>
            <button className="flex items-center gap-2 px-4 py-2.5 border border-red-200 rounded-lg text-sm font-medium text-red-600 hover:bg-red-50 w-fit">
              <Trash2 size={16} /> Delete Account
            </button>
          </div>
        </div>
      </main>
    </div>;
};
export default Settings;