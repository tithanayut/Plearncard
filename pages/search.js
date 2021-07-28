import { useState, useCallback, useEffect } from "react";
import RequireAuth from "../helpers/auth/RequireAuth";
import Sets from "../components/Sets/Sets";
import LoadingSpinner from "../components/ui/LoadingSpinner/LoadingSpinner";

const SearchPage = () => {
    const [initialSets, setinitialSets] = useState(null);
    const [totalSet, settotalSet] = useState(0);
    const [content, setContent] = useState(null);
    const loadSets = useCallback(async () => {
        const res = await fetch("/api/sets");
        const data = await res.json();

        if (data.errors) {
            setContent(
                <div className="flex justify-center mt-6">
                    <p className="flex justify-center items-center w-full lg:w-1/2 px-3 py-3 text-gray-600 bg-red-100 rounded-lg">
                        <span className="font-bold mr-2">Error:</span>
                        {data.errors.join(", ")}
                    </p>
                </div>
            );
            return;
        }

        setinitialSets(data);
    }, [setinitialSets, setContent]);
    useEffect(loadSets, [loadSets]);

    const searchHandler = (event) => {
        const query = event.target.value;
        if (!query) {
            settotalSet(0);
            setContent(null);
            return;
        }

        const data = initialSets.filter((set) =>
            set.name.match(new RegExp(query, "i"))
        );
        settotalSet(data.length);

        if (data.length === 0) {
            setContent(
                <div className="flex justify-center mt-6">
                    <p className="flex justify-center items-center w-full lg:w-1/2 px-3 py-3 text-gray-600 bg-green-100 rounded-lg">
                        <span className="font-bold mr-2">Not Found</span>
                    </p>
                </div>
            );
            return;
        }

        setContent(
            <div>
                <Sets sets={data} />
            </div>
        );
    };

    return (
        <RequireAuth>
            <div className="w-5/6 lg:w-2/3 mt-8 mx-auto ">
                <p className="text-2xl text-green-600 font-bold">Search</p>

                <form
                    className="mt-6 text-gray-600"
                    onSubmit={(e) => {
                        e.preventDefault();
                    }}
                >
                    {initialSets ? (
                        <div className="my-2">
                            <label className="font-bold" htmlFor="topic">
                                Topic
                            </label>
                            <input
                                className="w-full lg:w-96 h-8 lg:mx-3 border-b-2 outline-none border-gray-400"
                                type="text"
                                id="topic"
                                onChange={searchHandler}
                            ></input>
                        </div>
                    ) : (
                        !content && <LoadingSpinner />
                    )}
                </form>

                {initialSets &&
                    content &&
                    (totalSet > 1 ? (
                        <p className="mt-8">{`Found ${totalSet} sets match with your search`}</p>
                    ) : (
                        <p className="mt-8">{`Found ${totalSet} set match with your search`}</p>
                    ))}

                {content}
            </div>
        </RequireAuth>
    );
};

export default SearchPage;
