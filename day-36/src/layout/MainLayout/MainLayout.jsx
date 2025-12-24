import { Outlet } from "react-router-dom";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import Cart from "../../components/Cart";

export default function MainLayout() {
    return (
        <div className="flex flex-col min-h-screen">
            <Header />
            <Cart />

            <main className="flex-1">
                <Outlet />
            </main>

            <Footer />
        </div>
    );
}
