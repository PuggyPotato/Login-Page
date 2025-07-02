import { useNavigate } from "react-router-dom"


function Login(){
    const navigate = useNavigate();

    function navigateToRegister(){
        navigate("./Register")
    }
    return(
        <>
            <div id="container">
                <div id="title">
                    <h1>Login Page</h1>
                </div>
                <div id="credentials">
                    <div id="usernameContainer">
                        <label>Username:</label><input id="usernameInput"/>
                    </div>
                    <div id="passwordContainer">
                        <label>Password:</label><input id="passwordInput"/>
                    </div>
                </div>
                <div id="auth">
                    <div id="registerButtonLogin">
                        <button onClick={navigateToRegister}>Register</button>
                    </div>
                    <div id="loginButtonLogin">
                        <button>Login</button>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Login