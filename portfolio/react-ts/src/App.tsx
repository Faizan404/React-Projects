import { BrowserRouter, Routes, Route } from "react-router-dom";

import HomePage from "./pages/HomePage";
import BlogPage from "./pages/BlogPage";
import NavBar from "./components/NavBar";

function App() {
  return (
    <BrowserRouter>
      <NavBar />
      <Routes>
        <Route index element={<HomePage />} />
        <Route path="/blog" element={<BlogPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
