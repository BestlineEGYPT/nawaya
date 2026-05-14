import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { ShoppingCart, Zap, Clock, Gift, TrendingUp } from 'lucide-react';
import { useCart } from '@/hooks/useCart';
import { useLanguage } from '@/context/LanguageContext.jsx';
import { useToast } from '@/hooks/use-toast';
import Header from '@/components/Header.jsx';
import Footer from '@/components/Footer.jsx';

const OffersPage = ({ setIsCartOpen }) => {
  const { addToCart } = useCart();
  const { t, language } = useLanguage();
  const { toast } = useToast();
  const isRtl = language === 'ar';

  // Sample offers data
  const [offers, setOffers] = useState([
    {
      id: 1,
      title: isRtl ? 'عرض الشاشات - 30% خصم' : 'Screen Protectors - 30% OFF',
      description: isRtl ? 'احصل على أفضل حماية للشاشة بسعر مميز' : 'Get premium screen protection at an amazing price',
      discount: '30%',
      originalPrice: 999,
      salePrice: 699,
      image: 'https://horizons-cdn.hostinger.com/54c4fdd1-f5f9-4cdd-80c9-edd11956d0b3/071c31694227f0ab2e6e8e650712df86.jpg',
      category: 'screen',
      endDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
      badge: isRtl ? 'حار' : 'Hot',
    },
    {
      id: 2,
      title: isRtl ? 'عرض أغطية الهاتف - 25% خصم' : 'Phone Cases - 25% OFF',
      description: isRtl ? 'أغطية حماية أنيقة ومتينة بأسعار مخفضة' : 'Stylish and durable protective cases at discounted prices',
      discount: '25%',
      originalPrice: 599,
      salePrice: 449,
      image: 'https://horizons-cdn.hostinger.com/54c4fdd1-f5f9-4cdd-80c9-edd11956d0b3/071c31694227f0ab2e6e8e650712df86.jpg',
      category: 'cases',
      endDate: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000),
      badge: isRtl ? 'شعبي' : 'Popular',
    },
    {
      id: 3,
      title: isRtl ? 'عرض الكابلات - اشتري 2 واحصل على 1 مجاني' : 'Cables - Buy 2 Get 1 Free',
      description: isRtl ? 'كابلات عالية الجودة بعرض حصري' : 'Premium quality cables with exclusive offer',
      discount: 'BOGO',
      originalPrice: 399,
      salePrice: 266,
      image: 'https://horizons-cdn.hostinger.com/54c4fdd1-f5f9-4cdd-80c9-edd11956d0b3/071c31694227f0ab2e6e8e650712df86.jpg',
      category: 'chargers',
      endDate: new Date(Date.now() + 10 * 24 * 60 * 60 * 1000),
      badge: isRtl ? 'محدود' : 'Limited',
    },
    {
      id: 4,
      title: isRtl ? 'عرض عدسات الكاميرا - 40% خصم' : 'Camera Lenses - 40% OFF',
      description: isRtl ? 'احمِ عدسات الكاميرا الخاصة بك بأقل سعر' : 'Protect your camera lenses at the lowest price',
      discount: '40%',
      originalPrice: 1299,
      salePrice: 779,
      image: 'https://horizons-cdn.hostinger.com/54c4fdd1-f5f9-4cdd-80c9-edd11956d0b3/071c31694227f0ab2e6e8e650712df86.jpg',
      category: 'camera',
      endDate: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
      badge: isRtl ? 'انتهاء' : 'Ending',
    },
  ]);

  const calculateTimeLeft = (endDate) => {
    const now = new Date();
    const difference = endDate - now;

    if (difference <= 0) return isRtl ? 'انتهى' : 'Ended';

    const days = Math.floor(difference / (1000 * 60 * 60 * 24));
    const hours = Math.floor((difference / (1000 * 60 * 60)) % 24);

    if (days > 0) {
      return `${days}${isRtl ? ' يوم' : 'd'} ${hours}${isRtl ? ' ساعة' : 'h'}`;
    }
    return `${hours}${isRtl ? ' ساعة' : 'h'}`;
  };

  const getBadgeColor = (badge) => {
    if (badge.includes('Hot') || badge.includes('حار')) return 'bg-red-500';
    if (badge.includes('Popular') || badge.includes('شعبي')) return 'bg-blue-500';
    if (badge.includes('Limited') || badge.includes('محدود')) return 'bg-purple-500';
    if (badge.includes('Ending') || badge.includes('انتهاء')) return 'bg-orange-500';
    return 'bg-primary';
  };

  return (
    <>
      <Header setIsCartOpen={setIsCartOpen} />
      
      <main className="min-h-screen bg-gradient-to-b from-background to-background/50">
        {/* Hero Section */}
        <section className="pt-20 pb-12 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-red-500/10 via-orange-500/10 to-red-500/10">
          <div className="container mx-auto max-w-6xl text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <div className="flex items-center justify-center gap-3 mb-4">
                <Gift className="h-10 w-10 text-red-500" />
                <h1 className={`text-4xl sm:text-5xl font-bold ${isRtl ? 'text-right' : 'text-left'}`}>
                  {isRtl ? '🎉 عروض مميزة' : '🎉 Special Offers'}
                </h1>
                <Zap className="h-10 w-10 text-orange-500" />
              </div>
              <p className={`text-xl text-foreground/70 mb-8 max-w-2xl mx-auto ${isRtl ? 'text-right' : ''}`}>
                {isRtl 
                  ? 'استمتع بأفضل الأسعار على منتجاتنا الممتازة. عروض محدودة الوقت!'
                  : 'Enjoy the best prices on our premium products. Limited time offers!'}
              </p>
            </motion.div>
          </div>
        </section>

        {/* Offers Grid */}
        <section className="py-16 px-4 sm:px-6 lg:px-8">
          <div className="container mx-auto max-w-6xl">
            <div className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 ${isRtl ? 'direction-rtl' : ''}`}>
              {offers.map((offer, index) => (
                <motion.div
                  key={offer.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <Card className="overflow-hidden border border-border/50 hover:border-primary/50 transition-all duration-300 group flex flex-col h-full">
                    {/* Image Section */}
                    <div className="relative overflow-hidden bg-gradient-to-br from-primary/5 to-primary/10 h-48">
                      <img
                        src={offer.image}
                        alt={offer.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                      
                      {/* Badge */}
                      <div className={`absolute top-3 ${isRtl ? 'left-3' : 'right-3'} ${getBadgeColor(offer.badge)} text-white px-3 py-1 rounded-full text-xs font-semibold`}>
                        {offer.badge}
                      </div>

                      {/* Discount Badge */}
                      <div className="absolute top-3 right-3 sm:left-3 sm:right-auto bg-gradient-to-r from-red-500 to-orange-500 text-white px-3 py-1 rounded-lg font-bold text-sm">
                        -{offer.discount}
                      </div>
                    </div>

                    {/* Content Section */}
                    <div className="p-4 flex-1 flex flex-col">
                      <h3 className={`font-semibold text-lg mb-2 line-clamp-2 ${isRtl ? 'text-right' : ''}`}>
                        {offer.title}
                      </h3>
                      
                      <p className={`text-sm text-foreground/60 mb-3 line-clamp-2 ${isRtl ? 'text-right' : ''}`}>
                        {offer.description}
                      </p>

                      {/* Countdown Timer */}
                      <div className="flex items-center gap-2 mb-4 text-sm text-orange-500 font-semibold">
                        <Clock className="h-4 w-4" />
                        <span>{calculateTimeLeft(offer.endDate)}</span>
                      </div>

                      {/* Pricing */}
                      <div className="mb-4 flex items-center gap-3">
                        <span className="text-2xl font-bold text-primary">
                          {offer.salePrice.toLocaleString()}
                        </span>
                        <span className="text-sm text-foreground/50 line-through">
                          {offer.originalPrice.toLocaleString()}
                        </span>
                      </div>

                      {/* Button */}
                      <Button className="w-full mt-auto gap-2">
                        <ShoppingCart className="h-4 w-4" />
                        {isRtl ? 'اضف للسلة' : 'Add to Cart'}
                      </Button>
                    </div>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Promotional Section */}
        <section className="py-12 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-primary/10 via-purple-500/10 to-primary/10">
          <div className="container mx-auto max-w-4xl">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6 }}
              className="bg-gradient-to-r from-primary to-purple-600 rounded-2xl p-8 text-center text-white"
            >
              <TrendingUp className="h-12 w-12 mx-auto mb-4" />
              <h2 className="text-3xl font-bold mb-3">
                {isRtl ? '🎊 عرض خاص جداً' : '🎊 Mega Deal'}
              </h2>
              <p className="text-lg mb-6 opacity-90">
                {isRtl 
                  ? 'اشتري الآن واحصل على شحن مجاني لجميع الطلبات فوق 500 ريال'
                  : 'Shop now and get FREE shipping on all orders over 500 SAR'}
              </p>
              <Button size="lg" variant="secondary" className="gap-2">
                <Zap className="h-5 w-5" />
                {isRtl ? 'تسوق الآن' : 'Shop Now'}
              </Button>
            </motion.div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
};

export default OffersPage;
