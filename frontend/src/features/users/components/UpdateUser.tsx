import {useState} from "react";
import {useForm} from "react-hook-form";
import {Alert, Form} from "react-bootstrap";
import {BadRequestError, ConflictError, UnauthorizedError} from "../../../errors/httpErrors";
import * as UsersApi from "../../../services/usersApi";
import UserModel from "../User";
import ModalComponent from "../../../components/Modal";
import TextInputField from "../../../components/TextInputField";
import MultiSelect from "../../../components/MultiSelect";

interface UpdateUserProps {
    user: UserModel | null;
    onDismiss: () => void;
    onCreateUser: (user: UserModel) => void;
}

const UpdateUser = ({user, onDismiss, onCreateUser}: UpdateUserProps) => {
    const [errorText, setErrorText] = useState<string | null>(null);
    const {
        register,
        handleSubmit,
        formState: {
            errors,
            isSubmitting,
        }
    } = useForm<UserModel>({
        defaultValues: {
            username: user?.username || "",
            email: user?.email || ""
        },
    });

    async function updateUser(input: UserModel): Promise<void> {
        try {
            const username: string = user?.username as string;
            const newUser: UserModel = await UsersApi.update(username, input);
            onCreateUser(newUser);
        } catch (error) {
            if (error instanceof BadRequestError || error instanceof UnauthorizedError || error instanceof ConflictError) {
                setErrorText(error.message);
            }
            console.log(error);
        }
    }

    return (
        <ModalComponent
            title="Update User"
            confirmButton={{
                text: "Update",
                variant: "primary",
                form: "updateUserForm",
                disabled: isSubmitting,
                type: "submit",
                isbuttonwithspinner: "true",
            }}
            onDismiss={onDismiss}
            onConfirm={() => {}}
        >
            <Form id="updateUserForm" onSubmit={handleSubmit(updateUser)}>
                <TextInputField
                    name="username"
                    label="Username"
                    register={register}
                    registerOptions={{required: "Required"}}
                    error={errors.username}
                    type="text"
                />
                <TextInputField
                    name="email"
                    label="Email"
                    register={register}
                    registerOptions={{required: "Required"}}
                    error={errors.email}
                    type="text"
                />
                <TextInputField
                    name="password"
                    label="Password"
                    register={register}
                    registerOptions={{required: "Required"}}
                    error={errors.password}
                    type="password"
                />
                <TextInputField
                    name="confirm_password"
                    label="Confirm Password"
                    register={register}
                    registerOptions={{required: "Required"}}
                    error={errors.confirm_password}
                    type="password"
                />
                {errorText &&
                    <Alert variant="danger">{errorText}</Alert>
                }
            </Form>
        </ModalComponent>
    );
}

export default UpdateUser;