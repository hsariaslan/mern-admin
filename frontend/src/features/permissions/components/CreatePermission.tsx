import {useState} from "react";
import {useForm} from "react-hook-form";
import {Alert, Form} from "react-bootstrap";
import {BadRequestError, ConflictError, UnauthorizedError} from "../../../errors/httpErrors";
import * as PermissionsApi from "../../../services/permissionsApi";
import PermissionModel from "../Permission";
import ModalComponent from "../../../components/Modal";
import TextInputField from "../../../components/TextInputField";

interface CreatePermissionProps {
    onDismiss: () => void;
    onCreatePermission: (permission: PermissionModel) => void;
}

const CreatePermission = ({onDismiss, onCreatePermission}: CreatePermissionProps) => {
    const [errorText, setErrorText] = useState<string | null>(null);
    const {
        register,
        handleSubmit,
        formState: {
            errors,
            isSubmitting,
        }
    } = useForm<PermissionModel>();

    async function createPermission(input: PermissionModel): Promise<void> {
        try {
            const newPermission: PermissionModel = await PermissionsApi.create(input);
            onCreatePermission(newPermission);
        } catch (error) {
            if (error instanceof BadRequestError || error instanceof UnauthorizedError || error instanceof ConflictError) {
                setErrorText(error.message);
            }
            console.log(error);
        }
    }

    return (
        <ModalComponent
            title="Create Permission"
            confirmButton={{
                text: "Create",
                variant: "primary",
                form: "createPermissionForm",
                disabled: isSubmitting,
                type: "submit",
                isbuttonwithspinner: "true",
            }}
            onDismiss={onDismiss}
            onConfirm={() => {}}
        >
            <Form id="createPermissionForm" onSubmit={handleSubmit(createPermission)}>
                <TextInputField
                    name="name"
                    label="Permission Name"
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

export default CreatePermission;