import { BrowserRouter, Routes, Route, Link, Outlet, useLocation } from 'react-router-dom';
import logo from './assets/logo.png';
import { Home as HomeIcon, Search, ShoppingBag, User, ShoppingCart } from 'lucide-react';
import clsx from 'clsx';
import Home from './pages/Home';
import Explore from './pages/Explore';
import Orders from './pages/Orders';
import Profile from './pages/Profile';
import Login from './pages/Login';
import Register from './pages/Register';
import Checkout from './pages/Checkout';
import ProfileEdit from './pages/ProfileEdit';
import ProductDetail from './pages/ProductDetail';
import Cart from './pages/Cart';
import NotFound from './pages/NotFound';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import { CartProvider } from './contexts/CartContext';

function NavbarLink({ to, icon: Icon, label }) {
  const location = useLocation();
  const isActive = location.pathname === to;

  return (
    <Link
      to={to}
      className={clsx(
        "flex flex-col items-center justify-center w-full py-2 transition-colors duration-200",
        isActive ? "text-orange-600" : "text-gray-400 hover:text-orange-400"
      )}
    >
      <Icon size={24} strokeWidth={isActive ? 2.5 : 2} />
      <span className="text-[10px] mt-1 font-medium">{label}</span>
    </Link>
  );
}

function Layout() {
  const { user } = useAuth();
  const location = useLocation();

  return (
    <div className="flex flex-col min-h-screen bg-gray-50 font-sans">
      {/* Desktop Navigation (Top) - Hidden on Mobile */}
      <nav className="hidden md:flex px-8 py-4 bg-white border-b shadow-sm sticky top-0 z-50 items-center justify-between">
        {/* Left: Logo */}
        <div className="w-1/4 flex justify-start">
          <Link to="/" className="flex items-center gap-2 text-2xl font-bold text-orange-600 hover:opacity-80 transition">
            <img src={logo} alt="Logo" className="w-10 h-10" />
            BoBeo
          </Link>
        </div>

        {/* Center: Navigation */}
        <div className="flex-1 flex justify-center gap-8">
          <Link to="/" className={`font-bold hover:text-orange-500 transition ${location.pathname === '/' ? 'text-orange-600' : 'text-gray-600'}`}>Trang chủ</Link>
          <Link to="/explore" className={`font-bold hover:text-orange-500 transition ${location.pathname === '/explore' ? 'text-orange-600' : 'text-gray-600'}`}>Đồ ăn</Link>
          <Link to="/orders" className={`font-bold hover:text-orange-500 transition ${location.pathname === '/orders' ? 'text-orange-600' : 'text-gray-600'}`}>Đơn hàng</Link>
        </div>

        {/* Right: User Info */}
        <div className="w-1/4 flex justify-end items-center gap-4">
          {user ? (
            <>
              <Link to="/cart" className="p-2 text-gray-600 hover:text-orange-600 hover:bg-orange-50 rounded-full transition relative">
                <ShoppingCart size={24} />
                {/* Optional: Add badge here if we have cart state */}
              </Link>

              <Link to="/profile" className="flex items-center gap-3 hover:bg-orange-50 px-3 py-2 rounded-xl transition">
                <div className="text-right hidden lg:block">
                  <p className="text-sm font-bold text-gray-800">{user.name}</p>
                  <p className="text-xs text-gray-500 truncate max-w-[150px]">{user.email}</p>
                </div>
                <img
                  src={user.avatar || "https://ui-avatars.com/api/?name=User&background=f97316&color=fff"}
                  alt="Profile"
                  className="w-10 h-10 rounded-full border-2 border-orange-100"
                />
              </Link>
            </>
          ) : (
            <div className="flex gap-4">
              <Link to="/login" className="px-4 py-2 font-bold text-orange-600 hover:underline">Đăng nhập</Link>
              <Link to="/register" className="px-4 py-2 bg-orange-600 text-white font-bold rounded-lg hover:bg-orange-700 transition">Đăng ký</Link>
            </div>
          )}
        </div>
      </nav>

      <main className="flex-1 pb-20 md:pb-0 mx-auto w-[90%] max-w-[1440px] bg-white overflow-hidden min-h-screen">
        <Outlet />
      </main>

      {/* Mobile Navigation (Bottom) - Visible only on Mobile */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-100 flex justify-between items-center shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.05)] z-50 safe-area-bottom">
        <NavbarLink to="/" icon={HomeIcon} label="Trang chủ" />
        <NavbarLink to="/explore" icon={Search} label="Đồ ăn" />
        <NavbarLink to="/orders" icon={ShoppingBag} label="Đơn hàng" />
        <NavbarLink to="/profile" icon={User} label="Tài khoản" />
      </nav>
    </div>
  );
}

function App() {
  return (
    <BrowserRouter>
      {/* AuthProvider is already wrapping App in main.jsx */}
      <CartProvider>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          <Route element={<Layout />}>
            <Route path="/" element={<Home />} />
            <Route path="/explore" element={<Explore />} />
            <Route path="/orders" element={<Orders />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/profile/edit" element={<ProfileEdit />} />
            <Route path="/checkout" element={<Checkout />} />
            <Route path="/product/:id" element={<ProductDetail />} />
          </Route>

          <Route path="*" element={<NotFound />} />
        </Routes>
      </CartProvider>
    </BrowserRouter>
  );
}

export default App;
