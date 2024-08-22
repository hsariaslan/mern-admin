import {useDispatch} from "react-redux";
import {NavigateFunction, useNavigate} from "react-router-dom";
import {AppDispatch} from "../app/store";
import {logout} from "../features/auth/authSlice";
import {IUser} from "../features/common/interfaces/IUser";

const Dashboard = () => {
    const navigate: NavigateFunction = useNavigate();
    const dispatch: AppDispatch = useDispatch();
    const user: IUser | null = JSON.parse(localStorage.getItem("mernUser") as string) as IUser;

    const handleLogout = (): void => {
        dispatch(logout());
        localStorage.removeItem("mernUser");
        navigate("/login");
    }

    return (
        <div>
            <h1>Dashboard</h1>
            <p>Welcome, <b>{user?.username}</b></p>
            <p>email: <b>{user?.email}</b></p>
            <p>Roles: {user?.roles.join(', ')}</p>
            <p>Permissions: {user?.permissions.join(', ')}</p>
            <button onClick={handleLogout}>Logout</button>
        </div>
    );
}

export default Dashboard;