import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import { motion } from 'framer-motion';
import { Battery } from 'lucide-react';
import Header from '@/components/Header.jsx';
import Footer from '@/components/Footer.jsx';
import ProductsList from '@/components/ProductsList.jsx';
import { getCategories } from '@/api/WordPressApi';
import { useLanguage } from '@/context/LanguageContext.jsx';

const PowerBankPage = ({ setIsCartOpen }) => {
  const [categoryId, setCategoryId] = useState(null);
  const { t } = useLanguage();
  
  useEffect(() => {
    const fetchCategory = async () => {
      try {
        const { categories } = await getCategories();
        const powerBankCategory = categories.find(cat => 
          cat.title.toLowerCase().includes('power') || cat.title.toLowerCase().includes('bank')
        );
        if (powerBankCategory) {
          setCategoryId(powerBankCategory.id);
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
        <title>{`${t('nav_power_bank')} - Nawaya Pro`}</title>
        <meta name="description" content={t('page_power_bank_desc')} />
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
                <Battery className="h-8 w-8 text-primary" />
                <h1 className="text-4xl md:text-5xl font-bold" style={{ fontFamily: 'Playfair Display, serif' }}>
                  {t('nav_power_bank')}
                </h1>
              </div>
              <p className="text-lg text-secondary-foreground/80 leading-relaxed">
                {t('page_power_bank_desc')}
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

export default PowerBankPage;
