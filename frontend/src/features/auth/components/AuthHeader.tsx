interface AuthHeaderProps {
    text: string,
    [x: string]: any
}

const AuthHeader = ({text, ...props}: AuthHeaderProps) => {
    return (
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
            <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
                {text}
            </h2>
        </div>
    );
}

export default AuthHeader;