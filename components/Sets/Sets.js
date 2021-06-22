import Set from "./Set/Set";

const Sets = (props) => {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 mt-2">
            {props.sets.map((set) => {
                return (
                    <Set
                        key={set.slug}
                        slug={set.slug}
                        name={set.name}
                        total={set.total}
                        createdAt={set.createdAt}
                    />
                );
            })}
        </div>
    );
};

export default Sets;
