import { NavLink } from "react-router-dom";

export default function Nav({ children }) {
    const classNavLink = ({ isActive }) => {
        const baseClass =
            "min-w-24 px-4 py-2 text-center font-bold border border-gray-400 rounded-md cursor-pointer select-none shadow-md transition-all";
        const activeClass = "bg-blue-400 text-white pointer-events-none";
        const normalClass = "hover:bg-blue-500 hover:text-white";
        return `${baseClass} ${isActive ? activeClass : normalClass}`;
    };

    return (
        <>
            <div className="flex justify-center items-center gap-2 py-2 select-none border-b border-b-gray-400">
                <NavLink to="/" className={classNavLink}>
                    Home
                </NavLink>

                <NavLink to="/about" className={classNavLink}>
                    About
                </NavLink>

                <NavLink to="/products" className={classNavLink}>
                    Products
                </NavLink>

                <NavLink to="/contact" className={classNavLink}>
                    Contact
                </NavLink>
            </div>
            <main>{children}</main>
        </>
    );
}
