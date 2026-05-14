import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import { motion } from 'framer-motion';
import { TrendingUp } from 'lucide-react';
import Header from '@/components/Header.jsx';
import Footer from '@/components/Footer.jsx';
import ProductsList from '@/components/ProductsList.jsx';
import { useLanguage } from '@/context/LanguageContext.jsx';

const BestSellingPage = ({ setIsCartOpen }) => {
  const { t } = useLanguage();
  
  return (
    <>
      <Helmet>
        <title>{`${t('top_sellers')} - Nawaya Pro`}</title>
        <meta name="description" content={t('top_sellers_desc')} />
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
                <TrendingUp className="h-8 w-8 text-primary" />
                <h1 className="text-4xl md:text-5xl font-bold" style={{ fontFamily: 'Playfair Display, serif' }}>
                  {t('top_sellers')}
                </h1>
              </div>
              <p className="text-lg text-secondary-foreground/80 leading-relaxed">
                {t('top_sellers_desc')}
              </p>
            </motion.div>
          </div>
        </div>

        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <ProductsList 
            categoryId={null}
            limit={24}
            setIsCartOpen={setIsCartOpen}
          />
        </div>
      </div>

      <Footer />
    </>
  );
};

export default BestSellingPage;
