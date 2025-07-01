


function Login(){

    return(
        <>
            <div id="container">
                <div id="credentials">
                    <div id="usernameContainer">
                        <label>Username:</label><input/>
                    </div>
                    <div id="passwordContainer">
                        <label>Password:</label><input/>
                    </div>
                </div>
                <div id="loginButton">
                    <button>Login</button>
                </div>
            </div>
        </>
    )
}

export default Login