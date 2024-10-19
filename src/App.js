import './App.css';
import 'react-toastify/dist/ReactToastify.css'; // Import the toast styles
import { ToastContainer } from 'react-toastify';
import About from './components/About/About';
import Contact from './components/Contact/Contact';
import Contributor from './components/Contributor/Contributor';
import GetInvolved from './components/GetInvolved/GetInvolved';
import Give from './components/Give/Give';
import HomePage from './components/HomePage/HomePage';
import NavBar from './components/Navbar/Navbar';
import Update from './components/Update/Update';
import '@fortawesome/fontawesome-svg-core/styles.css';
import Allocation from './components/Allocation/Allocation';
import FAQs from './components/FAQs/FAQs';
import Footer from './components/Footer/Footer';
import Transparency from './components/Transparency/Transparency';
import Acknowledge from './components/Acknowledge/Acknowledge';
import PrivacyPolicy from './components/PrivacyPolicy/PrivacyPolicy';

function App() {
  return (
    <>
      <div className="App">
        <ToastContainer
          position="top-right"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="light"
          limit={3}
        />
        <NavBar />
        <HomePage />
        <About />
        <Allocation />
        <Transparency />
        <Give />
        <Acknowledge />
        <GetInvolved />
        <Contributor />
        <Update />
        <FAQs />
        <Contact />
      </div>
      <PrivacyPolicy />
      <Footer />
    </>
  );
}

export default App;
