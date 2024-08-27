import {useState} from "react";
import {useForm} from "react-hook-form";
import {Alert, Form} from "react-bootstrap";
import {BadRequestError, ConflictError, UnauthorizedError} from "../../../errors/httpErrors";
import * as UsersApi from "../../../services/usersApi";
import UserModel from "../User";
import ModalComponent from "../../../components/Modal";
import TextInputField from "../../../components/TextInputField";
import MultiSelect from "../../../components/MultiSelect";

interface CreateUserProps {
    onDismiss: () => void;
    onCreateUser: (user: UserModel) => void;
}

const CreateUser = ({onDismiss, onCreateUser}: CreateUserProps) => {
    const [errorText, setErrorText] = useState<string | null>(null);
    const {
        register,
        handleSubmit,
        formState: {
            errors,
            isSubmitting,
        }
    } = useForm<UserModel>();

    async function createUser(input: UserModel): Promise<void> {
        try {
            const newUser: UserModel = await UsersApi.create(input);
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
            title="Create User"
            confirmButton={{
                text: "Create",
                variant: "primary",
                form: "createUserForm",
                disabled: isSubmitting,
                type: "submit",
                isButtonWithSpinner: true,
            }}
            onDismiss={onDismiss}
            onConfirm={() => {}}
        >
            <Form id="createUserForm" onSubmit={handleSubmit(createUser)}>
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

export default CreateUser;