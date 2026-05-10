import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import CartDrawer from './components/CartDrawer';
import Home from './pages/Home';
import Shop from './pages/Shop';
import ProductDetail from './pages/ProductDetail';
import Checkout from './pages/Checkout';
import ThankYou from './pages/ThankYou';

// Page transition wrapper
const PageTransition = ({ children }) => (
  <motion.div
    initial={{ opacity: 0, y: 12 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, y: -12 }}
    transition={{ duration: 0.4, ease: 'easeInOut' }}
  >
    {children}
  </motion.div>
);

// Routes rendered inside AnimatePresence (must be inside Router)
function AppRoutes() {
  const location = useLocation();

  // Pages that don't show Footer
  const noFooter = ['/checkout', '/thank-you'];
  const showFooter = !noFooter.includes(location.pathname);

  return (
    <>
      <Navbar />
      <CartDrawer />

      <AnimatePresence mode="wait">
        <Routes location={location} key={location.pathname}>
          <Route path="/" element={<PageTransition><Home /></PageTransition>} />
          <Route path="/shop" element={<PageTransition><Shop /></PageTransition>} />
          <Route path="/product/:id" element={<PageTransition><ProductDetail /></PageTransition>} />
          <Route path="/checkout" element={<PageTransition><Checkout /></PageTransition>} />
          <Route path="/thank-you" element={<PageTransition><ThankYou /></PageTransition>} />

          {/* 404 */}
          <Route
            path="*"
            element={
              <PageTransition>
                <div className="min-h-screen flex flex-col items-center justify-center text-center pt-20 px-6">
                  <p className="text-[10px] tracking-[0.4em] uppercase text-[#B8973A] mb-4">404</p>
                  <h1 className="font-serif text-5xl text-[#1A1A1A] mb-4">Page Not Found</h1>
                  <a href="/" className="btn-luxury mt-8 inline-block"><span>Go Home</span></a>
                </div>
              </PageTransition>
            }
          />
        </Routes>
      </AnimatePresence>

      {showFooter && <Footer />}
    </>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <AppRoutes />
    </BrowserRouter>
  );
}
