import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Login() {

    const navigate = useNavigate();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleLogin = async () => {

        try {

            const response = await axios.post(
                "http://localhost:8080/api/auth/login",
                {
                    email,
                    password,
                }
            );

            localStorage.setItem("token", response.data.token);

            alert("Login Successful!");

            navigate("/dashboard");

        } catch (error) {

            alert("Invalid Email or Password");

            console.log(error);

        }

    };

    return (

        <div className="container text-center mt-5">

            <h1>Textile Waste Management AI</h1>

            <div
                className="card p-4 mx-auto mt-4"
                style={{ maxWidth: "400px" }}
            >

                <input
                    type="email"
                    className="form-control mb-3"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />

                <input
                    type="password"
                    className="form-control mb-3"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />

                <button
                    className="btn btn-success"
                    onClick={handleLogin}
                >
                    Login
                </button>

            </div>

        </div>

    );

}

export default Login;