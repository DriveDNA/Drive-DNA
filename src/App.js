import "./App.css";
import { Header } from "./components/Header/Header";
import { Dropdown } from "./components/dropdown/Dropdown";
import { Home } from "./components/Home/Home";
import { Category } from "./pages/Category";
import { Cart } from "./pages/Cart";
import { About } from "./pages/About";
import { Exchange } from "./pages/Exchange";
import { Checkout } from "./pages/Checkout";
import { Product } from "./pages/Product";
import { Signup } from "./components/SignUp/Signup";
import { VerifySuccess } from "./pages/VerifySuccess";
import { Login } from "./components/Login/Login";
import { Terms } from "./pages/Terms&Conditions";
import { Privacy } from "./pages/Privacy&Policy";
import { Myorders } from "./pages/myorders";
import { ShippingPolicy } from "./pages/ShippingPolicy";
import { Search } from "./components/Search/Search";
import { Route, Routes } from "react-router-dom";
import { Toaster } from "react-hot-toast";

function App() {
  return (
    <>
    <Toaster position="top-center"/>
      <Header />
      <Dropdown />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/signup" element={<Signup/>}/>
        <Route path="/verify-success" element={<VerifySuccess/>}/>
        <Route path="/login" element={<Login/>}/>
        <Route path="/search" element={<Search/>} />
        <Route path="/myorders" element={<Myorders/>}/>
        <Route path="/category/:categoryId" element={<Category />} />
        <Route path="/exchange" element={<Exchange />} />
        <Route path="/product/:id" element={<Product />} />
        <Route path="/checkout" element={<Checkout/>} />
        <Route path="/cart" element={<Cart/>} />
        <Route path="/terms&conditions" element={<Terms />} />
        <Route path="/privacy&policy" element={<Privacy />} />
        <Route path="/shippingpolicy" element={<ShippingPolicy />} />
      </Routes>
    </>
  );
}

export default App;
