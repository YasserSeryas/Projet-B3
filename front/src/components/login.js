import React, { useState } from "react";

import { useNavigate } from "react-router-dom";
import api from "../boot/axios";


const Login= () => {
    const [mail, setMail] = useState("");
    console.log(mail);
    const [pwd, setPwd] = useState("");
    console.log(pwd);

    const navigate = useNavigate();

    const handleSubmit = () => {
        const data = {
            email: mail,
            password: pwd,
        };

        api.post("/users/login", data)
            .then((res) => {
                const token = res.data.activeToken;
                alert("Logged in successfully");
                localStorage.setItem("token", token);
                navigate("/");
            })
            .catch((err) => {
                alert("Logged in failed");
            });
    };

    return (
        <div className="flex flex-col w-full h-screen">
            <div className="flex flex-col w-full h-full justify-center items-center px-[8.875rem] py-24">
                <div className="flex flex-col gap-9 items-center w-auto px-6 py-6 border rounded-lg shadow-2xl">
                    <h1 className="text-5xl font-bold">Login</h1>
                    <div className="flex flex-row gap-4">
                        <input
                            type="email"
                            onChange={(e) => setMail(e.target.value)}
                            className="border rounded-lg p-1"
                            placeholder="Email"
                        />
                        <input
                            type="password"
                            onChange={(e) => setPwd(e.target.value)}
                            className="border rounded-lg p-1"
                            placeholder="Mot de passe"
                        />
                    </div>
                    <button onClick={handleSubmit}>Login</button>
                </div>
            </div>
        </div>
    );
};

export default Login;
