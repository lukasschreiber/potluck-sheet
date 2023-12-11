import {Header} from "./components/Header.tsx";
import {Footer} from "./components/Footer.tsx";
import {Route, Routes} from "react-router-dom";
import {HomePage} from "./pages/HomePage.tsx";
import {LoginPage} from "./pages/LoginPage.tsx";
import {ProtectedRoute} from "./components/common/ProtectedRoute.tsx";
import {RegisterPage} from "./pages/RegisterPage.tsx";

function App() {

  return (
    <>
        <Header />
        <Routes>
            <Route path="/" element={
                <ProtectedRoute>
                <HomePage />
                </ProtectedRoute>} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
        </Routes>
        <Footer />
    </>
  )
}

export default App
