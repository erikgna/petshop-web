import {
  BrowserRouter,
  Route,
  Routes,
} from "react-router-dom";

import { SideNavigation } from "./components/SideNavigation/SideNavigation";
import { Navbar } from "./components/Navbar/Navbar";

import { ProdutosDashboard } from "./pages/ProdutosDashboard/ProdutosDashboard";
import { ProdutoDashboard } from "./pages/ProdutosDashboard/ProdutoDashboard";
import { FornecedoresDashboard } from "./pages/FornecedoresDashboard/FornecedoresDashboard";
import { FornecedorDashboard } from "./pages/FornecedoresDashboard/FornecedorDashboard";
import { FuncionariosDashboard } from "./pages/FuncionariosDashboard/FuncionariosDashboard";
import { FuncionarioDashboard } from "./pages/FuncionariosDashboard/FuncionarioDashboard";
import { ServicosDashboard } from "./pages/ServicosDashboard/ServicosDashboard";
import { ServicoDashboard } from "./pages/ServicosDashboard/ServicoDashboard";
import { EspeciesDashboard } from "./pages/EspeciesDashboard/EspeciesDashboard";
import { EspecieDashboard } from "./pages/EspeciesDashboard/EspecieDashboard";
import { RacasDashboard } from "./pages/RacasDashboard/RacasDashboard";
import { RacaDashboard } from "./pages/RacasDashboard/RacaDashboard";
import { AnimalsDashboard } from "./pages/AnimalsDashboard/AnimalsDashboard";
import { AnimalDashboard } from "./pages/AnimalsDashboard/AnimalDashboard";
import { ClientesDashboard } from "./pages/ClientesDashboard/ClientesDashboard";
import { ClienteDashboard } from "./pages/ClientesDashboard/ClienteDashboard";
import { NotaVendasDashboard } from "./pages/NotaVendasDashboard/NotaVendasDashboard";
import { NotaComprasDashboard } from "./pages/NotaComprasDashboard/NotaComprasDashboard";
import { NotaCompraDashboard } from "./pages/NotaComprasDashboard/NotaCompraDashboard";
import { ReportsDashboard } from "./pages/ReportsDashboard/ReportsDashboard";
import { NotaVendaDashboard } from "./pages/NotaVendasDashboard/NotaVendaDashboard";
import { CategoriaProdutoDashboard } from "./pages/CategoriaProdutoDashboard/CategoriaProdutoDashboard";
import { CategoriaProdutosDashboard } from "./pages/CategoriaProdutoDashboard/CategoriaProdutosDashboard";
import { CategoriaServicosDashboard } from "./pages/CategoriaServicoDashboard/CategoriaServicosDashboard";
import { CategoriaServicoDashboard } from "./pages/CategoriaServicoDashboard/CategoriaServicoDashboard";
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
              <Route path="/dashboard/fornecedores" element={<FornecedoresDashboard />} />
              <Route path="/dashboard/fornecedor/:id" element={<FornecedorDashboard />} />
              <Route path="/dashboard/funcionarios" element={<FuncionariosDashboard />} />
              <Route path="/dashboard/funcionario/:id" element={<FuncionarioDashboard />} />
              <Route path="/dashboard/servicos" element={<ServicosDashboard />} />
              <Route path="/dashboard/servico/:id" element={<ServicoDashboard />} />
              <Route path="/dashboard/especies" element={<EspeciesDashboard />} />
              <Route path="/dashboard/especie/:id" element={<EspecieDashboard />} />
              <Route path="/dashboard/racas" element={<RacasDashboard />} />
              <Route path="/dashboard/raca/:id" element={<RacaDashboard />} />
              <Route path="/dashboard/animais" element={<AnimalsDashboard />} />
              <Route path="/dashboard/animal/:id" element={<AnimalDashboard />} />
              <Route path="/dashboard/clientes" element={<ClientesDashboard />} />
              <Route path="/dashboard/cliente/:id" element={<ClienteDashboard />} />
              <Route path="/dashboard/notas-venda" element={<NotaVendasDashboard />} />
              <Route path="/dashboard/nota-venda/:id" element={<NotaVendaDashboard />} />
              <Route path="/dashboard/notas-compra/:id" element={<NotaCompraDashboard />} />
              <Route path="/dashboard/notas-compra" element={<NotaComprasDashboard />} />
              <Route path="/dashboard/categoria-produto/:id" element={<CategoriaProdutoDashboard />} />
              <Route path="/dashboard/categoria-produto" element={<CategoriaProdutosDashboard />} />
              <Route path="/dashboard/categoria-servico/:id" element={<CategoriaServicoDashboard />} />
              <Route path="/dashboard/categoria-servico" element={<CategoriaServicosDashboard />} />

              <Route path="/dashboard/relatorios" element={<ReportsDashboard />} />
            </Routes>
          </div>
        </section>
      </BrowserRouter>
    )
  }

  return (
    <BrowserRouter>
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
              </Routes>
            </div>
          </div>
        </div>
      </section>
    </BrowserRouter>
  )
}

export default App
