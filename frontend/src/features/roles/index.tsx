import {useEffect, useState} from "react";
import {TailSpin} from "react-loader-spinner";
import {PencilSquareIcon, TrashIcon} from '@heroicons/react/16/solid';
import * as RolesApi from "../../services/rolesApi";
import RoleModel from "./Role";
import Header from "../../components/Header";
import ModalComponent from "../../components/Modal";
import CreateRole from "./components/CreateRole";
import UpdateRole from "./components/UpdateRole";

const RolesIndex = () => {
    const [roles, setRoles] = useState<RoleModel[]>([]);
    const [showLoading, setShowLoading] = useState(false);
    const [showLoadingError, setShowLoadingError] = useState(false);
    const [showCreateModal, setShowCreateModal] = useState(false);
    const [showUpdateModal, setShowUpdateModal] = useState(false);
    const [showDeleteAlert, setShowDeleteAlert] = useState(false);
    const [operatingRole, setOperatingRole] = useState<RoleModel | null>(null);

    useEffect(() => {
        async function getRoles(): Promise<void> {
            try {
                setShowLoading(true);
                setShowLoadingError(false);
                const roles: RoleModel[] = await RolesApi.index();
                setRoles(roles);
            } catch (error) {
                console.log(error);
                setShowLoadingError(true);
                setShowLoading(false);
            } finally {
                setShowLoading(false);
            }
        }

        getRoles();
    }, []);

    async function deleteRole(): Promise<void> {
        if (operatingRole) {
            try {
                await RolesApi.deleteRole(operatingRole.slug);
                setRoles(roles.filter((existingRole: RoleModel): boolean => existingRole._id !== operatingRole._id));
            } catch (error) {
                console.log(error);
            }
        }

        setOperatingRole(null);
        setShowDeleteAlert(false);
    }

    return (
        <div>
            <Header currentPage="roles"></Header>
            <main>
                <div className="mx-auto max-w-7xl px-4 pt-6 sm:px-6 lg:px-8">
                    <button className="button-primary w-auto" onClick={() => setShowCreateModal(true)}>Create Role</button>
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
                                        <th scope="col" className="th">Role</th>
                                        <th scope="col" className="th">Slug</th>
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
                                            {roles.length > 0 ?
                                                roles.map((role: RoleModel, index) => (
                                                    <tr key={role._id}
                                                        className="border-b transition duration-300 ease-in-out hover:bg-stone-200 dark:border-neutral-500 dark:hover:bg-neutral-600">
                                                        <td className="td font-medium">{index + 1}</td>
                                                        <td className="td">
                                                            <div className="flex items-center h-full gap-2">
                                                                <button
                                                                    className="opacity-50"
                                                                    onClick={() => {
                                                                        setShowUpdateModal(true)
                                                                        setOperatingRole(role)
                                                                    }}
                                                                >
                                                                    <PencilSquareIcon width="20" height="20"/>
                                                                </button>
                                                                <button
                                                                    className="opacity-50"
                                                                    onClick={() => {
                                                                        setShowDeleteAlert(true)
                                                                        setOperatingRole(role)
                                                                    }}
                                                                >
                                                                    <TrashIcon width="20" height="20"/>
                                                                </button>
                                                            </div>
                                                        </td>
                                                        <td className="td">{role.name}</td>
                                                        <td className="td">{role.slug}</td>
                                                    </tr>
                                                ))
                                                : <tr>
                                                    <td colSpan={6}>There is no role.</td>
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
                <CreateRole
                    onDismiss={() => setShowCreateModal(false)}
                    onCreateRole={(newRole: RoleModel) => {
                        setRoles([...roles, newRole]);
                        setShowCreateModal(false);
                    }}
                />
            }
            {showUpdateModal &&
                <UpdateRole
                    role={operatingRole}
                    onDismiss={() => setShowUpdateModal(false)}
                    onCreateRole={(updatedRole: RoleModel) => {
                        setRoles(roles.map(existingRole => existingRole._id === updatedRole._id ? updatedRole : existingRole));
                        setShowUpdateModal(false);
                    }}
                />
            }
            {showDeleteAlert &&
                <ModalComponent
                    title="Confirm Delete"
                    content="Are you sure you want to delete this role?"
                    confirmButton={{
                        text: "Delete",
                        variant: "danger",
                        disabled: false
                    }}
                    onDismiss={() => setShowDeleteAlert(false)}
                    onConfirm={() => deleteRole()}
                />
            }
        </div>
    );
}

export default RolesIndex;