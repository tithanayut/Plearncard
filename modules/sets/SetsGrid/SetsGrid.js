import SetsGridItem from "./SetsGridItem/SetsGridItem";

const SetsGrid = (props) => {
    return (
        <div className="mt-2 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
            {props.sets.map((set) => {
                return <SetsGridItem key={set._id} {...set} />;
            })}
        </div>
    );
};

export default SetsGrid;
