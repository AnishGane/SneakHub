import { Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import Collection from './pages/Collection';
import About from './pages/About';
import Contact from './pages/Contact';
import Cart from './pages/Cart';
import SignUp from './pages/SignUp';
import PlaceOrder from './pages/PlaceOrder';
import Orders from './pages/Orders';
import Product from './pages/Product';
import Login from './pages/Login';
import { Toaster } from 'react-hot-toast';
import Navbar from './component/Navbar';
import { useLocation } from 'react-router-dom';
import Footer from './component/Footer';

function App() {
  const location = useLocation();

  return (
    <>
      <div className="px-4 sm:px-[4vw] md:px-[6vw] lg:px-[8vw]">
        {location.pathname !== '/login' && location.pathname !== '/signup' && <Navbar />}
        <Toaster
          position="bottom-right"
          reverseOrder={false}
          gutter={8}
          containerClassName=""
          containerStyle={{}}
          toastOptions={{
            duration: 4000,
            style: {
              background: '#363636',
              color: '#fff',
              borderRadius: '12px',
              padding: '16px',
              fontSize: '14px',
              fontWeight: '500',
              boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
              border: '1px solid rgba(255, 255, 255, 0.1)',
            },
            success: {
              duration: 3000,
              style: {
                background: 'linear-gradient(135deg, #10B981, #059669)',
                color: '#fff',
              },
              iconTheme: {
                primary: '#fff',
                secondary: '#10B981',
              },
            },
            error: {
              duration: 3000,
              style: {
                background: 'linear-gradient(135deg, #EF4444, #DC2626)',
                color: '#fff',
              },
              iconTheme: {
                primary: '#fff',
                secondary: '#EF4444',
              },
            },
          }}
        />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/collection" element={<Collection />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/product/:productId" element={<Product />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/place-order" element={<PlaceOrder />} />
          <Route path="/orders" element={<Orders />} />
          <Route
            path="*"
            element={
              <div className="my-4 flex min-h-[90dvh] w-full items-center justify-center bg-black text-white">
                404 Not Found
              </div>
            }
          />
        </Routes>
        {location.pathname !== '/login' && location.pathname !== '/signup' && <Footer />}
      </div>
    </>
  );
}

export default App;
