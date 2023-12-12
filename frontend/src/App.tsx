import {Header} from "./components/Header.tsx";
import {Footer} from "./components/Footer.tsx";
import {Route, Routes} from "react-router-dom";
import {HomePage} from "./pages/HomePage.tsx";
import {LoginPage} from "./pages/LoginPage.tsx";
import {ProtectedRoute} from "./components/common/ProtectedRoute.tsx";
import {RegisterPage} from "./pages/RegisterPage.tsx";
import {ConnectionStreamProvider} from "./hooks/useConnectionStream.tsx";
import {TableStreamProvider} from "./hooks/useTableStream.tsx";

function App() {

  return (
    <div className={"min-h-screen flex flex-col"}>
        <div className={"flex-1 flex flex-col"}>
            <Routes>
                <Route path="/" element={
                    <ProtectedRoute>
                        <ConnectionStreamProvider>
                            <Header />
                            <TableStreamProvider>
                                <HomePage />
                            </TableStreamProvider>
                        </ConnectionStreamProvider>
                    </ProtectedRoute>} />
                <Route path="/login" element={<LoginPage />} />
                <Route path="/register" element={<RegisterPage />} />
            </Routes>
        </div>
        <Footer />
    </div>
  )
}

export default App
