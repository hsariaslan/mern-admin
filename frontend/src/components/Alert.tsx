interface AlertProps {
    type: string,
    text: string,
    [x: string]: any
}

const Alert = ({type, text}: AlertProps) => {
    return (
        <div className="flex bg-red-100 text-red-800 py-2 px-3 rounded-lg">
            {text}
        </div>
    );
}

export default Alert;