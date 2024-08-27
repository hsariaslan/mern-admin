import {TailSpin} from "react-loader-spinner";

interface ButtonWithSpinnerProps {
    text: string,
    disabled: boolean,

    [x: string]: any
}

const ButtonWithSpinner = ({text, disabled, ...props}: ButtonWithSpinnerProps) => {
    return (
        <div>
            <button className="button-primary"
                    {...props}
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

export default ButtonWithSpinner;