import React, { useState } from "react";
import "../styles/Login.css";
import logo from "../assets/logo.png";
import netflix_spinner from "../assets/netflix_spinner.gif";
import { login, signup, googleLogin } from "../firebase";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();

  const [signState, setSignState] = useState("Sign In");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const user_auth = async (e) => {
    e.preventDefault();
    setLoading(true);

    let success = false;

    if (signState === "Sign In") {
      success = await login(email, password);
    } else {
      success = await signup(name, email, password);
    }

    setLoading(false);

    if (success) navigate("/");
  };

  const handleGoogleLogin = async () => {
    const success = await googleLogin();
    if (success) {
      setLoading(true);
      navigate("/");
    }
  };

  return (
    <>
      {loading ? (
        <div className="login-spinner">
          <img src={netflix_spinner} alt="Loading" />
        </div>
      ) : (
        <div className="login">
          <img src={logo} className="login-logo" alt="Netflix" />

          <div className="login-form">
            <h1>{signState}</h1>

            <form onSubmit={user_auth}>
              {signState === "Sign Up" && (
                <input
                  type="text"
                  placeholder="Your Name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                />
              )}

              <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />

              <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />

              <button type="submit">{signState}</button>
<button
  type="button"
  className="google-btn"
  onClick={handleGoogleLogin}
>
  <img
    src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg"
    alt="Google"
    width="18"
  />
  Sign in with Google
</button>

            </form>

            <div className="form-switch">
              {signState === "Sign In" ? (
                <p>
                  New to Netflix?
                  <span onClick={() => setSignState("Sign Up")}>
                    {" "}Sign Up Now
                  </span>
                </p>
              ) : (
                <p>
                  Already have an account?
                  <span onClick={() => setSignState("Sign In")}>
                    {" "}Sign In Now
                  </span>
                </p>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Login;

