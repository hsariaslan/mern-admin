import {Link} from "react-router-dom";

const Dashboard = () => {
    return (
        <div>
            <h1>Dashboard</h1>
            <Link to="/login" className="mx-2 hover:text-red-600 underline">Login</Link>
            <Link to="/register" className="mx-2 hover:text-red-600 underline">Register</Link>
        </div>
    );
}

export default Dashboard;