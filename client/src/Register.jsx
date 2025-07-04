import { useState } from "react";
import { useNavigate } from "react-router-dom"





function Register(){
    const [name,setName] = useState("");
    const [password,setPassword] = useState("");
    const navigate = useNavigate();

    function navigateToLogin(){
        navigate("/")
    }

    const Register = async () => {
        try{
            const response = await fetch("http://localhost:8080/register",{
                method:"POST",
                headers:{
                    "Content-Type":"application/json",
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

            console.log("response:",response)
        }
        catch(err){
            console.log("Error:",err);
        }
    }

    return(
        <>    
            <div id="container">
                <div id="title">
                    <h1>Register Page</h1>
                </div>
                <div id="credentials">
                    <div id="usernameContainer">
                        <label>Username:</label><input id="usernameInput" onChange={(e) =>setName(e.target.value)}/>
                    </div>
                    <div id="passwordContainer">
                        <label>Password:</label><input id="passwordInput" onChange={(e) =>setPassword(e.target.value)}/>
                    </div>
                </div>
                <div id="auth">
                    <div id="loginButtonRegister">
                        <button onClick={navigateToLogin}>Login</button>
                    </div>
                    <div id="registerButtonRegister">
                        <button onClick={Register}>Register</button>
                    </div>
                </div>
            </div>
        </>
    )
}


export default Register