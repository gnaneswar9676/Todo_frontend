import { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../services/api";
import "../styles/auth.css";

function Register(){

const [name,setName]=useState("");
const [email,setEmail]=useState("");
const [password,setPassword]=useState("");

const navigate=useNavigate();

const handleRegister=async(e)=>{
e.preventDefault();

await API.post("/api/auth/register",{name,email,password});

navigate("/");
};

return(

<div className="auth-page">

<div className="auth-card">

<h2 className="auth-title">Create Account</h2>

<form onSubmit={handleRegister}>

<input
className="auth-input"
placeholder="Name"
value={name}
onChange={(e)=>setName(e.target.value)}
/>

<input
className="auth-input"
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
Register
</button>

</form>

<p className="auth-switch">
Already have an account?
<span
className="auth-link"
onClick={()=>navigate("/")}
>
Login
</span>
</p>

</div>

</div>

)

}

export default Register;