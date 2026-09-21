import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import logo from '../../assets/images/logo.png';
const navLinks = [{
  to: '/features',
  label: 'Features'
}, {
  to: '/how-it-works',
  label: 'How It Works'
}, {
  to: '/benefits',
  label: 'Benefits'
}, {
  to: '/about',
  label: 'About Us'
}, {
  to: '/faq',
  label: 'FAQ'
}];
const PublicNavbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  return <nav className="relative flex items-center justify-between px-4 sm:px-6 md:px-12 py-4 border-b border-gray-100 bg-white">
      <Link to="/">
        <img src={logo} alt="FoodLog" className="h-7 sm:h-9" />
      </Link>

      <div className="hidden lg:flex items-center gap-6 xl:gap-8 text-gray-700 text-sm font-medium">
        {navLinks.map(link => <Link key={link.to} to={link.to} className="hover:text-green-600">{link.label}</Link>)}
      </div>

      <div className="hidden lg:flex items-center gap-3">
        <Link to="/login" className="px-4 py-2 text-sm font-medium border border-gray-300 rounded-lg hover:border-green-600 hover:text-green-600 transition">
          Log In
        </Link>
        <Link to="/signup" className="px-4 py-2 text-sm font-medium bg-green-600 text-white rounded-lg hover:bg-green-700 transition">
          Sign Up
        </Link>
      </div>

      <button onClick={() => setMenuOpen(!menuOpen)} className="lg:hidden text-gray-700">
        {menuOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      {menuOpen && <div className="absolute top-full left-0 right-0 bg-white border-b border-gray-100 shadow-md lg:hidden z-40">
          <div className="flex flex-col px-4 py-3">
            {navLinks.map(link => <Link key={link.to} to={link.to} onClick={() => setMenuOpen(false)} className="py-2.5 text-sm font-medium text-gray-700 hover:text-green-600 border-b border-gray-50 last:border-0">
                {link.label}
              </Link>)}
            <div className="flex gap-3 mt-4">
              <Link to="/login" onClick={() => setMenuOpen(false)} className="flex-1 text-center px-4 py-2.5 text-sm font-medium border border-gray-300 rounded-lg hover:border-green-600 hover:text-green-600 transition">
                Log In
              </Link>
              <Link to="/signup" onClick={() => setMenuOpen(false)} className="flex-1 text-center px-4 py-2.5 text-sm font-medium bg-green-600 text-white rounded-lg hover:bg-green-700 transition">
                Sign Up
              </Link>
            </div>
          </div>
        </div>}
    </nav>;
};
export default PublicNavbar;