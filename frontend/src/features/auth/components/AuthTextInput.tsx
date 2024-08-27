import {RegisterOptions, UseFormRegister} from "react-hook-form";

interface AuthTextInputProps {
    name: string,
    label: string,
    type: string,
    register: UseFormRegister<any>,
    registerOptions?: RegisterOptions,
    [x: string]: any
}

const AuthTextInput = ({name, label, type, register, registerOptions, ...props}: AuthTextInputProps) => {
    return (
        <div>
            <label className="block text-sm font-medium leading-6 text-gray-900">{label}</label>
            <div className="mt-2">
                <input id={name} type={type} autoComplete={name} required
                       className="block w-full rounded-md border-1 py-1.5 px-1.5 text-gray-900 shadow-sm ring-1
                                       ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset
                                       focus:ring-indigo-600 sm:text-sm sm:leading-6"
                       {...register(name, registerOptions)}
                       {...props}
                />
            </div>
        </div>
    );
}

export default AuthTextInput;