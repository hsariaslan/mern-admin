import {Link} from "react-router-dom";

const Dashboard = () => {
    return (
        <div>
            <h1>Dashboard</h1>
            <Link to="/login" className="mx-2 hover:text-red-600 underline">Login</Link>
            <Link to="/sign-up" className="mx-2 hover:text-red-600 underline">Sign Up</Link>
        </div>
    );
}

export default Dashboard;