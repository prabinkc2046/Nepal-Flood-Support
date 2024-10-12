import './App.css';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
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

const queryClient = new QueryClient();

function App() {
  return (
    <>
      <div className="App">
        <ToastContainer />
        <NavBar />
        <HomePage />
        <About />
        <Allocation />
        <Transparency />
        <Give />
        <GetInvolved />
        <QueryClientProvider client={queryClient}>
          <Contributor />
        </QueryClientProvider>
        <Update />
        <FAQs />
        <Contact />
      </div>
      <Footer />
    </>
  );
}

export default App;
