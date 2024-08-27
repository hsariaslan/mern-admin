import {IUser} from "../features/common/interfaces/IUser";
import Header from "../components/Header";

const Dashboard = () => {
    const user: IUser | null = JSON.parse(sessionStorage.getItem("mernUser") as string) as IUser;

    return (
        <div>
            <Header currentPage="dashboard"></Header>
            <main>
                <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
                    <p>Welcome, <b>{user?.username}</b></p>
                    <p>email: <b>{user?.email}</b></p>
                    <p>Roles: {user?.roles.join(', ')}</p>
                    <p>Permissions: {user?.permissions.join(', ')}</p>
                </div>
            </main>
        </div>
    );
}

export default Dashboard;