import {useState} from "react";
import {Link, useNavigate} from "react-router-dom";
import {useForm} from "react-hook-form";
import {ISignUp} from "./interfaces/ISignUp";
import * as AuthApi from "../../services/authApi";
import {IUser} from "../common/interfaces/IUser";
import {BadRequestError, ConflictError, UnauthorizedError} from "../../errors/httpErrors";
import AuthTextInput from "./components/AuthTextInput";
import AuthButton from "./components/AuthButton";
import AuthHeader from "./components/AuthHeader";
import Alert from "../../components/Alert";

const SignUp = () => {
    const [errorText, setErrorText] = useState<string | null>(null);
    const navigate = useNavigate();

    const {
        register,
        handleSubmit,
        formState: {
            errors,
            isSubmitting,
        }
    } = useForm<ISignUp>();

    async function onSubmit(input: ISignUp): Promise<void> {
        try {
            await new Promise(r => setTimeout(r, 1000));
            setErrorText(null);
            const response: IUser = await AuthApi.signUp(input);
            navigate("/");
        } catch (error) {
            if (error instanceof BadRequestError || error instanceof UnauthorizedError || error instanceof ConflictError) {
                setErrorText(error.message);
            }

            console.log(error);
        }
    }

    return (
        <div>
            <div className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
                <AuthHeader text="Sign up to MERN Admin"/>
                <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm bg-white p-8 rounded-lg shadow-md">
                    <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
                        <AuthTextInput
                            name="username"
                            type="text"
                            label="Username"
                            register={register}
                            registerOptions={{required: "Required"}}
                            error={errors.username}
                        />
                        <AuthTextInput
                            name="email"
                            type="email"
                            label="Email address"
                            register={register}
                            registerOptions={{required: "Required"}}
                            error={errors.email}
                        />
                        <AuthTextInput
                            name="password"
                            type="password"
                            label="Password"
                            register={register}
                            registerOptions={{required: "Required"}}
                            error={errors.password}
                        />
                        <AuthTextInput
                            name="confirm_password"
                            type="password"
                            label="Confirm Password"
                            register={register}
                            registerOptions={{required: "Required"}}
                            error={errors.confirm_password}
                        />
                        <AuthButton text="Sign Up" type="submit" disabled={isSubmitting}/>
                        {errorText && !isSubmitting &&
                            <Alert type="error" text={errorText} />
                        }
                    </form>
                </div>
                <p className="mt-10 text-center text-sm text-gray-500">
                Already have an account?
                    <Link to="/login"
                          className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500 ml-1">
                        Login
                    </Link>
                </p>
            </div>
        </div>
    );
}

export default SignUp;