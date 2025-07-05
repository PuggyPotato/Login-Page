import { useState } from "react";
import { data, useNavigate } from "react-router-dom"


function Login(){
    const [name,setName] = useState("");
    const [password,setPassword] = useState("");
    const navigate = useNavigate();

    function navigateToRegister(){
        navigate("./Register")
    }

    const Login = async () =>{
        try{
            const response = await fetch("http://localhost:8080/login",{
                method:"POST",
                headers:{
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({name,password}),
            });
            if (!response.ok){
                const errorText = await response.text();
                console.error("Backend Error",errorText);
                alert(errorText);
                return;
            }
            const result = await response.json();
            console.log(result)
            navigate("./Home")
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
                        <label id="usernameLabel">Username:</label><input id="usernameInput" value={name} onChange={(e) =>setName(e.target.value)}/>
                    </div>
                    <div id="passwordContainer">
                        <label id="passwordLabel">Password:</label><input id="passwordInput" value={password} onChange={(e) =>setPassword(e.target.value)}/>
                    </div>
                </div>
                <div id="auth">
                    <div id="registerButtonLoginDiv">
                        <button onClick={navigateToRegister} id="registerButtonLogin">Back To Register</button>
                    </div>
                    <div id="loginButtonLoginDiv">
                        <button onClick={Login} id="loginButtonLogin">Login</button>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Login