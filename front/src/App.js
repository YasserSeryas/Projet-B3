

import "./App.css";
import Login from "./components/login";
import { Route, Routes } from "react-router-dom";
import Register from "./components/register";

import Home from "./components/home";
import NavBar from "./components/navBar";
import Product from "./components/product";
import FilteredHomebyMan from "./components/filteredHomebyMan";
import FilteredHomebyWoman from "./components/filteredHomebyWoman";
import Dashboard from "./components/dashboard";
import Cart from "./components/cart";

function App() {
    return (
        <div className="App">
            <Routes>
                <Route path="/" element={ 
                  <>
                <NavBar /> 
                <Home />
                 </> } />
                 <Route path="/menCategory" element={ 
                  <>
                <NavBar /> 
                <FilteredHomebyMan />
                 </> } />
                 <Route path="/womenCategory" element={ 
                  <>
                <NavBar /> 
                <FilteredHomebyWoman />
                 </> } />
                <Route
                    path="/login"
                    element={
                        <>
                            <NavBar />
                            <Login />
                        </>
                    }
                />
                <Route
                    path="/register"
                    element={
                        <>
                            <NavBar />
                            <Register />
                        </>
                    }
                />
                 <Route
                    path="/product/:id"
                    element={
                        <>
                            <NavBar />
                            <Product />
                        </>
                    }
                />
                  <Route
                    path="/dashboard"
                    element={
                        <>
                            <NavBar />
                            <Dashboard />
                        </>
                    }
                />
                    <Route
                    path="/cart"
                    element={
                        <>
                            <NavBar />
                            <Cart />
                        </>
                    }
                />
                
                
            </Routes>
        </div>
    );
}

export default App;
