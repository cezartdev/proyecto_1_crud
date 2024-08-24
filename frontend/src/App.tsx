import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./layouts/Layout";
import Login from "./pages/Login";
import NotFound from "./pages/NotFound";
import Dashboard from "./pages/Dashboard";
import PrivateRoute from "./components/PrivateRoute";
import { AuthProvider } from "./components/AuthContext";
import VerClientes from "./pages/clientes/VerClientes";
import CrearUsuarios from "./pages/usuarios/CrearUsuarios";
import CreatePermisosUsuarios from "./pages/usuarios/CrearPermisosUsuarios";
import AdministrarPermisos from "./pages/usuarios/AdministrarPermisos";
import Productos from "./pages/productos/Productos";
import Facturas from "./pages/facturas/Facturas";
const App: React.FC = () => {
    return (
        <AuthProvider>
            <BrowserRouter>
                <Routes>
                    <Route path="/">
                        <Route index element={<Login />} />


                        <Route element={<PrivateRoute />}>
                            <Route path="/dashboard" element={<Layout />}>
                                <Route index element={<Dashboard />} />
                                <Route path="get-customers" element={<VerClientes />} />
                                <Route path="create-user" element={<CrearUsuarios />} />
                                <Route path="create-permissions" element={<CreatePermisosUsuarios />} />
                                <Route path="manage-permissions" element={<AdministrarPermisos />} />
                                <Route path="create-product" element={<Productos />} />
                                <Route path="create-invoice" element={<Facturas />} />
                            </Route>
                        </Route>


                    </Route>
                    <Route path="*" element={<NotFound />} />
                </Routes>
            </BrowserRouter>
        </AuthProvider>
    );
};

export default App;
