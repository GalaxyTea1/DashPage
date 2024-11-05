import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import "./App.css";
import Login from "./components/LoginForm/login";
import Register from "./components/RegisterForm/register";
import { LoadingProvider } from "./context/loadingContext";
import NotFound from "./pages/404/notFound";
import Home from "./pages/Home/home";
import { Layout } from "./pages/Layout/layout";
import { ReactNode } from "react";
import { Profile } from "./pages/Profile/profile";
import { About } from "./pages/About/about";

const App = () => {
  const ProtectedRoute = ({ children }: { children: ReactNode }) => {
    const isAuthenticated = localStorage.getItem("token");

    if (!isAuthenticated) {
      return <Navigate to='/login' replace />;
    }

    return children;
  };

  return (
    <LoadingProvider>
      <BrowserRouter>
        <Routes>
          {/* Public routes */}
          <Route path='/login' element={<Login />} />
          <Route path='/register' element={<Register />} />

          {/* Protected routes */}
          <Route
            path='/'
            element={
              <ProtectedRoute>
                <Layout />
              </ProtectedRoute>
            }
          >
            <Route index element={<Home />} />
            <Route path='home' element={<Home />} />
            <Route path='profile' element={<Profile />} />
            <Route path='about' element={<About />} />
          </Route>

          {/* 404 route */}
          <Route path='*' element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </LoadingProvider>
  );
};

export default App;

