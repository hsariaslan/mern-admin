import {useEffect, useState} from "react";
import {useDispatch} from "react-redux";
import {Link, NavigateFunction, useNavigate} from "react-router-dom";
import {useForm} from "react-hook-form";
import {AppDispatch} from "../../app/store";
import {login} from './authSlice';
import {ILogin} from "./interfaces/ILogin";
import {IUser} from "../common/interfaces/IUser";
import * as AuthApi from "../../services/authApi";
import {UnauthorizedError} from "../../errors/httpErrors";
import Alert from "../../components/Alert";
import AuthTextInput from "./components/AuthTextInput";
import AuthButton from "./components/AuthButton";
import AuthHeader from "./components/AuthHeader";

const Login = () => {
    const isAuthenticated: boolean = !!localStorage.getItem("mernUser");
    const navigate: NavigateFunction = useNavigate();

    useEffect((): void => {
        if (isAuthenticated) {
            navigate("/");
        }
    }, []);

    const dispatch: AppDispatch = useDispatch();
    const [errorText, setErrorText] = useState<string | null>(null);

    const {
        register,
        handleSubmit,
        formState: {
            errors,
            isSubmitting,
        }
    } = useForm<ILogin>();

    async function onSubmit(input: ILogin): Promise<void> {
        try {
            setErrorText(null);
            await new Promise(r => setTimeout(r, 1000)); // just to see loading spin on button
            const loggedInUser: IUser = await AuthApi.login(input);
            dispatch(login(loggedInUser));
            localStorage.setItem("mernUser", JSON.stringify({
                username: loggedInUser.username,
                email: loggedInUser.email,
                roles: loggedInUser.roles,
                permissions: loggedInUser.permissions,
            }));
            navigate("/");
        } catch (error) {
            if (error instanceof UnauthorizedError) {
                setErrorText(error.message);
            }

            console.log(error);
        }
    }

    return (
        <div className="bg-stone-100">
            <div className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
                <AuthHeader text="Login to your account"/>
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
                            name="password"
                            type="password"
                            label="Password"
                            register={register}
                            registerOptions={{required: "Required"}}
                            error={errors.password}
                        />
                        <AuthButton text="Login" type="submit" disabled={isSubmitting} />
                        {errorText && !isSubmitting &&
                            <Alert type="error" text={errorText} />
                        }
                    </form>
                </div>
                <p className="mt-10 text-center text-sm text-gray-500">
                    Not a member?
                    <Link to="/sign-up"
                          className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500 ml-1">
                        Sign Up
                    </Link>
                </p>
            </div>
        </div>
    );
}

export default Login;