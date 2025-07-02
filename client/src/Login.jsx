


function Login(){

    return(
        <>
            <div id="container">
                <div id="credentials">
                    <div id="usernameContainer">
                        <label>Username:</label><input id="usernameInput"/>
                    </div>
                    <div id="passwordContainer">
                        <label>Password:</label><input id="passwordInput"/>
                    </div>
                </div>
                <div id="auth">
                    <div id="loginButton">
                        <button>Login</button>
                    </div>
                    <div id="registerButton">
                        <button>Register</button>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Login