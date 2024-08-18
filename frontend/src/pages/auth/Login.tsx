import {Link} from "react-router-dom";

const Login = () => {
    return (
        <div>
            <h1>Login</h1>
            <Link to="/" className="mx-2 hover:text-red-600 underline">Dashboard</Link>
            <Link to="/register" className="mx-2 hover:text-red-600 underline">Register</Link>
        </div>
    );
}

export default Login;