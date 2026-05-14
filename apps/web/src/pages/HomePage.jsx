
import React from 'react';
import { Helmet } from 'react-helmet';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Shield, Camera, Smartphone, Package, Award, Truck, Headphones, ArrowRight, Zap, Battery } from 'lucide-react';
import Header from '@/components/Header.jsx';
import Footer from '@/components/Footer.jsx';
import ProductsList from '@/components/ProductsList.jsx';
import ImageCarousel from '@/components/ImageCarousel.jsx';
import { useLanguage } from '@/context/LanguageContext.jsx';

const HomePage = ({ setIsCartOpen }) => {
  const { t, language } = useLanguage();
  const isRtl = language === 'ar';

  const categories = [
    {
      icon: Shield,
      title: t('cat_screen_title'),
      description: t('cat_screen_desc'),
      link: '/products'
    },
    {
      icon: Camera,
      title: t('cat_camera_title'),
      description: t('cat_camera_desc'),
      link: '/products'
    },
    {
      icon: Smartphone,
      title: t('cat_cases_title'),
      description: t('cat_cases_desc'),
      link: '/products'
    },
    {
      icon: Zap,
      title: t('cat_phone_chargers_title'),
      description: t('cat_phone_chargers_desc'),
      link: '/products'
    },
    {
      icon: Truck,
      title: t('cat_car_chargers_title'),
      description: t('cat_car_chargers_desc'),
      link: '/products'
    },
    {
      icon: Headphones,
      title: t('cat_headphones_title'),
      description: t('cat_headphones_desc'),
      link: '/products'
    },
    {
      icon: Package,
      title: t('cat_wireless_earbuds_title'),
      description: t('cat_wireless_earbuds_desc'),
      link: '/products'
    },
    {
      icon: Battery,
      title: t('cat_power_bank_title'),
      description: t('cat_power_bank_desc'),
      link: '/products'
    },
    {
      icon: Award,
      title: t('cat_accessories_title'),
      description: t('cat_accessories_desc'),
      link: '/products'
    }
  ];
  
  const trustBadges = [
    {
      icon: Package,
      title: t('trust_original'),
      description: t('trust_original_desc')
    },
    {
      icon: Award,
      title: t('trust_quality'),
      description: t('trust_quality_desc')
    },
    {
      icon: Truck,
      title: t('trust_shipping'),
      description: t('trust_shipping_desc')
    },
    {
      icon: Headphones,
      title: t('trust_support'),
      description: t('trust_support_desc')
    }
  ];
  
  return (
    <>
      <Helmet>
        <title>{`Nawaya Pro / نوايا برو - ${t('hero_headline')}`}</title>
        <meta name="description" content={t('hero_subheadline')} />
      </Helmet>
      
      <Header setIsCartOpen={setIsCartOpen} />
      
      <main className="min-h-screen bg-background flex flex-col">
        <ImageCarousel />
        
        <section className="py-24 bg-background">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="text-center mb-16"
            >
              <h2 className={`text-3xl md:text-4xl font-bold text-foreground mb-4 ${isRtl ? 'font-brand-ar' : 'font-brand-en'}`}>
                {t('cat_explore')}
              </h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                {t('cat_explore_desc')}
              </p>
            </motion.div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {categories.map((category, index) => (
                <motion.div
                  key={category.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <Link to={category.link} className="group block h-full">
                    <div className="flex flex-col bg-card border border-border rounded-2xl p-8 h-full transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
                      <div className="rounded-xl bg-primary/10 w-16 h-16 flex items-center justify-center mb-6 group-hover:bg-primary/20 transition-all duration-300">
                        <category.icon className="h-8 w-8 text-primary" />
                      </div>
                      <h3 className={`text-2xl font-semibold text-card-foreground mb-3 ${isRtl ? 'font-brand-ar' : 'font-brand-en'}`}>
                        {category.title}
                      </h3>
                      <p className="text-muted-foreground leading-relaxed mb-6 flex-grow">
                        {category.description}
                      </p>
                      <div className="mt-auto">
                        <span className="text-primary font-medium inline-flex items-center group-hover:gap-2 transition-all duration-300">
                          {t('hero_cta')}
                          <ArrowRight className={`${isRtl ? 'mr-1 rotate-180 group-hover:-translate-x-1' : 'ml-1 group-hover:translate-x-1'} h-4 w-4 transition-transform duration-300`} />
                        </span>
                      </div>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
        
        <section className="py-24 bg-muted/50 border-y border-border">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="text-center mb-16"
            >
              <h2 className={`text-3xl md:text-4xl font-bold text-foreground mb-4 ${isRtl ? 'font-brand-ar' : 'font-brand-en'}`}>
                {t('top_sellers')}
              </h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                {t('top_sellers_desc')}
              </p>
            </motion.div>
            
            <ProductsList limit={6} />
          </div>
        </section>
        
        <section className="py-24 bg-background">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="text-center mb-16"
            >
              <h2 className={`text-3xl md:text-4xl font-bold text-foreground mb-4 ${isRtl ? 'font-brand-ar' : 'font-brand-en'}`}>
                {t('trust_title')}
              </h2>
            </motion.div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8">
              {trustBadges.map((badge, index) => (
                <motion.div
                  key={badge.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="text-center group"
                >
                  <div className="rounded-2xl bg-primary/5 w-20 h-20 flex items-center justify-center mx-auto mb-6 group-hover:bg-primary/10 transition-colors duration-300">
                    <badge.icon className="h-10 w-10 text-primary" />
                  </div>
                  <h3 className="text-xl font-semibold text-foreground mb-3">
                    {badge.title}
                  </h3>
                  <p className="text-base text-muted-foreground">
                    {badge.description}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </>
  );
};

export default HomePage;
