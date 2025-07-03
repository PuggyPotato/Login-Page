import { useState } from "react";
import { data, useNavigate } from "react-router-dom"


function Login(){
    const [username,setUsername] = useState("");
    const [password,setPassword] = useState("");
    const navigate = useNavigate();

    function navigateToRegister(){
        navigate("./Register")
    }

    const Login = async () =>{
        try{
            const response = await fetch("http://localhost:8080/submit",{
                method:"POST",
                headers:{
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({username,password}),
            });
            const result = await response.json();
        }
        catch(err){
            console.log("Error sending data:",err);
        }
    }


    
    return(
        <>
            <div id="container">
                <div id="title">
                    <h1>Login Page</h1>
                </div>
                <div id="credentials">
                    <div id="usernameContainer">
                        <label>Username:</label><input id="usernameInput" value={username} onChange={(e) =>setUsername(e.target.value)}/>
                    </div>
                    <div id="passwordContainer">
                        <label>Password:</label><input id="passwordInput" value={password} onChange={(e) =>setPassword(e.target.value)}/>
                    </div>
                </div>
                <div id="auth">
                    <div id="registerButtonLogin">
                        <button onClick={navigateToRegister}>Register</button>
                    </div>
                    <div id="loginButtonLogin">
                        <button onClick={Login}>Login</button>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Login