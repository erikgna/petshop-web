import {
  BrowserRouter,
  Route,
  Routes,
} from "react-router-dom";

import { SideNavigation } from "./components/SideNavigation/SideNavigation";
import { Navbar } from "./components/Navbar/Navbar";

import { ProdutosDashboard } from "./pages/ProdutosDashboard/ProdutosDashboard";
import { ProdutoDashboard } from "./pages/ProdutosDashboard/ProdutoDashboard";
import { ClientesDashboard } from "./pages/ClientesDashboard/ClientesDashboard";
import { ClienteDashboard } from "./pages/ClientesDashboard/ClienteDashboard";
import { NotaVendasDashboard } from "./pages/NotaVendasDashboard/NotaVendasDashboard";
import { NotaVendaDashboard } from "./pages/NotaVendasDashboard/NotaVendaDashboard";
import { CategoriaProdutoDashboard } from "./pages/CategoriaProdutoDashboard/CategoriaProdutoDashboard";
import { CategoriaProdutosDashboard } from "./pages/CategoriaProdutoDashboard/CategoriaProdutosDashboard";
import { Home } from "./pages/Home/Home";
import { Blog } from "./pages/Blog/Blog";
import { Post } from "./pages/Post/Post";

import './global/styles/index.css'
import { Shop } from "./pages/Shop/Shop";
import { Product } from "./pages/Product/Product";
import { Auth } from "./pages/Auth/Auth";
import { Cart } from "./pages/Cart/Cart";
import { Profile } from "./pages/Profile/Profile";
import { Checkout } from "./pages/Checkout/Checkout";
import { AuthContextCmpnt } from "./contexts/Auth";
import { ForgotPassword } from "./pages/ForgotPassword/ForgotPassword";
import { Order } from "./pages/Order/Order";

function App() {

  if (window.location.pathname.includes('dashboard')) {
    return (
      <BrowserRouter>
        <section className="global">
          <SideNavigation />
          <div className="dashboard">
            <Routes>
              <Route path="/" element={<Home />} />

              <Route path="/dashboard/produtos" element={<ProdutosDashboard />} />
              <Route path="/dashboard/produto/:id" element={<ProdutoDashboard />} />
              <Route path="/dashboard/clientes" element={<ClientesDashboard />} />
              <Route path="/dashboard/cliente/:id" element={<ClienteDashboard />} />
              <Route path="/dashboard/notas-venda" element={<NotaVendasDashboard />} />
              <Route path="/dashboard/nota-venda/:id" element={<NotaVendaDashboard />} />
              <Route path="/dashboard/categoria-produto/:id" element={<CategoriaProdutoDashboard />} />
              <Route path="/dashboard/categoria-produto" element={<CategoriaProdutosDashboard />} />
            </Routes>
          </div>
        </section>
      </BrowserRouter>
    )
  }

  return (
    <BrowserRouter>
      <AuthContextCmpnt>
        <section>
          <div>
            <div className="teste">
              <Navbar />
              <div className="center">
                <Routes>
                  <Route path="/" element={<Home />} />
                  <Route path="/blog" element={<Blog />} />
                  <Route path="/post/:id" element={<Post />} />
                  <Route path="/shop" element={<Shop />} />
                  <Route path="/product/:id" element={<Product />} />
                  <Route path="/auth" element={<Auth />} />
                  <Route path="/cart" element={<Cart />} />
                  <Route path="/profile" element={<Profile />} />
                  <Route path="/checkout" element={<Checkout />} />
                  <Route path="/order/:id" element={<Order />} />
                  <Route path="/forgot-password" element={<ForgotPassword />} />
                </Routes>
              </div>
            </div>
          </div>
        </section>
      </AuthContextCmpnt>
    </BrowserRouter>
  )
}

export default App
