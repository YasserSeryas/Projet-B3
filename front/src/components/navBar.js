import React from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";

export const NavBar = () => {
    const name = useLocation().pathname.split("/")[1];
    console.log(name);
    const navigate = useNavigate();
    const verifyToken = () => {
        const token = localStorage.getItem("token");
        if (token) {
            return true;
        }
        return false;
    };
    const handleLogout = () => {
        localStorage.removeItem("token");
        navigate("/login");
    };
    return (
        <nav className="bg-gray-800">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16">
                    <div className="flex items-center w-full justify-between">
                        <div className="flex-shrink-0" onClick={() => navigate('/')}>
                            <img
                                className="h-8 w-8"
                                src="https://tailwindui.com/img/logos/workflow-mark-indigo-500.svg"
                                alt="Workflow"
                            />
                        </div>
                        <div className="hidden md:block">
                            <div className="ml-10 flex items-baseline space-x-4">
                                {verifyToken() ? (
                                    <>
                                        {name !== "/" && (
                                            <a
                                                onClick={() => navigate(-1)}
                                                className=" hover:bg-gray-700 text-white px-3 py-2 rounded-md text-sm font-medium"
                                            >
                                                Back
                                            </a>
                                        )}

                                        <a
                                            onClick={handleLogout}
                                            className=" hover:bg-gray-700 text-white px-3 py-2 rounded-md text-sm font-medium"
                                        >
                                            Logout
                                        </a>
                                        <Link to={"/cart"} className=" hover:bg-gray-700 text-white block px-3 py-2 rounded-md text-base font-medium">
                        Cart
                    </Link>
                                        <div className="md" id="mobile-menu">
                <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
                    <Link to={"/dashboard"} className=" hover:bg-gray-700 text-white block px-3 py-2 rounded-md text-base font-medium">
                        Dashboard
                    </Link>
                   

                    
                </div>
                

            </div>
                                    </>
                                ) : (
                                    <>
                                        <Link
                                            to={"/login"}
                                            className=" hover:bg-gray-700 text-white px-3 py-2 rounded-md text-sm font-medium"
                                        >
                                            Login
                                        </Link>

                                        <Link
                                            to={"/register"}
                                            className=" hover:bg-gray-700 text-white px-3 py-2 rounded-md text-sm font-medium"
                                        >
                                            Register
                                        </Link>
                                    </>
                                )}
                            </div>
                        </div>
                    </div>
                    
                </div>
            </div>

           
        </nav>
    );
};

export default NavBar;
