// import React, { useState } from 'react';
// import { Link, useNavigate } from 'react-router-dom';
// import { useAuth } from '@/context/AuthContext';
// import { Button } from '@/components/ui/button';
// import { Bell, User, LogOut, Menu, X } from 'lucide-react';
// import {
//   DropdownMenu,
//   DropdownMenuContent,
//   DropdownMenuItem,
//   DropdownMenuTrigger,
// } from '@/components/ui/dropdown-menu';

// const Header = () => {
//   const { user, logout, isAuthenticated } = useAuth();
//   const navigate = useNavigate();
//   const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

//   const handleLogout = () => {
//     logout();
//     navigate('/');
//   };

//   const navLinks = user?.role === 'Admin' ? [
//     { label: 'Dashboard', path: '/admin' },
//     { label: 'Leads', path: '/admin?tab=leads' },
//     { label: 'Projects', path: '/admin?tab=projects' },
//     { label: 'Suppliers', path: '/admin?tab=suppliers' },
//     { label: 'Blog Manager', path: '/admin?tab=blog' },
//     { label: 'Contact', path: '/contact' },
//   ] : [
//     { label: 'Home', path: '/' },
//     { label: 'Capabilities', path: '/capabilities' },
//     { label: 'Industries', path: '/industries' },
//     { label: 'Quality', path: '/quality' },
//     { label: 'Blog', path: '/blog' },
//     { label: 'Contact', path: '/contact' },
//   ];

//   return (
//     <header className="sticky top-0 z-50 bg-[#151515]/95 backdrop-blur-md border-b border-[#301B3F]/30">
//       <div className="container mx-auto px-4 sm:px-6 lg:px-8">
//         <div className="flex items-center justify-between h-20">
//           {/* Logo */}
//           <Link to="/" className="flex items-center space-x-3" data-testid="header-logo">
//             <div className="w-10 h-10 bg-gradient-to-br from-[#720455] to-[#910A67] rounded-lg flex items-center justify-center">
//               <span className="text-white font-bold text-xl">N</span>
//             </div>
//             <span className="text-xl font-semibold text-white">DexAura</span>
//           </Link>

//           {/* Desktop Navigation */}
//           <nav className="hidden md:flex items-center space-x-1">
//             {navLinks.map((link) => (
//               <Link
//                 key={link.path}
//                 to={link.path}
//                 className="px-4 py-2 text-gray-300 hover:text-white hover:bg-[#301B3F]/30 rounded-lg transition-all duration-200"
//                 data-testid={`nav-link-${link.label.toLowerCase()}`}
//               >
//                 {link.label}
//               </Link>
//             ))}
//           </nav>

//           {/* Desktop Actions */}
//           <div className="hidden md:flex items-center space-x-4">
//             <Button
//               onClick={() => navigate('/instant-quote')}
//               className="bg-gradient-to-r from-[#720455] to-[#910A67] hover:from-[#910A67] hover:to-[#720455] text-white px-6 py-2.5 rounded-full font-medium shadow-lg shadow-[#720455]/30"
//               data-testid="get-instant-quote-btn"
//             >
//               Get Instant Quote
//             </Button>

//             {isAuthenticated ? (
//               <>
//                 <Button variant="ghost" size="icon" data-testid="notifications-btn">
//                   <Bell className="w-5 h-5 text-gray-300" />
//                 </Button>
//                 <DropdownMenu>
//                   <DropdownMenuTrigger asChild>
//                     <Button variant="ghost" size="icon" data-testid="user-menu-trigger">
//                       <User className="w-5 h-5 text-gray-300" />
//                     </Button>
//                   </DropdownMenuTrigger>
//                   <DropdownMenuContent align="end" className="w-48 bg-[#1a1a1a] border-[#301B3F]">
//                     <DropdownMenuItem onClick={() => navigate('/teamspace')} data-testid="teamspace-link">
//                       Teamspace
//                     </DropdownMenuItem>
//                     {user?.role === 'Admin' && (
//                       <DropdownMenuItem onClick={() => navigate('/admin')} data-testid="admin-link">
//                         Admin Dashboard
//                       </DropdownMenuItem>
//                     )}
//                     <DropdownMenuItem onClick={handleLogout} data-testid="logout-btn">
//                       <LogOut className="w-4 h-4 mr-2" /> Logout
//                     </DropdownMenuItem>
//                   </DropdownMenuContent>
//                 </DropdownMenu>
//               </>
//             ) : (
//               <Button
//                 onClick={() => navigate('/login')}
//                 variant="outline"
//                 className="border-[#720455] text-white hover:bg-[#720455]/10"
//                 data-testid="login-btn"
//               >
//                 Login
//               </Button>
//             )}
//           </div>

//           {/* Mobile Menu Button */}
//           <button
//             onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
//             className="md:hidden text-white p-2"
//             data-testid="mobile-menu-toggle"
//           >
//             {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
//           </button>
//         </div>

//         {/* Mobile Menu */}
//         {mobileMenuOpen && (
//           <div className="md:hidden py-4 border-t border-[#301B3F]/30" data-testid="mobile-menu">
//             <nav className="flex flex-col space-y-2">
//               {navLinks.map((link) => (
//                 <Link
//                   key={link.path}
//                   to={link.path}
//                   onClick={() => setMobileMenuOpen(false)}
//                   className="px-4 py-2 text-gray-300 hover:text-white hover:bg-[#301B3F]/30 rounded-lg"
//                 >
//                   {link.label}
//                 </Link>
//               ))}
//               <Button
//                 onClick={() => {
//                   navigate('/instant-quote');
//                   setMobileMenuOpen(false);
//                 }}
//                 className="bg-gradient-to-r from-[#720455] to-[#910A67] text-white rounded-full"
//               >
//                 Get Instant Quote
//               </Button>
//               {isAuthenticated ? (
//                 <>
//                   <Link
//                     to="/teamspace"
//                     onClick={() => setMobileMenuOpen(false)}
//                     className="px-4 py-2 text-gray-300 hover:text-white hover:bg-[#301B3F]/30 rounded-lg"
//                   >
//                     Teamspace
//                   </Link>
//                   <button
//                     onClick={() => {
//                       handleLogout();
//                       setMobileMenuOpen(false);
//                     }}
//                     className="px-4 py-2 text-left text-gray-300 hover:text-white hover:bg-[#301B3F]/30 rounded-lg"
//                   >
//                     Logout
//                   </button>
//                 </>
//               ) : (
//                 <Button
//                   onClick={() => {
//                     navigate('/login');
//                     setMobileMenuOpen(false);
//                   }}
//                   variant="outline"
//                   className="border-[#720455] text-white"
//                 >
//                   Login
//                 </Button>
//               )}
//             </nav>
//           </div>
//         )}
//       </div>
//     </header>
//   );
// };

// export default Header;




import React, { useEffect, useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import { Button } from '@/components/ui/button';
import { Bell, User, LogOut, Menu, X } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

const Header = () => {
  const { user, logout, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isHeroVisible, setIsHeroVisible] = useState(() => {
    if (typeof window === 'undefined') return false;
    return window.location.pathname === '/';
  });

  useEffect(() => {
    const heroSection = document.getElementById('hero-section');

    if (!heroSection) {
      if (location.pathname !== '/') {
        setIsHeroVisible(false);
      }
      return undefined;
    }

    const determineVisibility = () => {
      const rect = heroSection.getBoundingClientRect();
      const viewportHeight = window.innerHeight || document.documentElement.clientHeight;
      const threshold = viewportHeight * 0.25;
      const isVisible =
        rect.top <= threshold && rect.bottom >= threshold && rect.top < viewportHeight;
      setIsHeroVisible(isVisible);
    };

    // Initial sync (handles first render / client-side navigation)
    requestAnimationFrame(determineVisibility);

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsHeroVisible(entry.isIntersecting && entry.intersectionRatio >= 0.15);
      },
      { threshold: [0.15, 0.35, 0.6] }
    );

    observer.observe(heroSection);
    window.addEventListener('scroll', determineVisibility, { passive: true });
    window.addEventListener('resize', determineVisibility);

    return () => {
      observer.disconnect();
      window.removeEventListener('scroll', determineVisibility);
      window.removeEventListener('resize', determineVisibility);
    };
  }, [location.pathname]);

  const headerStateClasses = isHeroVisible
    ? 'bg-gradient-to-r from-black/70 via-black/40 to-black/70 border-transparent backdrop-blur-sm '
    : 'bg-[#151515]/50 border-[#301B3F]/30 backdrop-blur-md';

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const navLinks = [
    // { label: 'Home', path: '/' },
    { label: 'Capabilities', path: '/capabilities' },
    { label: 'Quality', path: '/quality' },
    { label: 'Blog', path: '/blog' },
    { label: 'Industries', path: '/industries' },
    { label: 'Contact Us', path: '/contact' },
  ];

  return (
    <header
      className={`sticky top-0 z-50 border-b transition-[background-color,backdrop-filter,border-color] duration-300 ${headerStateClasses}`}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-3" data-testid="header-logo">
            <div className="w-10 h-10 bg-gradient-to-br from-[#720455] to-[#910A67] rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-xl">D</span>
            </div>
            <span className="text-xl font-semibold text-white">DexAura</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-1">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className="px-4 py-2 text-gray-300 hover:text-white hover:bg-[#301B3F]/30 rounded-lg transition-all duration-200"
                data-testid={`nav-link-${link.label.toLowerCase()}`}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Desktop Actions */}
          <div className="hidden md:flex items-center space-x-4">
            <Button
              onClick={() => navigate('/instant-quote')}
              className="bg-gradient-to-r from-[#720455] to-[#910A67] hover:from-[#910A67] hover:to-[#720455] text-white px-6 py-2.5 rounded-full font-medium shadow-lg shadow-[#720455]/30"
              data-testid="get-instant-quote-btn"
            >
              Get Instant Quote
            </Button>

            {isAuthenticated ? (
              <>
                <Button variant="ghost" size="icon" data-testid="notifications-btn">
                  <Bell className="w-5 h-5 text-gray-300" />
                </Button>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon" data-testid="user-menu-trigger">
                      <User className="w-5 h-5 text-gray-300" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="w-48 bg-[#1a1a1a] border-[#301B3F]">
                    <DropdownMenuItem onClick={() => navigate('/teamspace')} data-testid="teamspace-link">
                      Teamspace
                    </DropdownMenuItem>
                    {user?.role === 'ADMIN' && (
                      <DropdownMenuItem onClick={() => navigate('/admin')} data-testid="admin-link">
                        Admin Dashboard
                      </DropdownMenuItem>
                    )}
                    <DropdownMenuItem onClick={handleLogout} data-testid="logout-btn">
                      <LogOut className="w-4 h-4 mr-2" /> Logout
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </>
            ) : (
              <Button
                onClick={() => navigate('/login')}
                variant="outline"
                className="border-[#720455] text-white hover:bg-[#720455]/10"
                data-testid="login-btn"
              >
                Login
              </Button>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden text-white p-2"
            data-testid="mobile-menu-toggle"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden py-4 border-t border-[#301B3F]/30" data-testid="mobile-menu">
            <nav className="flex flex-col space-y-2">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  onClick={() => setMobileMenuOpen(false)}
                  className="px-4 py-2 text-gray-300 hover:text-white hover:bg-[#301B3F]/30 rounded-lg"
                >
                  {link.label}
                </Link>
              ))}
              <Button
                onClick={() => {
                  navigate('/instant-quote');
                  setMobileMenuOpen(false);
                }}
                className="bg-gradient-to-r from-[#720455] to-[#910A67] text-white rounded-full"
              >
                Get Instant Quote
              </Button>
              {isAuthenticated ? (
                <>
                  <Link
                    to="/teamspace"
                    onClick={() => setMobileMenuOpen(false)}
                    className="px-4 py-2 text-gray-300 hover:text-white hover:bg-[#301B3F]/30 rounded-lg"
                  >
                    Teamspace
                  </Link>
                  <button
                    onClick={() => {
                      handleLogout();
                      setMobileMenuOpen(false);
                    }}
                    className="px-4 py-2 text-left text-gray-300 hover:text-white hover:bg-[#301B3F]/30 rounded-lg"
                  >
                    Logout
                  </button>
                </>
              ) : (
                <Button
                  onClick={() => {
                    navigate('/login');
                    setMobileMenuOpen(false);
                  }}
                  variant="outline"
                  className="border-[#720455] text-white"
                >
                  Login
                </Button>
              )}
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
