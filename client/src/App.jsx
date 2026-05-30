import { useState } from 'react';
import { CartProvider } from './context/CartContext';
import Navbar from './components/Navbar/Navbar';
import Hero from './components/Hero/Hero';
import Menu from './components/Menu/Menu';
import About from './components/About/About';
import Footer from './components/Footer/Footer';
import CartSidebar from './components/CartSidebar/CartSidebar';
import BackgroundCanvas from './components/BackgroundCanvas/BackgroundCanvas';
import './index.css';

function App() {
  const [cartOpen, setCartOpen] = useState(false);

  return (
    <CartProvider>
      {/* Fixed floating bokeh particle canvas — sits behind everything */}
      <BackgroundCanvas />

      {/* Animated warm gradient wash on page background */}
      <div className="page-gradient-bg" aria-hidden="true" />

      <Navbar onCartOpen={() => setCartOpen(true)} />
      <main>
        <Hero />
        <Menu />
        <About />
      </main>
      <Footer />
      <CartSidebar isOpen={cartOpen} onClose={() => setCartOpen(false)} />
    </CartProvider>
  );
}

export default App;
