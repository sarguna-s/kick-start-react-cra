import "./index.css";
import { Footer } from "./components/footer";
import { Header } from "./components/header";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "./pages/home";
import AboutPage from "./pages/about";

const App = () => {
  return (
    <main>
      <Header />
      <BrowserRouter>
        <Routes>
          <Route path="/" Component={HomePage} />
          <Route path="/about" Component={AboutPage} />
        </Routes>
      </BrowserRouter>
      <Footer />
    </main>
  );
};

export default App;
