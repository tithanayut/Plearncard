const CardInput = (props) => {
    return (
        <div className="flex my-2">
            <input
                type="text"
                className="w-full lg:w-60 h-8 mx-1 lg:mx-3 border-b-2 outline-none border-gray-400"
                defaultValue={props.values.front}
                onChange={(event) => {
                    props.change(props.id, { front: event.target.value });
                }}
            />
            <input
                type="text"
                className="w-full lg:w-60 h-8 mx-1 lg:mx-3 border-b-2 outline-none border-gray-400"
                defaultValue={props.values.back}
                onChange={(event) => {
                    props.change(props.id, { back: event.target.value });
                }}
            />
            <div
                className="flex justify-center items-center ml-8 px-2 h-8 font-bold bg-red-200 text-gray-600 rounded-lg cursor-pointer hover:bg-red-300 hover:shadow-sm"
                onClick={() => {
                    props.delete(props.id);
                }}
            >
                <svg
                    className="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                    />
                </svg>
            </div>
        </div>
    );
};

export default CardInput;
