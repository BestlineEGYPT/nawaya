
import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import { motion } from 'framer-motion';
import { Shield } from 'lucide-react';
import Header from '@/components/Header.jsx';
import Footer from '@/components/Footer.jsx';
import ProductsList from '@/components/ProductsList.jsx';
import { getCategories } from '@/api/WordPressApi';
import { useLanguage } from '@/context/LanguageContext.jsx';

const ScreenProtectorsPage = ({ setIsCartOpen }) => {
  const [categoryId, setCategoryId] = useState(null);
  const { t } = useLanguage();
  
  useEffect(() => {
    const fetchCategory = async () => {
      try {
        const { categories } = await getCategories();
        const screenProtectorCategory = categories.find(cat => 
          cat.title.toLowerCase().includes('screen') || cat.title.toLowerCase().includes('protector')
        );
        if (screenProtectorCategory) {
          setCategoryId(screenProtectorCategory.id);
        }
      } catch (error) {
        console.error('Error fetching categories:', error);
      }
    };
    
    fetchCategory();
  }, []);
  
  return (
    <>
      <Helmet>
        <title>{`${t('nav_screen_protectors')} - Nawaya Pro`}</title>
        <meta name="description" content={t('page_screen_desc')} />
      </Helmet>
      
      <Header setIsCartOpen={setIsCartOpen} />
      
      <div className="min-h-screen bg-background">
        <div className="bg-secondary text-secondary-foreground py-16 border-b border-border">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="max-w-3xl"
            >
              <div className="flex items-center space-x-3 mb-4">
                <Shield className="h-8 w-8 text-primary" />
                <h1 className="text-4xl md:text-5xl font-bold" style={{ fontFamily: 'Playfair Display, serif' }}>
                  {t('nav_screen_protectors')}
                </h1>
              </div>
              <p className="text-lg text-secondary-foreground/80 leading-relaxed">
                {t('page_screen_desc')}
              </p>
            </motion.div>
          </div>
        </div>
        
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <ProductsList categoryId={categoryId} />
        </div>
      </div>
      
      <Footer />
    </>
  );
};

export default ScreenProtectorsPage;
