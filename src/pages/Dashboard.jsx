import { useState, useEffect } from "react";
import API from "../services/api";
import TodoForm from "../components/TodoForm";
import { useNavigate } from "react-router-dom";
import '../styles/dashboard.css';
function Dashboard(){

const navigate = useNavigate();   // ✅ correct place

const logout = () => {
  localStorage.removeItem("token");
  navigate("/");
};

const [todos,setTodos] = useState([]);

const fetchTodos = async () => {

const token = localStorage.getItem("token");

const res = await API.get("/todo/get",{
headers:{
Authorization:`Bearer ${token}`
}
});

setTodos(res.data);
};

const updateStatus = async (id, status) => {

const token = localStorage.getItem("token");

await API.put(`/todo/update/${id}`,
{ status },
{
headers:{
Authorization:`Bearer ${token}`
}
});

fetchTodos();

};

const deleteTodo = async (id) => {

const token = localStorage.getItem("token");

await API.delete(`/todo/delete/${id}`,{
headers:{
Authorization:`Bearer ${token}`
}
});

fetchTodos();

};

useEffect(()=>{
fetchTodos();
},[]);

return(
<div className="container">

<h2 className="title">My Todos</h2>

<TodoForm fetchTodos={fetchTodos} />

{todos.map((todo)=>(
<div className="todo-card" key={todo._id}>

<h4 className="todo-title">{todo.title}</h4>
<p className="todo-desc">{todo.description}</p>
<p className="status">Status: {todo.status}</p>

<div className="button-group">

<button
className="btn btn-complete"
onClick={()=>updateStatus(todo._id,"completed")}
>
Complete
</button>

<button
className="btn btn-delete"
onClick={()=>deleteTodo(todo._id)}
>
Delete
</button>

</div>

</div>
))}

<button className="logout-btn" onClick={logout}>
Logout
</button>

</div>
);
}

export default Dashboard;