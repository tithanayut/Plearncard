import Set from "./Set/Set";

const Sets = (props) => {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 mt-2">
            {props.sets.map((set) => {
                return (
                    <Set
                        key={set._id}
                        _id={set._id}
                        name={set.name}
                        total={set.total}
                        createdAt={set.createdAt}
                        isFavourite={set.isFavourite}
                    />
                );
            })}
        </div>
    );
};

export default Sets;
