import {useState} from "react";
import {useForm} from "react-hook-form";
import {Alert, Form} from "react-bootstrap";
import {BadRequestError, ConflictError, UnauthorizedError} from "../../../errors/httpErrors";
import * as RolesApi from "../../../services/rolesApi";
import RoleModel from "../Role";
import ModalComponent from "../../../components/Modal";
import TextInputField from "../../../components/TextInputField";
import MultiSelect from "../../../components/MultiSelect";

interface CreateRoleProps {
    onDismiss: () => void;
    onCreateRole: (role: RoleModel) => void;
}

const CreateRole = ({onDismiss, onCreateRole}: CreateRoleProps) => {
    const [errorText, setErrorText] = useState<string | null>(null);
    const {
        register,
        handleSubmit,
        formState: {
            errors,
            isSubmitting,
        }
    } = useForm<RoleModel>();

    async function createRole(input: RoleModel): Promise<void> {
        try {
            const newRole: RoleModel = await RolesApi.create(input);
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
            title="Create Role"
            confirmButton={{
                text: "Create",
                variant: "primary",
                form: "createRoleForm",
                disabled: isSubmitting,
                type: "submit",
                isbuttonwithspinner: "true",
            }}
            onDismiss={onDismiss}
            onConfirm={() => {}}
        >
            <Form id="createRoleForm" onSubmit={handleSubmit(createRole)}>
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

export default CreateRole;