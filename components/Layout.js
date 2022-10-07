import Footer from '../components/Footer';
import Header from '../components/Header';
import LightSwitch from '../components/LightSwitch';

function Layout({ children }) {
  return (
    <>
      <Header />
      <LightSwitch />
      {children}
      <Footer />
    </>
  );
}

export default Layout;
