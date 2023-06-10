import React, { useState } from "react";
import api from "../boot/axios";
import { useNavigate } from "react-router-dom";


const Register = () => {
    const [mail, setMail] = useState("");

    console.log(mail);
    const [name, setName] = useState("");
    
    const [pwd, setPwd] = useState("");
    
    const [terms, setTerms] = useState(false);
   

    const navigate = useNavigate();

    const handleSubmit = () => {
        const data = {
            email: mail,
            nom: name,
            password: pwd,
            terms_and_conditions: terms,
        };

        api.post("/users/register", data)
            .then((res) => {
                alert("Registered successfully");
                navigate("/login");
            })
            .catch((err) => {
                alert("Registration failed");
            });
    };

    return (
        <div className="flex flex-col w-full h-screen">
            <div className="flex flex-col w-full h-full justify-center items-center px-[8.875rem] py-24">
                <div className="flex flex-col gap-9 items-center w-auto px-6 py-6 border rounded-lg shadow-2xl">
                    <h1 className="text-5xl font-bold">Registration</h1>
                    <div className="flex flex-row gap-4">
                        <input
                            type="email"
                            onChange={(e) => setMail(e.target.value)}
                            className="border rounded-lg p-1"
                            placeholder="Email"
                        />
                        <input
                            type="text"
                            onChange={(e) => setName(e.target.value)}
                            className="border rounded-lg p-1"
                            placeholder="Name"
                        />
                        <input
                            type="password"
                            onChange={(e) => setPwd(e.target.value)}
                            className="border rounded-lg p-1"
                            placeholder="Mot de passe"
                        />
                    </div>
                    <div className="flex flex-row gap-2 items-center">
                        <input
                            type="checkbox"
                            id="terms"
                            onChange={(e) => setTerms(e.target.checked)}
                        />
                        <label htmlFor="terms">
                            Agree to Terms and Conditions
                        </label>
                    </div>
                    <button onClick={handleSubmit}>Register</button>
                </div>
            </div>
        </div>
    );
};

export default Register;
