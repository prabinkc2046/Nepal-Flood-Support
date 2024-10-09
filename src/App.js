import './App.css';
import About from './components/About/About';
import Contact from './components/Contact/Contact';
import Contributor from './components/Contributor/Contributor';
import GetInvolved from './components/GetInvolved/GetInvolved';
import Give from './components/Give/Give';
import HomePage from './components/HomePage/HomePage';
import NavBar from './components/Navbar/Navbar';
import QNA from './components/FAQs/FAQs';
import Update from './components/Update/Update';
import '@fortawesome/fontawesome-svg-core/styles.css';
import Allocation from './components/Allocation/Allocation';
import FAQs from './components/FAQs/FAQs';
import Footer from './components/Footer/Footer';

function App() {
  return (
    <>
      <div className="App">
        <NavBar />
        <HomePage />
        <About />
        <Allocation />
        <Give />
        <GetInvolved />
        <Contributor />
        <Update />
        <FAQs />
        <Contact />
      </div>
      <Footer />
    </>
  );
}

export default App;
