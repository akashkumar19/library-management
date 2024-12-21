import { BrowserRouter } from "react-router-dom";
import "./App.scss";
import { AppRoutes } from "./AppRoutes";
import Navigation from "./components/Navigation";

function App() {
  return (
    <BrowserRouter>
      <Navigation />
      <AppRoutes />
    </BrowserRouter>
  );
}

export default App;
