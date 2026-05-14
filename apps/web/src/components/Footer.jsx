
import React from 'react';
import { Link } from 'react-router-dom';
import { Mail, Phone, MapPin } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext.jsx';

const Footer = () => {
  const { t } = useLanguage();

  return (
    <footer className="bg-secondary text-secondary-foreground border-t border-border">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <span className="text-2xl font-bold text-primary" style={{ fontFamily: 'Playfair Display, serif' }}>
              Nawaya Pro
            </span>
            <p className="mt-4 text-sm text-secondary-foreground/80">
              {t('footer_desc')}
            </p>
          </div>
          
          <div>
            <span className="text-lg font-semibold text-secondary-foreground" style={{ fontFamily: 'Playfair Display, serif' }}>
              {t('footer_quick_links')}
            </span>
            <ul className="mt-4 space-y-2">
              <li>
                <Link to="/" className="text-sm text-secondary-foreground/80 hover:text-primary transition-all duration-200">
                  {t('nav_home')}
                </Link>
              </li>
              <li>
                <Link to="/screen-protectors" className="text-sm text-secondary-foreground/80 hover:text-primary transition-all duration-200">
                  {t('nav_screen_protectors')}
                </Link>
              </li>
              <li>
                <Link to="/camera-lenses" className="text-sm text-secondary-foreground/80 hover:text-primary transition-all duration-200">
                  {t('nav_camera_lenses')}
                </Link>
              </li>
              <li>
                <Link to="/cases" className="text-sm text-secondary-foreground/80 hover:text-primary transition-all duration-200">
                  {t('nav_cases')}
                </Link>
              </li>
              <li>
                <Link to="/chargers-cables" className="text-sm text-secondary-foreground/80 hover:text-primary transition-all duration-200">
                  {t('nav_chargers')}
                </Link>
              </li>
            </ul>
          </div>
          
          <div>
            <span className="text-lg font-semibold text-secondary-foreground" style={{ fontFamily: 'Playfair Display, serif' }}>
              {t('footer_contact')}
            </span>
            <ul className="mt-4 space-y-3">
              <li className="flex items-center space-x-2 text-sm text-secondary-foreground/80">
                <Mail className="h-4 w-4 text-primary" />
                <span>support@nawayapro.com</span>
              </li>
              <li className="flex items-center space-x-2 text-sm text-secondary-foreground/80">
                <Phone className="h-4 w-4 text-primary" />
                <span>+1 (555) 123-4567</span>
              </li>
              <li className="flex items-center space-x-2 text-sm text-secondary-foreground/80">
                <MapPin className="h-4 w-4 text-primary" />
                <span>Dubai, UAE</span>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="mt-8 pt-8 border-t border-border flex flex-col md:flex-row justify-between items-center">
          <p className="text-sm text-secondary-foreground/60">
            {t('footer_rights')}
          </p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <Link to="/privacy" className="text-sm text-secondary-foreground/60 hover:text-primary transition-all duration-200">
              {t('footer_privacy')}
            </Link>
            <Link to="/terms" className="text-sm text-secondary-foreground/60 hover:text-primary transition-all duration-200">
              {t('footer_terms')}
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
