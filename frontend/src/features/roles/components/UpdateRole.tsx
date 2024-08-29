import {useState} from "react";
import {useForm} from "react-hook-form";
import {Alert, Form} from "react-bootstrap";
import {BadRequestError, ConflictError, UnauthorizedError} from "../../../errors/httpErrors";
import * as RolesApi from "../../../services/rolesApi";
import RoleModel from "../Role";
import ModalComponent from "../../../components/Modal";
import TextInputField from "../../../components/TextInputField";

interface UpdateRoleProps {
    role: RoleModel | null;
    onDismiss: () => void;
    onCreateRole: (role: RoleModel) => void;
}

const UpdateRole = ({role, onDismiss, onCreateRole}: UpdateRoleProps) => {
    const [errorText, setErrorText] = useState<string | null>(null);
    const {
        register,
        handleSubmit,
        formState: {
            errors,
            isSubmitting,
        }
    } = useForm<RoleModel>({
        defaultValues: {
            name: role?.name || "",
            slug: role?.slug || ""
        },
    });

    async function updateRole(input: RoleModel): Promise<void> {
        try {
            const slug: string = role?.slug as string;
            const newRole: RoleModel = await RolesApi.update(slug, input);
            onCreateRole(newRole);
        } catch (error) {
            if (error instanceof BadRequestError || error instanceof UnauthorizedError || error instanceof ConflictError) {
                setErrorText(error.message);
            }
            console.log(error);
        }
    }

    return (
        <ModalComponent
            title="Update Role"
            confirmButton={{
                text: "Update",
                variant: "primary",
                form: "updateRoleForm",
                disabled: isSubmitting,
                type: "submit",
                isbuttonwithspinner: "true",
            }}
            onDismiss={onDismiss}
            onConfirm={() => {}}
        >
            <Form id="updateRoleForm" onSubmit={handleSubmit(updateRole)}>
                <TextInputField
                    name="name"
                    label="Role Name"
                    register={register}
                    registerOptions={{required: "Required"}}
                    error={errors.name}
                    type="text"
                />
                <TextInputField
                    name="slug"
                    label="Slug"
                    register={register}
                    registerOptions={{required: "Required"}}
                    error={errors.slug}
                    type="text"
                />
                {errorText &&
                    <Alert variant="danger">{errorText}</Alert>
                }
            </Form>
        </ModalComponent>
    );
}

export default UpdateRole;