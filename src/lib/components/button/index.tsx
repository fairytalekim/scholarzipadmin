function Main({
    text,
    onClick
}: {
    text: string,
    onClick: () => void
}) {
    return (
        <button onClick={onClick} className="h-fit flex-shrink-0 flex items-center py-3 px-5 rounded-xl bg-brand-500 w-fit hover:bg-brand-800 transition-colors duration">
            <div className="text-st-emph text-gray-white">{text}</div>
        </button>
    );
}

function Grow({
    text,
    onClick
}: {
    text: string,
    onClick: () => void
}) {
    return (
        <button onClick={onClick} className="flex-shrink-0 flex-grow flex items-center justify-center py-3 px-5 rounded-xl bg-brand-500 w-fit hover:bg-brand-800 transition-colors duration">
            <div className="text-st-emph text-gray-white">{text}</div>
        </button>
    );
}

function SubGrow({
    text,
    onClick
}: {
    text: string,
    onClick: () => void
}) {
    return (
        <button onClick={onClick} className="flex-shrink-0 flex-grow flex items-center justify-center py-3 px-5 rounded-xl bg-gray-200 w-fit hover:bg-gray-500 transition-colors duration">
            <div className="text-st-emph text-gray-800">{text}</div>
        </button>
    );
}

function SubFit({
    text,
    onClick
}: {
    text: string,
    onClick: () => void
}) {
    return (
        <button onClick={onClick} className="flex-shrink-0 w-fit flex items-center justify-center py-3 px-5 rounded-xl bg-gray-200 w-fit hover:bg-gray-500 transition-colors duration">
            <div className="text-st-emph text-gray-800">{text}</div>
        </button>
    );
}

function Fill({
    text,
    onClick
}: {
    text: string,
    onClick: () => void
}) {
    return (
        <button onClick={onClick} className="flex-shrink-0 w-full flex items-center justify-center py-3 px-5 rounded-xl bg-brand-500 w-fit hover:bg-brand-800 transition-colors duration">
            <div className="text-st-emph text-gray-white">{text}</div>
        </button>
    );
}

function SubFill({
    text,
    onClick
}: {
    text: string,
    onClick: () => void
}) {
    return (
        <button onClick={onClick} className="flex-shrink-0 w-full flex items-center justify-center py-3 px-5 rounded-xl bg-gray-200 w-fit hover:bg-gray-500 transition-colors duration">
            <div className="text-st-emph text-gray-800">{text}</div>
        </button>
    );
}

const Button = {
    Main,
    Fill,
    SubFill,
    SubFit,
    Grow,
    SubGrow
}

export default Button