
import React from 'react';
import { Helmet } from 'react-helmet';
import { Link } from 'react-router-dom';
import { CheckCircle, Package, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';
import Header from '@/components/Header.jsx';
import Footer from '@/components/Footer.jsx';
import { useLanguage } from '@/context/LanguageContext.jsx';

const SuccessPage = ({ setIsCartOpen }) => {
  const { t, language } = useLanguage();
  const isRtl = language === 'ar';
  
  const orderNumber = `NP${Math.floor(Math.random() * 1000000).toString().padStart(6, '0')}`;
  const estimatedDelivery = new Date(Date.now() + 5 * 24 * 60 * 60 * 1000).toLocaleDateString(language === 'ar' ? 'ar-EG' : language === 'zh' ? 'zh-CN' : 'en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
  
  return (
    <>
      <Helmet>
        <title>{`${t('order_confirmed')} - Nawaya Pro`}</title>
        <meta name="description" content={t('order_confirmed_desc')} />
      </Helmet>
      
      <Header setIsCartOpen={setIsCartOpen} />
      
      <div className="min-h-screen bg-background">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="max-w-2xl mx-auto text-center"
          >
            <div className="mb-8 flex justify-center">
              <div className="rounded-full bg-primary/10 p-6">
                <CheckCircle className="h-16 w-16 text-primary" />
              </div>
            </div>
            
            <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4" style={{ fontFamily: 'Playfair Display, serif' }}>
              {t('order_confirmed')}
            </h1>
            
            <p className="text-lg text-muted-foreground mb-8 mx-auto">
              {t('order_confirmed_desc')}
            </p>
            
            <div className="bg-card border border-border rounded-2xl p-8 mb-8 text-start">
              <div className="flex items-center justify-between mb-6 pb-6 border-b border-border">
                <div>
                  <p className="text-sm text-muted-foreground mb-1">{t('order_number')}</p>
                  <p className="text-xl font-semibold text-card-foreground">{orderNumber}</p>
                </div>
                <Package className="h-8 w-8 text-primary" />
              </div>
              
              <div>
                <p className="text-sm text-muted-foreground mb-1">{t('estimated_delivery')}</p>
                <p className="text-lg font-medium text-card-foreground">{estimatedDelivery}</p>
              </div>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground transition-all duration-200">
                <Link to="/">
                  {t('continue_shopping')}
                  <ArrowRight className={`${isRtl ? 'mr-2 rotate-180' : 'ml-2'} h-4 w-4`} />
                </Link>
              </Button>
            </div>
            
            <p className="text-sm text-muted-foreground mt-8">
              {t('confirmation_email')}
            </p>
          </motion.div>
        </div>
      </div>
      
      <Footer />
    </>
  );
};

export default SuccessPage;
