import AIModelCards from '../../components/layout/AIModelCards';
import Footer from '../../components/layout/Footer';
import MobileLayout from '../../components/layout/MobileLayout';
import BottomNav from '../../components/layout/BottomNav';
import Capabilities from '../../components/layout/Capabilities';
import MobileHeader from '../../components/layout/MobileHeader';
import Sidebar from '../../components/layout/Sidebar';
import Navbar from '../../components/layout/Navbar';
import Hero from '../../components/layout/Hero';
import './HomePage.scss';
import { useSelector } from 'react-redux';

const HomePage = () => {
  const { user } = useSelector((state) => state.auth);
  console.log(user);
  return (
    <div className="homepage-layout">
      {/* Desktop Sidebar */}
      <Sidebar />

      <div className="main-wrapper">
        {/* Headers */}
        <Navbar />
        <MobileHeader />

        <main className="content">
          {/* Shared Hero */}
          <Hero />

          {/* Desktop Only */}
          <div className="desktop-only">
            <AIModelCards />
          </div>

          {/* Mobile Only */}
          <MobileLayout>
            <Capabilities />
          </MobileLayout>
        </main>

        {/* Footer */}
        <Footer />
      </div>

      {/* Mobile Bottom Navigation */}
      <BottomNav />
    </div>
  );
};

export default HomePage;
