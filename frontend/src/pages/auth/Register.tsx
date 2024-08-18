import {Link} from "react-router-dom";

const Register = () => {
    return (
        <div>
            <h1>Register</h1>
            <Link to="/" className="mx-2 hover:text-red-600 underline">Dashboard</Link>
            <Link to="/login" className="mx-2 hover:text-red-600 underline">Login</Link>
        </div>
    );
}

export default Register;