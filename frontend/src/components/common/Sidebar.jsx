import { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { Home, Utensils, PlusCircle, TrendingUp, Clock, Target, BookOpen, User, Settings, LogOut, Menu, X } from 'lucide-react';
import logo from '../../assets/images/logo.png';
import { useAuth } from '../../context/AuthContext';
const navItems = [{
  to: '/dashboard',
  label: 'Dashboard',
  icon: Home
}, {
  to: '/meals',
  label: 'Meals',
  icon: Utensils
}, {
  to: '/add-meal',
  label: 'Add Meal',
  icon: PlusCircle
}, {
  to: '/progress',
  label: 'Progress',
  icon: TrendingUp
}, {
  to: '/insights',
  label: 'Insights',
  icon: Clock
}, {
  to: '/goals',
  label: 'Goals',
  icon: Target
}, {
  to: '/recipes',
  label: 'Recipes',
  icon: BookOpen
}, {
  to: '/profile',
  label: 'Profile',
  icon: User
}, {
  to: '/settings',
  label: 'Settings',
  icon: Settings
}];
const Sidebar = () => {
  const {
    logout
  } = useAuth();
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const handleLogout = () => {
    logout();
    navigate('/login');
  };
  const handleNavClick = () => setOpen(false);
  return <div className="contents">
      <div className="md:hidden flex items-center justify-between px-4 py-3 bg-white border-b border-gray-100 sticky top-0 z-30 w-full">
        <img src={logo} alt="FoodLog" className="h-7" />
        <button onClick={() => setOpen(true)} className="text-gray-600">
          <Menu size={22} />
        </button>
      </div>

      {open && <div className="fixed inset-0 bg-black/30 z-40 md:hidden" onClick={() => setOpen(false)} />}

      <aside className={`fixed md:static inset-y-0 left-0 z-50 w-64 min-h-screen bg-white border-r border-gray-100 flex flex-col px-4 py-6 transform transition-transform duration-200 ${open ? 'translate-x-0' : '-translate-x-full'} md:translate-x-0`}>
        <div className="flex items-center justify-between mb-8 ml-2">
          <img src={logo} alt="FoodLog" className="h-8" />
          <button onClick={() => setOpen(false)} className="md:hidden text-gray-400">
            <X size={20} />
          </button>
        </div>

        <nav className="flex-1 space-y-1 overflow-y-auto">
          {navItems.map(({
          to,
          label,
          icon: Icon
        }) => <NavLink key={to} to={to} onClick={handleNavClick} className={({
          isActive
        }) => `flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition ${isActive ? 'bg-brand-50 text-brand-700' : 'text-gray-600 hover:bg-gray-50'}`}>
              <Icon size={18} />
              {label}
            </NavLink>)}
        </nav>


        <button onClick={handleLogout} className="flex items-center gap-3 px-3 py-2.5 text-sm font-medium text-gray-500 hover:text-red-600 transition">
          <LogOut size={18} />
          Log Out
        </button>
      </aside>
    </div>;
};
export default Sidebar;