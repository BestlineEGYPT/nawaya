import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Gift, Star, Zap, TrendingUp, Clock, Award, ChevronRight } from 'lucide-react';
import { useRewards } from '@/context/RewardsContext';
import { useLanguage } from '@/context/LanguageContext.jsx';
import { useUser } from '@/context/UserContext';
import { useToast } from '@/hooks/use-toast';
import Header from '@/components/Header.jsx';
import Footer from '@/components/Footer.jsx';

const RewardsPage = ({ setIsCartOpen }) => {
  const { rewards, redeemPoints } = useRewards();
  const { user } = useUser();
  const { t, language } = useLanguage();
  const { toast } = useToast();
  const isRtl = language === 'ar';

  const rewardTiers = [
    {
      id: 1,
      name: isRtl ? '20% خصم' : '20% Discount',
      points: 500,
      discount: '20%',
      value: isRtl ? 'خصم' : 'discount',
      icon: Gift,
      color: 'from-blue-500 to-cyan-500',
    },
    {
      id: 2,
      name: isRtl ? '50 ريال قسيمة' : '50 SAR Voucher',
      points: 300,
      discount: '50',
      value: isRtl ? 'ريال' : 'SAR',
      icon: Award,
      color: 'from-purple-500 to-pink-500',
    },
    {
      id: 3,
      name: isRtl ? 'شحن مجاني مدى الحياة' : 'Lifetime Free Shipping',
      points: 1000,
      discount: '∞',
      value: isRtl ? 'شحن مجاني' : 'free shipping',
      icon: Zap,
      color: 'from-orange-500 to-red-500',
    },
    {
      id: 4,
      name: isRtl ? '30% خصم على الشراء القادم' : '30% Next Purchase',
      points: 750,
      discount: '30%',
      value: isRtl ? 'الشراء القادم' : 'next buy',
      icon: TrendingUp,
      color: 'from-green-500 to-emerald-500',
    },
  ];

  const handleRedeem = (reward) => {
    if (rewards.currentPoints < reward.points) {
      toast({
        title: t('not_enough_points'),
        description: isRtl 
          ? `تحتاج ${reward.points - rewards.currentPoints} نقطة إضافية`
          : `You need ${reward.points - rewards.currentPoints} more points`,
        variant: 'destructive',
      });
      return;
    }

    redeemPoints(reward.points, reward.name, reward.discount);
    toast({
      title: `✅ ${t('reward_redeemed')}`,
      description: `${t('you_got')}: ${reward.name}`,
    });
  };

  const progressPercentage = (rewards.currentPoints / 1000) * 100;

  return (
    <>
      <Header setIsCartOpen={setIsCartOpen} />
      
      <main className="min-h-screen bg-gradient-to-b from-background to-background/50">
        {/* Hero Section */}
        <section className="pt-20 pb-12 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-yellow-500/10 via-amber-500/10 to-yellow-500/10">
          <div className="container mx-auto max-w-6xl">
            {!user ? (
              <div className="text-center py-12 bg-primary/5 rounded-2xl border border-primary/20">
                <Award className="h-16 w-16 mx-auto mb-4 text-primary" />
                <h2 className="text-2xl font-bold mb-3">{t('welcome_to_rewards')}</h2>
                <p className="text-foreground/70 mb-6 max-w-2xl mx-auto">
                  {t('sign_in_to_see')}
                </p>
                <Link to="/login">
                  <Button size="lg" className="gap-2">
                    {t('login')}
                  </Button>
                </Link>
              </div>
            ) : (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
              >
                <div className="flex items-center justify-center gap-3 mb-8">
                  <Star className="h-10 w-10 text-yellow-500" />
                  <h1 className={`text-4xl sm:text-5xl font-bold ${isRtl ? 'text-right' : 'text-left'}`}>
                    ⭐ {t('rewards_program')}
                  </h1>
                  <Gift className="h-10 w-10 text-amber-500" />
                </div>

                {/* Points Card */}
                <Card className="p-8 bg-gradient-to-r from-yellow-500/20 via-amber-500/20 to-orange-500/20 border-yellow-500/30 mb-8">
                  <div className="text-center">
                    <p className="text-foreground/70 mb-2">{t('current_points')}</p>
                    <h2 className="text-6xl font-bold text-yellow-500 mb-4">{rewards.currentPoints}</h2>
                    <p className="text-foreground/60 mb-6">
                      {t('total_points_earned')}: {rewards.totalPoints}
                    </p>

                    {/* Progress Bar */}
                    <div className="bg-background/50 rounded-full h-4 overflow-hidden mb-3">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${Math.min(progressPercentage, 100)}%` }}
                        transition={{ duration: 1, delay: 0.3 }}
                        className="h-full bg-gradient-to-r from-yellow-500 to-orange-500"
                      />
                    </div>
                    <p className="text-sm text-foreground/60">
                      {isRtl 
                        ? `${Math.floor(progressPercentage)}% من النقاط المتبقية للمكافأة التالية`
                        : `${Math.floor(progressPercentage)}% towards next reward`}
                    </p>
                  </div>
                </Card>
              </motion.div>
            )}
          </div>
        </section>

        {user && (
          <>
            {/* Rewards Tiers */}
            <section className="py-16 px-4 sm:px-6 lg:px-8">
              <div className="container mx-auto max-w-6xl">
                <h2 className={`text-3xl font-bold mb-8 ${isRtl ? 'text-right' : ''}`}>
                  🎁 {t('available_rewards')}
                </h2>

                <div className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 ${isRtl ? 'direction-rtl' : ''}`}>
                  {rewardTiers.map((reward, index) => {
                    const Icon = reward.icon;
                    const isAffordable = rewards.currentPoints >= reward.points;

                    return (
                      <motion.div
                        key={reward.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: index * 0.1 }}
                      >
                        <Card className={`overflow-hidden border-2 transition-all duration-300 flex flex-col h-full ${
                          isAffordable
                            ? `border-primary/50 hover:border-primary shadow-lg`
                            : 'border-border/30 opacity-75'
                        }`}>
                          {/* Top Gradient */}
                          <div className={`h-2 bg-gradient-to-r ${reward.color}`} />

                          <div className="p-6 flex-1 flex flex-col">
                            {/* Icon */}
                            <div className={`inline-flex w-12 h-12 rounded-full items-center justify-center bg-gradient-to-r ${reward.color} text-white mb-4`}>
                              <Icon className="h-6 w-6" />
                            </div>

                            {/* Name */}
                            <h3 className={`text-xl font-bold mb-3 ${isRtl ? 'text-right' : ''}`}>
                              {reward.name}
                            </h3>

                            {/* Points Required */}
                            <div className="mb-4 p-3 bg-background/50 rounded-lg">
                              <p className={`text-sm text-foreground/70 mb-1 ${isRtl ? 'text-right' : ''}`}>
                                {t('points_required')}
                              </p>
                              <p className="text-2xl font-bold text-primary">{reward.points}</p>
                            </div>

                            {/* Discount Badge */}
                            <div className="mb-4 p-3 bg-yellow-500/10 rounded-lg border border-yellow-500/20">
                              <p className="text-sm font-semibold text-yellow-600 dark:text-yellow-400">
                                {isRtl ? 'الحصول على' : 'Get'}: {reward.discount} {reward.value}
                              </p>
                            </div>

                            {/* Status */}
                            {!isAffordable && (
                              <div className="mb-4 p-3 bg-orange-500/10 rounded-lg flex items-center gap-2">
                                <Clock className="h-4 w-4 text-orange-600" />
                                <p className="text-sm text-orange-600 dark:text-orange-400">
                                  {reward.points - rewards.currentPoints} {isRtl ? 'نقطة متبقية' : 'points away'}
                                </p>
                              </div>
                            )}

                            {/* Redeem Button */}
                            <Button
                              onClick={() => handleRedeem(reward)}
                              disabled={!isAffordable}
                              className={`w-full mt-auto gap-2 ${isAffordable ? '' : 'opacity-50 cursor-not-allowed'}`}
                            >
                              <Gift className="h-4 w-4" />
                              {t('redeem_now')}
                              <ChevronRight className="h-4 w-4" />
                            </Button>
                          </div>
                        </Card>
                      </motion.div>
                    );
                  })}
                </div>
              </div>
            </section>

            {/* How It Works */}
            <section className="py-16 px-4 sm:px-6 lg:px-8 bg-primary/5">
              <div className="container mx-auto max-w-4xl">
                <h2 className={`text-3xl font-bold mb-8 text-center ${isRtl ? 'text-right' : ''}`}>
                  ❓ {t('how_it_works')}
                </h2>

                <div className={`grid grid-cols-1 md:grid-cols-3 gap-6`}>
                  {[
                    {
                      step: '1',
                      title: t('start_shopping'),
                      description: t('buy_products'),
                    },
                    {
                      step: '2',
                      title: t('collect_points'),
                      description: t('points_ratio'),
                    },
                    {
                      step: '3',
                      title: t('redeem_rewards'),
                      description: t('use_points'),
                    },
                  ].map((item, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: index * 0.1 }}
                    >
                      <Card className="p-6 text-center h-full">
                        <div className="w-12 h-12 rounded-full bg-primary text-primary-foreground flex items-center justify-center mx-auto mb-4 text-lg font-bold">
                          {item.step}
                        </div>
                        <h3 className="text-xl font-bold mb-3">{item.title}</h3>
                        <p className="text-foreground/70">{item.description}</p>
                      </Card>
                    </motion.div>
                  ))}
                </div>
              </div>
            </section>

            {/* Points History */}
            {rewards.pointsHistory.length > 0 && (
              <section className="py-16 px-4 sm:px-6 lg:px-8">
                <div className="container mx-auto max-w-4xl">
                  <h2 className={`text-3xl font-bold mb-8 ${isRtl ? 'text-right' : ''}`}>
                    📜 {t('points_history')}
                  </h2>

                  <div className="space-y-3">
                    {rewards.pointsHistory.slice(0, 10).map((entry) => (
                      <motion.div
                        key={entry.id}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.3 }}
                      >
                        <Card className="p-4 flex items-center justify-between">
                          <div className={`flex-1 ${isRtl ? 'text-right' : ''}`}>
                            <p className="font-semibold">{entry.reason}</p>
                            <p className="text-sm text-foreground/60">{entry.description}</p>
                            <p className="text-xs text-foreground/40">
                              {new Date(entry.date).toLocaleDateString(isRtl ? 'ar-SA' : 'en-US')}
                            </p>
                          </div>
                          <div className={`text-2xl font-bold ${entry.type === 'earned' ? 'text-green-500' : 'text-red-500'}`}>
                            {entry.type === 'earned' ? '+' : '-'}{Math.abs(entry.points)}
                          </div>
                        </Card>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </section>
            )}
          </>
        )}
      </main>

      <Footer />
    </>
  );
};

export default RewardsPage;
