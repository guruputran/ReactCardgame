/** @format */
import { BrowserRouter as Router, Route } from "react-router-dom";
import { Container } from "react-bootstrap";
import Faq from "./components/Faq";
import Footer from "./components/Footer";
import Header from "./components/Header";
import Homescreen from "./screens/Homescreen";
import "./App.css";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
toast.configure();

function App() {
  return (
    <Router>
      <Header />
      <Container>
        <Route path="/faq" component={Faq} />
        <Route path="/" component={Homescreen} exact />
      </Container>
      <Footer />
    </Router>
  );
}

export default App;
