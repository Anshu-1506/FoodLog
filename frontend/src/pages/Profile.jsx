import { useEffect, useState } from 'react';
import { User, Mail, CheckCircle } from 'lucide-react';
import Sidebar from '../components/common/Sidebar';
import StatCard from '../components/profile/StatCard';
import axiosInstance from '../api/axiosInstance';
import { useAuth } from '../context/AuthContext';
const goalLabels = {
  lose: 'Weight Loss',
  maintain: 'Maintenance',
  gain: 'Weight Gain',
  muscle: 'Muscle Gain'
};
const Profile = () => {
  const {
    user
  } = useAuth();
  const [name, setName] = useState(user?.name || '');
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [mealCount, setMealCount] = useState(0);
  const [goalType, setGoalType] = useState('maintain');
  useEffect(() => {
    axiosInstance.get('/meals').then(({
      data
    }) => setMealCount(data.length)).catch(() => {});
    axiosInstance.get('/goals').then(({
      data
    }) => setGoalType(data.goalType)).catch(() => {});
  }, []);
  const handleSave = async () => {
    setSaving(true);
    setTimeout(() => {
      setSaving(false);
      setSaved(true);
      setTimeout(() => setSaved(false), 2000);
    }, 500);
  };
  return <div className="flex flex-col md:flex-row min-h-screen bg-gray-50">
      <Sidebar />

      <main className="flex-1 p-4 sm:p-6 md:p-8 w-full max-w-full md:max-w-2xl overflow-x-hidden">
        <h1 className="text-lg sm:text-xl font-bold text-gray-900 mb-1">Profile</h1>
        <p className="text-sm text-gray-500 mb-6">Manage your personal information.</p>

        <div className="bg-white border border-gray-100 rounded-xl p-4 sm:p-6 mb-6">
          <div className="flex items-center gap-4 mb-6">
            <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-brand-100 flex items-center justify-center text-brand-700 text-lg sm:text-xl font-bold shrink-0">
              {user?.name?.charAt(0).toUpperCase()}
            </div>
            <div className="min-w-0">
              <p className="font-semibold text-gray-900 truncate">{user?.name}</p>
              <p className="text-sm text-gray-400 truncate">{user?.email}</p>
            </div>
          </div>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
              <div className="relative">
                <User size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                <input type="text" value={name} onChange={e => setName(e.target.value)} className="w-full pl-9 pr-3 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-brand-500" />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
              <div className="relative">
                <Mail size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                <input type="email" value={user?.email || ''} disabled className="w-full pl-9 pr-3 py-2.5 border border-gray-200 rounded-lg text-sm bg-gray-50 text-gray-400" />
              </div>
            </div>

            <button onClick={handleSave} disabled={saving} className="flex items-center gap-2 px-5 py-2.5 bg-brand-600 text-white text-sm font-semibold rounded-lg hover:bg-brand-700 transition disabled:opacity-60">
              {saved && <CheckCircle size={16} />}
              {saving ? 'Saving...' : saved ? 'Saved!' : 'Save Changes'}
            </button>
          </div>
        </div>

        <div className="grid grid-cols-3 gap-3 sm:gap-4">
          <StatCard label="Meals Logged" value={mealCount} />
          <StatCard label="Day Streak" value={user?.streak || 0} />
          <StatCard label="Goal" value={goalLabels[goalType]} />
        </div>
      </main>
    </div>;
};
export default Profile;