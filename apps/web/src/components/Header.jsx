
import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ShoppingCart, Search, Menu, X, LogOut, ChevronDown, Gift, Star } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useCart } from '@/hooks/useCart';
import { useLanguage } from '@/context/LanguageContext.jsx';
import { useUser } from '@/context/UserContext';
import { useRewards } from '@/context/RewardsContext';
import LanguageSwitcher from '@/components/LanguageSwitcher.jsx';
import { motion, AnimatePresence } from 'framer-motion';

const Header = ({ setIsCartOpen }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isCategoriesOpen, setIsCategoriesOpen] = useState(false);
  const [selectedBrand, setSelectedBrand] = useState('Lito');
  const { cartItems } = useCart();
  const { t, language } = useLanguage();
  const { user, logout } = useUser();
  const { rewards } = useRewards();
  const location = useLocation();
  
  const isRtl = language === 'ar';
  const cartItemCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);
  
  const navLinks = [
    { path: '/', label: t('nav_home') },
    { path: '/offers', label: t('nav_offers'), highlight: true },
    { path: '/news', label: t('nav_news') },
    { path: '/about', label: t('nav_about') },
    { path: '/contact', label: t('nav_contact') },
  ];

  const categories = [
    { path: '/screen-protectors', label: t('nav_screen_protectors'), icon: '🛡️' },
    { path: '/camera-lenses', label: t('nav_camera_lenses'), icon: '📷' },
    { path: '/cases', label: t('nav_cases'), icon: '📱' },
    { path: '/phone-chargers', label: t('nav_phone_chargers'), icon: '🔌' },
    { path: '/car-chargers', label: t('nav_car_chargers'), icon: '🚗' },
    { path: '/headphones', label: t('nav_headphones'), icon: '🎧' },
    { path: '/wireless-earbuds', label: t('nav_wireless_earbuds'), icon: '🎵' },
    { path: '/power-bank', label: t('nav_power_bank'), icon: '🔋' },
    { path: '/accessories', label: t('nav_accessories'), icon: '📦' },
  ];

  const brands = ['Lito'];
  
  const isActive = (path) => {
    if (path === '/' && location.pathname !== '/') return false;
    return location.pathname.startsWith(path) && (path !== '/' || location.pathname === '/');
  };

  const handleLogout = () => {
    logout();
    setIsMobileMenuOpen(false);
  };
  
  return (
    <header className="sticky top-0 z-40 w-full border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 sm:h-20 items-center justify-between gap-4">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-3 group outline-none focus-visible:ring-2 focus-visible:ring-ring rounded-lg py-1 flex-shrink-0">
            <img 
              src="https://horizons-cdn.hostinger.com/54c4fdd1-f5f9-4cdd-80c9-edd11956d0b3/071c31694227f0ab2e6e8e650712df86.jpg" 
              alt="Nawaya Pro Logo" 
              className="header-logo-image rounded-md object-contain transition-transform duration-200 group-hover:scale-105 h-10 w-10 sm:h-12 sm:w-12"
            />
            <div className={`hidden sm:flex items-baseline gap-2 text-primary group-hover:opacity-90 transition-opacity ${isRtl ? 'flex-row-reverse' : 'flex-row'}`}>
              <span className="text-xl sm:text-2xl font-bold font-brand-en tracking-tight">
                Nawaya Pro
              </span>
              <span className="text-lg sm:text-xl font-bold font-brand-ar opacity-80" dir="rtl">
                نوايا برو
              </span>
            </div>
          </Link>
          
          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-1 xl:space-x-2" dir={isRtl ? 'rtl' : 'ltr'}>
            {/* Home Link */}
            <Link
              to="/"
              className={`text-sm font-medium transition-all duration-200 relative whitespace-nowrap px-3 py-2 rounded-md ${
                isActive('/')
                  ? 'text-primary bg-primary/10'
                  : 'text-foreground hover:text-primary hover:bg-primary/5'
              }`}
            >
              {t('nav_home')}
            </Link>

            {/* Products Dropdown */}
            <div className="relative group">
              <button
                className="text-sm font-medium transition-all duration-200 px-3 py-2 rounded-md text-foreground hover:text-primary hover:bg-primary/5 flex items-center gap-1"
              >
                {t('nav_products')}
                <ChevronDown className="h-4 w-4 transition-transform group-hover:rotate-180" />
              </button>
              
              <div className="absolute hidden group-hover:block left-0 mt-0 w-48 bg-background border border-border rounded-lg shadow-lg overflow-hidden z-50">
                {categories.map((cat) => (
                  <Link
                    key={cat.path}
                    to={cat.path}
                    className="block px-4 py-3 text-sm hover:bg-primary/10 text-foreground hover:text-primary transition-colors flex items-center gap-2 border-b last:border-b-0"
                  >
                    <span>{cat.icon}</span>
                    {cat.label}
                  </Link>
                ))}
              </div>
            </div>

            {/* Brands Dropdown */}
            <div className="relative group">
              <button
                className="text-sm font-medium transition-all duration-200 px-3 py-2 rounded-md text-foreground hover:text-primary hover:bg-primary/5 flex items-center gap-1"
              >
                {t('nav_brands')}
                <ChevronDown className="h-4 w-4 transition-transform group-hover:rotate-180" />
              </button>
              
              <div className="absolute hidden group-hover:block left-0 mt-0 w-32 bg-background border border-border rounded-lg shadow-lg overflow-hidden z-50">
                {brands.map((brand) => (
                  <button
                    key={brand}
                    onClick={() => setSelectedBrand(brand)}
                    className={`block w-full text-left px-4 py-2 text-sm transition-colors border-b last:border-b-0 ${
                      selectedBrand === brand
                        ? 'bg-primary/10 text-primary font-semibold'
                        : 'text-foreground hover:bg-primary/5 hover:text-primary'
                    }`}
                  >
                    {brand}
                  </button>
                ))}
              </div>
            </div>

            {/* Rest of Navigation Links */}
            {navLinks.filter(link => link.path !== '/').map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`text-sm font-medium transition-all duration-200 relative whitespace-nowrap px-3 py-2 rounded-md ${
                  isActive(link.path)
                    ? link.highlight ? 'text-white bg-gradient-to-r from-red-500 to-orange-500' : 'text-primary bg-primary/10'
                    : link.highlight ? 'text-orange-500 hover:text-orange-600 hover:bg-orange-500/10' : 'text-foreground hover:text-primary hover:bg-primary/5'
                }`}
              >
                {link.highlight && !isActive(link.path) && '🎁 '}
                {link.label}
              </Link>
            ))}
          </nav>
          
          {/* Right Side - Cart, Auth */}
          <div className="flex items-center space-x-2 md:space-x-3 ml-auto" dir={isRtl ? 'rtl' : 'ltr'}>
            <LanguageSwitcher />
            
            <Button variant="ghost" size="icon" className="hidden md:flex text-foreground hover:text-primary transition-all duration-200">
              <Search className="h-5 w-5" />
            </Button>

            {/* Rewards Button */}
            {user && (
              <Link to="/rewards">
                <Button
                  variant="ghost"
                  size="sm"
                  className="hidden sm:flex gap-1 text-foreground hover:text-yellow-500 transition-all duration-200"
                >
                  <Star className="h-4 w-4" />
                  <span className="text-xs font-bold text-yellow-500">{rewards.currentPoints}</span>
                </Button>
              </Link>
            )}
            
            {/* Cart Button */}
            <Button
              variant="ghost"
              size="icon"
              className="relative text-foreground hover:text-primary transition-all duration-200"
              onClick={() => setIsCartOpen(true)}
            >
              <ShoppingCart className="h-5 w-5" />
              {cartItemCount > 0 && (
                <span className="absolute -top-1 -right-1 h-5 w-5 rounded-full bg-primary text-primary-foreground text-xs font-semibold flex items-center justify-center shadow-sm">
                  {cartItemCount}
                </span>
              )}
            </Button>

            {/* Auth Buttons / User Menu */}
            {user ? (
              <div className="flex items-center gap-2">
                <span className="text-sm font-medium text-foreground hidden sm:inline">
                  {user.username}
                </span>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={handleLogout}
                  className="text-foreground hover:text-primary transition-all"
                >
                  <LogOut className="h-4 w-4" />
                </Button>
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <Link to="/login">
                  <Button variant="ghost" size="sm" className="text-foreground hover:text-primary">
                    {t('login')}
                  </Button>
                </Link>
                <Link to="/register">
                  <Button size="sm" className="hidden sm:inline-flex">
                    {t('sign_up')}
                  </Button>
                </Link>
              </div>
            )}
            
            {/* Mobile Menu Button */}
            <Button
              variant="ghost"
              size="icon"
              className="lg:hidden text-foreground"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </Button>
          </div>
        </div>
      </div>
      
      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden border-t border-border bg-background shadow-lg"
          >
            <nav className="container mx-auto px-4 py-4 flex flex-col space-y-2" dir={isRtl ? 'rtl' : 'ltr'}>
              <Link
                to="/"
                className={`text-sm font-medium transition-all duration-200 py-2 px-3 rounded-md ${
                  isActive('/')
                    ? 'text-primary bg-primary/10'
                    : 'text-foreground hover:text-primary hover:bg-primary/5'
                }`}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {t('nav_home')}
              </Link>

              {navLinks.filter(link => link.path !== '/').map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`text-sm font-medium transition-all duration-200 py-2 px-3 rounded-md ${
                    isActive(link.path)
                      ? link.highlight ? 'text-white bg-gradient-to-r from-red-500 to-orange-500' : 'text-primary bg-primary/10'
                      : link.highlight ? 'text-orange-500 hover:text-orange-600 hover:bg-orange-500/10' : 'text-foreground hover:text-primary hover:bg-primary/5'
                  }`}
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {link.highlight && !isActive(link.path) && '🎁 '}
                  {link.label}
                </Link>
              ))}

              {/* Categories in Mobile */}
              <div className="py-2 border-t border-border">
                <button
                  onClick={() => setIsCategoriesOpen(!isCategoriesOpen)}
                  className="w-full text-left text-sm font-medium py-2 px-3 rounded-md text-foreground hover:text-primary hover:bg-primary/5 flex items-center justify-between"
                >
                  {t('nav_products')}
                  <ChevronDown className={`h-4 w-4 transition-transform ${isCategoriesOpen ? 'rotate-180' : ''}`} />
                </button>
                
                <AnimatePresence>
                  {isCategoriesOpen && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      className="space-y-1 mt-2"
                    >
                      {categories.map((cat) => (
                        <Link
                          key={cat.path}
                          to={cat.path}
                          className="block px-6 py-2 text-sm text-foreground hover:text-primary hover:bg-primary/5 transition-colors rounded-md"
                          onClick={() => {
                            setIsMobileMenuOpen(false);
                            setIsCategoriesOpen(false);
                          }}
                        >
                          <span className="mr-2">{cat.icon}</span>
                          {cat.label}
                        </Link>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Brand Selector in Mobile */}
              <div className="py-2 border-t border-border space-y-2">
                <div className="text-sm font-medium text-foreground px-3">
                  {isRtl ? 'اختر البراند' : 'Select Brand'}
                </div>
                <div className="grid grid-cols-2 gap-2">
                  {brands.map((brand) => (
                    <button
                      key={brand}
                      onClick={() => {
                        setSelectedBrand(brand);
                        setIsMobileMenuOpen(false);
                      }}
                      className={`px-3 py-2 text-sm rounded-md transition-colors border ${
                        selectedBrand === brand
                          ? 'bg-primary text-primary-foreground border-primary'
                          : 'border-border text-foreground hover:border-primary hover:text-primary'
                      }`}
                    >
                      {brand}
                    </button>
                  ))}
                </div>
              </div>

              {/* Auth in Mobile */}
              <div className="py-2 border-t border-border space-y-2">
                {user && (
                  <Link
                    to="/rewards"
                    className="block"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    <Button variant="ghost" className="w-full justify-start gap-2">
                      <Star className="h-4 w-4 text-yellow-500" />
                      {t('rewards_points')}: <span className="font-bold text-yellow-500">{rewards.currentPoints}</span>
                    </Button>
                  </Link>
                )}
                {user ? (
                  <>
                    <div className="px-3 py-2 text-sm font-medium text-foreground">
                      {t('welcome')}, {user.username}
                    </div>
                    <button
                      onClick={handleLogout}
                      className="w-full px-3 py-2 text-sm font-medium text-foreground hover:text-primary hover:bg-primary/5 rounded-md transition-colors flex items-center gap-2"
                    >
                      <LogOut className="h-4 w-4" />
                      {t('logout')}
                    </button>
                  </>
                ) : (
                  <>
                    <Link
                      to="/login"
                      className="block"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      <Button variant="outline" className="w-full">
                        {t('login')}
                      </Button>
                    </Link>
                    <Link
                      to="/register"
                      className="block"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      <Button className="w-full">
                        {t('sign_up')}
                      </Button>
                    </Link>
                  </>
                )}
              </div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Header;
