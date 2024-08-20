import {TailSpin} from "react-loader-spinner";

interface AuthButtonProps {
    text: string,
    disabled: boolean,

    [x: string]: any
}

const AuthButton = ({text, disabled, ...props}: AuthButtonProps) => {
    return (
        <div>
            <button className="flex w-full justify-center items-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm
                            font-semibold leading-6 text-white shadow-sm enabled:hover:bg-indigo-500 focus-visible:outline
                            focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600
                            disabled:disabled:opacity-50"
                    disabled={disabled}
            >
                <span className="block mr-1 -ml-5 w-4 h-4">
                    {disabled &&
                        <TailSpin
                            height="16"
                            width="16"
                            color="white"
                        />
                    }
                </span>
                {text}
            </button>
        </div>
    );
}

export default AuthButton;