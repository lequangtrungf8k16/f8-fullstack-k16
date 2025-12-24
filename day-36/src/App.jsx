import { Route, Routes } from "react-router-dom";
import MainLayout from "./layout/MainLayout/MainLayout";
import Products from "./pages/Products";

export default function App() {
    return (
        <div>
            <>
                <Routes>
                    <Route path="/" element={<MainLayout />}>
                        <Route index element={<Products />} />
                    </Route>
                </Routes>
            </>
        </div>
    );
}
