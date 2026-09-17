import { Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import LogInPage from "./pages/LogInPage";
import SignUpPage from "./pages/SignUpPage";
import ProfilePage from "./pages/ProfilePage";
import "./App.css";
import { useAuthStore } from "./store/useAuthStore";
import { useEffect } from "react";
import Loader from "./components/loader/Loader";

function App() {
  const { authUser, isCheckingAuth, checkAuth } = useAuthStore();

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  if (isCheckingAuth) {
    return <Loader />;
  }

  return (
    <>
      <Routes>
        <Route path="/" element={authUser ? <HomePage /> : <LogInPage />} />
        <Route
          path="/signup"
          element={authUser ? <HomePage /> : <SignUpPage />}
        />
        <Route
          path="/login"
          element={!authUser ? <LogInPage /> : <HomePage />}
        />
        <Route
          path="/profile"
          element={authUser ? <ProfilePage /> : <LogInPage />}
        />
      </Routes>
    </>
  );
}

export default App;
