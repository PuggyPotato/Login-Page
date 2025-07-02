import { useNavigate } from "react-router-dom"





function Register(){
    const navigate = useNavigate();

    function navigateToLogin(){
        navigate("/")
    }

    return(
        <>    
            <div id="container">
                <div id="title">
                    <h1>Register Page</h1>
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
                    <div id="loginButtonRegister">
                        <button onClick={navigateToLogin}>Login</button>
                    </div>
                    <div id="registerButtonRegister">
                        <button>Register</button>
                    </div>
                </div>
            </div>
        </>
    )
}


export default Register