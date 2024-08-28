import {useState} from "react";
import {useForm} from "react-hook-form";
import {Alert, Form} from "react-bootstrap";
import {BadRequestError, ConflictError, UnauthorizedError} from "../../../errors/httpErrors";
import * as PermissionsApi from "../../../services/permissionsApi";
import PermissionModel from "../Permission";
import ModalComponent from "../../../components/Modal";
import TextInputField from "../../../components/TextInputField";

interface UpdatePermissionProps {
    permission: PermissionModel | null;
    onDismiss: () => void;
    onCreatePermission: (permission: PermissionModel) => void;
}

const UpdatePermission = ({permission, onDismiss, onCreatePermission}: UpdatePermissionProps) => {
    const [errorText, setErrorText] = useState<string | null>(null);
    const {
        register,
        handleSubmit,
        formState: {
            errors,
            isSubmitting,
        }
    } = useForm<PermissionModel>({
        defaultValues: {
            name: permission?.name || "",
            slug: permission?.slug || ""
        },
    });

    async function updatePermission(input: PermissionModel): Promise<void> {
        try {
            const slug: string = permission?.slug as string;
            const newPermission: PermissionModel = await PermissionsApi.update(slug, input);
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
            title="Update Permission"
            confirmButton={{
                text: "Update",
                variant: "primary",
                form: "updatePermissionForm",
                disabled: isSubmitting,
                type: "submit",
                isbuttonwithspinner: "true",
            }}
            onDismiss={onDismiss}
            onConfirm={() => {}}
        >
            <Form id="updatePermissionForm" onSubmit={handleSubmit(updatePermission)}>
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

export default UpdatePermission;