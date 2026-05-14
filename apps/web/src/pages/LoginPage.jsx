import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import { useUser } from '@/context/UserContext';
import { useLanguage } from '@/context/LanguageContext';
import { ArrowRight } from 'lucide-react';

const LoginPage = ({ setIsCartOpen }) => {
  const navigate = useNavigate();
  const { login } = useUser();
  const { toast } = useToast();
  const { t, language } = useLanguage();
  const [formData, setFormData] = useState({ username: '', password: '' });
  const [isLoading, setIsLoading] = useState(false);

  const isRtl = language === 'ar';

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      if (!formData.username.trim() || !formData.password.trim()) {
        toast({
          title: t('error'),
          description: t('fill_all_fields'),
          variant: 'destructive',
        });
        setIsLoading(false);
        return;
      }

      // Here you would normally call your backend API
      // For now, we'll simulate a login
      const userData = {
        id: Math.random().toString(36).substr(2, 9),
        username: formData.username,
        email: `${formData.username}@nawayapro.com`,
        loginTime: new Date().toISOString(),
      };

      login(userData);
      
      toast({
        title: t('login_successful'),
        description: `${t('welcome')} ${formData.username}`,
      });

      navigate('/');
    } catch (error) {
      toast({
        title: t('error'),
        description: error.message,
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-background/50 flex items-center justify-center py-12 px-4">
      <div className="w-full max-w-md">
        <Link
          to="/"
          className={`flex items-center gap-2 mb-8 text-primary hover:text-primary/80 transition-colors ${
            isRtl ? 'flex-row-reverse' : 'flex-row'
          }`}
        >
          <ArrowRight className={`h-4 w-4 ${isRtl ? 'rotate-180' : ''}`} />
          <span>{t('back_to_home')}</span>
        </Link>

        <Card className="p-8 border border-border/50 backdrop-blur-sm">
          <div className="mb-8 text-center" dir={isRtl ? 'rtl' : 'ltr'}>
            <h1 className="text-3xl font-bold mb-2">
              {t('login')}
            </h1>
            <p className="text-foreground/60">
              {t('sign_in_to_continue')}
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2" dir={isRtl ? 'rtl' : 'ltr'}>
              <Label htmlFor="username">
                {t('username')}
              </Label>
              <Input
                id="username"
                name="username"
                type="text"
                value={formData.username}
                onChange={handleChange}
                placeholder={t('enter_username')}
                disabled={isLoading}
                className="h-11"
              />
            </div>

            <div className="space-y-2" dir={isRtl ? 'rtl' : 'ltr'}>
              <Label htmlFor="password">
                {t('password')}
              </Label>
              <Input
                id="password"
                name="password"
                type="password"
                value={formData.password}
                onChange={handleChange}
                placeholder={t('enter_password')}
                disabled={isLoading}
                className="h-11"
              />
            </div>

            <Button
              type="submit"
              disabled={isLoading}
              className="w-full h-11 text-base font-semibold"
            >
              {isLoading ? (
                <span>{t('logging_in')}</span>
              ) : (
                <span>{t('login')}</span>
              )}
            </Button>
          </form>

          <div className="mt-6 text-center text-sm text-foreground/60" dir={isRtl ? 'rtl' : 'ltr'}>
            {t('dont_have_account')}
            <Link
              to="/register"
              className="text-primary hover:text-primary/80 font-semibold transition-colors"
            >
              {t('create_one')}
            </Link>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default LoginPage;
