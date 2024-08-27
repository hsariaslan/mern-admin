import {useEffect, useState} from "react";
import {TailSpin} from "react-loader-spinner";
import {PencilSquareIcon, TrashIcon} from '@heroicons/react/16/solid';
import * as UsersApi from "../../services/usersApi";
import UserModel from "./User";
import Header from "../../components/Header";
import ModalComponent from "../../components/Modal";
import CreateUser from "./components/CreateUser";
import UpdateUser from "./components/UpdateUser";

const UsersIndex = () => {
    const [users, setUsers] = useState<UserModel[]>([]);
    const [showLoading, setShowLoading] = useState(false);
    const [showLoadingError, setShowLoadingError] = useState(false);
    const [showCreateModal, setShowCreateModal] = useState(false);
    const [showUpdateModal, setShowUpdateModal] = useState(false);
    const [showDeleteAlert, setShowDeleteAlert] = useState(false);
    const [operatingUser, setOperatingUser] = useState<UserModel | null>(null);

    useEffect(() => {
        async function getUsers(): Promise<void> {
            try {
                setShowLoading(true);
                setShowLoadingError(false);
                await new Promise(r => setTimeout(r, 200));
                const users: UserModel[] = await UsersApi.index();
                setUsers(users);
            } catch (error) {
                console.log(error);
                setShowLoadingError(true);
                setShowLoading(false);
            } finally {
                setShowLoading(false);
            }
        }

        getUsers();
    }, []);

    async function deleteUser(): Promise<void> {
        if (operatingUser) {
            try {
                await UsersApi.deleteUser(operatingUser.username);
                setUsers(users.filter((existingUser: UserModel): boolean => existingUser._id !== operatingUser._id));
            } catch (error) {
                console.log(error);
            }
        }

        setOperatingUser(null);
        setShowDeleteAlert(false);
    }

    return (
        <div>
            <Header currentPage="users"></Header>
            <main>
                <div className="mx-auto max-w-7xl px-4 pt-6 sm:px-6 lg:px-8">
                    <button className="button-primary w-auto" onClick={() => setShowCreateModal(true)}>Create User</button>
                </div>
                <div className="mx-auto px-4 py-6">
                    <div className="flex flex-col overflow-x-auto">
                        <div className="inline-block min-w-full py-2 sm:px-6 lg:px-8">
                            <div className="overflow-x-auto">
                                <table
                                    className="min-w-full border text-left text-sm font-light dark:border-neutral-500">
                                    <thead
                                        className="border-b bg-stone-300 font-medium dark:border-neutral-500 dark:text-neutral-800">
                                    <tr>
                                        <th scope="col" className="th">#</th>
                                        <th scope="col" className="th">Actions</th>
                                        <th scope="col" className="th">Username</th>
                                        <th scope="col" className="th">Email</th>
                                        <th scope="col" className="th">Roles</th>
                                        <th scope="col" className="th">Permissions</th>
                                    </tr>
                                    </thead>
                                    <tbody>
                                    {showLoading &&
                                        <tr className="border-b transition duration-300 ease-in-out hover:bg-stone-200 dark:border-neutral-500 dark:hover:bg-neutral-600">
                                            <td colSpan={6}>
                                                <div className="flex items-center justify-center my-3">
                                                    <TailSpin
                                                        height="24"
                                                        width="24"
                                                        color="black"
                                                    />
                                                </div>
                                            </td>
                                        </tr>
                                    }
                                    {!showLoading && !showLoadingError &&
                                        <>
                                            {users.length > 0 ?
                                                users.map((user: UserModel, index) => (
                                                    <tr key={user._id}
                                                        className="border-b transition duration-300 ease-in-out hover:bg-stone-200 dark:border-neutral-500 dark:hover:bg-neutral-600">
                                                        <td className="td font-medium">{index + 1}</td>
                                                        <td className="td">
                                                            <div className="flex items-center h-full gap-2">
                                                                <button
                                                                    className="opacity-50"
                                                                    onClick={() => {
                                                                        setShowUpdateModal(true)
                                                                        setOperatingUser(user)
                                                                    }}
                                                                >
                                                                    <PencilSquareIcon width="20" height="20"/>
                                                                </button>
                                                                <button
                                                                    className="opacity-50"
                                                                    onClick={() => {
                                                                        setShowDeleteAlert(true)
                                                                        setOperatingUser(user)
                                                                    }}
                                                                >
                                                                    <TrashIcon width="20" height="20"/>
                                                                </button>
                                                            </div>
                                                        </td>
                                                        <td className="td">{user.username}</td>
                                                        <td className="td">{user.email}</td>
                                                        <td className="td">{user.roles.join(', ')}</td>
                                                        <td className="td">{user.permissions.join(', ')}</td>
                                                    </tr>
                                                ))
                                                : <tr>
                                                    <td colSpan={6}>There is no user.</td>
                                                </tr>
                                            }
                                        </>
                                    }
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
            {showCreateModal &&
                <CreateUser
                    onDismiss={() => setShowCreateModal(false)}
                    onCreateUser={(newUser: UserModel) => {
                        setUsers([...users, newUser]);
                        setShowCreateModal(false);
                    }}
                />
            }
            {showUpdateModal &&
                <UpdateUser
                    user={operatingUser}
                    onDismiss={() => setShowUpdateModal(false)}
                    onCreateUser={(updatedUser: UserModel) => {
                        setUsers(users.map(existingUser => existingUser._id === updatedUser._id ? updatedUser : existingUser));
                        setShowUpdateModal(false);
                    }}
                />
            }
            {showDeleteAlert &&
                <ModalComponent
                    title="Confirm Delete"
                    content="Are you sure you want to delete this user?"
                    confirmButton={{
                        text: "Delete",
                        variant: "danger",
                        disabled: false
                    }}
                    onDismiss={() => setShowDeleteAlert(false)}
                    onConfirm={() => deleteUser()}
                />
            }
        </div>
    );
}

export default UsersIndex;