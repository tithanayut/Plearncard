const CardInput = (props) => {
    return (
        <div className="my-2 flex">
            <input
                type="text"
                className="outline-none mx-1 h-8 w-full border-b-2 border-gray-400 lg:mx-3 lg:w-60"
                defaultValue={props.values.front}
                onChange={(event) => {
                    props.change(props.id, { front: event.target.value });
                }}
            />
            <input
                type="text"
                className="outline-none mx-1 h-8 w-full border-b-2 border-gray-400 lg:mx-3 lg:w-60"
                defaultValue={props.values.back}
                onChange={(event) => {
                    props.change(props.id, { back: event.target.value });
                }}
            />
            <div
                className="ml-8 flex h-8 cursor-pointer items-center justify-center rounded-lg bg-red-200 px-2 font-bold text-gray-600 hover:bg-red-300 hover:shadow-sm"
                onClick={() => {
                    props.delete(props.id);
                }}
            >
                <svg
                    className="h-5 w-5"
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
