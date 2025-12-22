import { Routes, Route } from "react-router-dom";
import "./index.css";

import Nav from "./Components/Nav";

import Home from "./Pages/Home";
import About from "./Pages/About";
import Products from "./Pages/Products";
import ProductDetail from "./Pages/ProductDetail";
import Contact from "./Pages/Contact";
import NotFound from "./Pages/NotFound";

export default function App() {
    return (
        <>
            <Nav>
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/about" element={<About />} />
                    <Route path="/products" element={<Products />} />
                    <Route path="/contact" element={<Contact />} />
                    <Route path="/product/:id" element={<ProductDetail />} />
                    <Route path="*" element={<NotFound />} />
                </Routes>
            </Nav>
        </>
    );
}
