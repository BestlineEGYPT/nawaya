
import React, { useState } from 'react';
import { Route, Routes, BrowserRouter as Router } from 'react-router-dom';
import { CartProvider } from '@/hooks/useCart.jsx';
import { LanguageProvider } from '@/context/LanguageContext.jsx';
import { UserProvider } from '@/context/UserContext.jsx';
import { RewardsProvider } from '@/context/RewardsContext.jsx';
import ScrollToTop from '@/components/ScrollToTop.jsx';
import ShoppingCart from '@/components/ShoppingCart.jsx';
import HomePage from '@/pages/HomePage.jsx';
import ProductDetailPage from '@/pages/ProductDetailPage.jsx';
import SuccessPage from '@/pages/SuccessPage.jsx';
import ScreenProtectorsPage from '@/pages/ScreenProtectorsPage.jsx';
import CameraLensesPage from '@/pages/CameraLensesPage.jsx';
import CasesPage from '@/pages/CasesPage.jsx';
import ChargersCablesPage from '@/pages/ChargersCablesPage.jsx';
import PowerBankPage from '@/pages/PowerBankPage.jsx';
import LoginPage from '@/pages/LoginPage.jsx';
import RegisterPage from '@/pages/RegisterPage.jsx';
import OffersPage from '@/pages/OffersPage.jsx';
import RewardsPage from '@/pages/RewardsPage.jsx';
import BestSellingPage from '@/pages/BestSellingPage.jsx';

function App() {
    const [isCartOpen, setIsCartOpen] = useState(false);
    
    return (
        <LanguageProvider>
            <UserProvider>
                <RewardsProvider>
                    <CartProvider>
                    <Router>
                        <ScrollToTop />
                        <ShoppingCart isCartOpen={isCartOpen} setIsCartOpen={setIsCartOpen} />
                        <Routes>
                            <Route path="/" element={<HomePage setIsCartOpen={setIsCartOpen} />} />
                            <Route path="/product/:id" element={<ProductDetailPage setIsCartOpen={setIsCartOpen} />} />
                            <Route path="/success" element={<SuccessPage setIsCartOpen={setIsCartOpen} />} />
                            <Route path="/best-selling" element={<BestSellingPage setIsCartOpen={setIsCartOpen} />} />
                            <Route path="/screen-protectors" element={<ScreenProtectorsPage setIsCartOpen={setIsCartOpen} />} />
                            <Route path="/camera-lenses" element={<CameraLensesPage setIsCartOpen={setIsCartOpen} />} />
                            <Route path="/cases" element={<CasesPage setIsCartOpen={setIsCartOpen} />} />
                            <Route path="/chargers-cables" element={<ChargersCablesPage setIsCartOpen={setIsCartOpen} />} />
                            <Route path="/power-bank" element={<PowerBankPage setIsCartOpen={setIsCartOpen} />} />
                            <Route path="/offers" element={<OffersPage setIsCartOpen={setIsCartOpen} />} />
                            <Route path="/rewards" element={<RewardsPage setIsCartOpen={setIsCartOpen} />} />
                            <Route path="/login" element={<LoginPage setIsCartOpen={setIsCartOpen} />} />
                            <Route path="/register" element={<RegisterPage setIsCartOpen={setIsCartOpen} />} />
                        </Routes>
                    </Router>
                    </CartProvider>
                </RewardsProvider>
            </UserProvider>
        </LanguageProvider>
    );
}

export default App;
