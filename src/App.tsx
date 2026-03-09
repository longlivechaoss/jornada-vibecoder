import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Home } from "./pages/Home";
import { ModulePage } from "./pages/ModulePage";
import { TopicPage } from "./pages/TopicPage";
import { LoginPage } from "./pages/LoginPage";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/module/:moduleId" element={<ModulePage />} />
        <Route path="/module/:moduleId/topic/:topicId" element={<TopicPage />} />
        <Route path="/login" element={<LoginPage />} />
        </Routes>
    </BrowserRouter>
  );
}
