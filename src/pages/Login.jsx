import { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../services/api";
import "../styles/auth.css";

function Login(){

const [email,setEmail]=useState("");
const [password,setPassword]=useState("");

const navigate=useNavigate();

const handleLogin=async(e)=>{
e.preventDefault();

const res=await API.post("/api/auth/login",{email,password});

localStorage.setItem("token",res.data.token);

navigate("/dashboard");
};

return(

<div className="auth-page">

<div className="auth-card">

<h2 className="auth-title">Login</h2>

<form onSubmit={handleLogin}>

<input
className="auth-input"
type="email"
placeholder="Email"
value={email}
onChange={(e)=>setEmail(e.target.value)}
/>

<input
className="auth-input"
type="password"
placeholder="Password"
value={password}
onChange={(e)=>setPassword(e.target.value)}
/>

<button className="auth-btn">
Login
</button>

</form>

<p className="auth-switch">
Don't have an account?
<span
className="auth-link"
onClick={()=>navigate("/register")}
>
Register
</span>
</p>

</div>

</div>

)

}

export default Login;