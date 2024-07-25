import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./layouts/Layout";
import Login from "./pages/Login";
import NotFound from "./pages/NotFound";
function App() {
    return (
        <>
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<Layout />}>
                        <Route index element={<Login />} />
                    </Route>
                    <Route path="*" element={<NotFound />} />
                </Routes>
            </BrowserRouter>
        </>
    );
}

export default App;
