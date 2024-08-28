import {useEffect, useState} from "react";
import {TailSpin} from "react-loader-spinner";
import {PencilSquareIcon, TrashIcon} from '@heroicons/react/16/solid';
import * as PermissionsApi from "../../services/permissionsApi";
import PermissionModel from "./Permission";
import Header from "../../components/Header";
import ModalComponent from "../../components/Modal";
import CreatePermission from "./components/CreatePermission";
import UpdatePermission from "./components/UpdatePermission";

const PermissionsIndex = () => {
    const [permissions, setPermissions] = useState<PermissionModel[]>([]);
    const [showLoading, setShowLoading] = useState(false);
    const [showLoadingError, setShowLoadingError] = useState(false);
    const [showCreateModal, setShowCreateModal] = useState(false);
    const [showUpdateModal, setShowUpdateModal] = useState(false);
    const [showDeleteAlert, setShowDeleteAlert] = useState(false);
    const [operatingPermission, setOperatingPermission] = useState<PermissionModel | null>(null);

    useEffect(() => {
        async function getPermissions(): Promise<void> {
            try {
                setShowLoading(true);
                setShowLoadingError(false);
                const permissions: PermissionModel[] = await PermissionsApi.index();
                setPermissions(permissions);
            } catch (error) {
                console.log(error);
                setShowLoadingError(true);
                setShowLoading(false);
            } finally {
                setShowLoading(false);
            }
        }

        getPermissions();
    }, []);

    async function deletePermission(): Promise<void> {
        if (operatingPermission) {
            try {
                await PermissionsApi.deletePermission(operatingPermission.slug);
                setPermissions(permissions.filter((existingPermission: PermissionModel): boolean => existingPermission._id !== operatingPermission._id));
            } catch (error) {
                console.log(error);
            }
        }

        setOperatingPermission(null);
        setShowDeleteAlert(false);
    }

    return (
        <div>
            <Header currentPage="permissions"></Header>
            <main>
                <div className="mx-auto max-w-7xl px-4 pt-6 sm:px-6 lg:px-8">
                    <button className="button-primary w-auto" onClick={() => setShowCreateModal(true)}>Create Permission</button>
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
                                        <th scope="col" className="th">Permission</th>
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
                                            {permissions.length > 0 ?
                                                permissions.map((permission: PermissionModel, index) => (
                                                    <tr key={permission._id}
                                                        className="border-b transition duration-300 ease-in-out hover:bg-stone-200 dark:border-neutral-500 dark:hover:bg-neutral-600">
                                                        <td className="td font-medium">{index + 1}</td>
                                                        <td className="td">
                                                            <div className="flex items-center h-full gap-2">
                                                                <button
                                                                    className="opacity-50"
                                                                    onClick={() => {
                                                                        setShowUpdateModal(true)
                                                                        setOperatingPermission(permission)
                                                                    }}
                                                                >
                                                                    <PencilSquareIcon width="20" height="20"/>
                                                                </button>
                                                                <button
                                                                    className="opacity-50"
                                                                    onClick={() => {
                                                                        setShowDeleteAlert(true)
                                                                        setOperatingPermission(permission)
                                                                    }}
                                                                >
                                                                    <TrashIcon width="20" height="20"/>
                                                                </button>
                                                            </div>
                                                        </td>
                                                        <td className="td">{permission.name}</td>
                                                        <td className="td">{permission.slug}</td>
                                                    </tr>
                                                ))
                                                : <tr>
                                                    <td colSpan={6}>There is no permission.</td>
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
                <CreatePermission
                    onDismiss={() => setShowCreateModal(false)}
                    onCreatePermission={(newPermission: PermissionModel) => {
                        setPermissions([...permissions, newPermission]);
                        setShowCreateModal(false);
                    }}
                />
            }
            {showUpdateModal &&
                <UpdatePermission
                    permission={operatingPermission}
                    onDismiss={() => setShowUpdateModal(false)}
                    onCreatePermission={(updatedPermission: PermissionModel) => {
                        setPermissions(permissions.map(existingPermission => existingPermission._id === updatedPermission._id ? updatedPermission : existingPermission));
                        setShowUpdateModal(false);
                    }}
                />
            }
            {showDeleteAlert &&
                <ModalComponent
                    title="Confirm Delete"
                    content="Are you sure you want to delete this permission?"
                    confirmButton={{
                        text: "Delete",
                        variant: "danger",
                        disabled: false
                    }}
                    onDismiss={() => setShowDeleteAlert(false)}
                    onConfirm={() => deletePermission()}
                />
            }
        </div>
    );
}

export default PermissionsIndex;