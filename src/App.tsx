import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { Home } from "./pages/Home";
import { ModulePage } from "./pages/ModulePage";
import { TopicPage } from "./pages/TopicPage";
import { LoginPage } from "./pages/LoginPage";
import { getAuthState } from "@/utils/auth";

function RequireAuth({ children }: { children: React.ReactNode }) {
  const { isAuthenticated } = getAuthState();

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return <>{children}</>;
}

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<LoginPage />} />

        <Route
          path="/"
          element={
            <RequireAuth>
              <Home />
            </RequireAuth>
          }
        />

        <Route
          path="/module/:moduleId"
          element={
            <RequireAuth>
              <ModulePage />
            </RequireAuth>
          }
        />

        <Route
          path="/module/:moduleId/topic/:topicId"
          element={
            <RequireAuth>
              <TopicPage />
            </RequireAuth>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}
