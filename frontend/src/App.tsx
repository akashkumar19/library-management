import { BrowserRouter } from "react-router-dom";
import "./App.scss";
import { AppRoutes } from "./AppRoutes";
import Navigation from "./components/Navigation";
import Footer from "./components/Footer";

function App() {
  return (
    <BrowserRouter>
      <Navigation />
      <AppRoutes />
      <Footer />
    </BrowserRouter>
  );
}

export default App;
