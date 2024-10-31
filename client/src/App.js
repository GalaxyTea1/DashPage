import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import "./App.css";
import Login from "./components/LoginForm/login";
import Register from "./components/RegisterForm/register";
import NotFound from "./pages/404/notFound";
import Home from "./pages/Home/home";
import { Layout } from "./pages/Layout/layout";

const App = () => {
  const ProtectedRoute = ({ children }) => {
    const isAuthenticated = localStorage.getItem("token");

    if (!isAuthenticated) {
      return <Navigate to='/login' replace />;
    }

    return children;
  };

  return (
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
        </Route>

        {/* 404 route */}
        <Route path='*' element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;

