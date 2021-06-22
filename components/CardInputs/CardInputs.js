import CardInput from "./CardInput/CardInput";

const CardInputs = (props) => {
    return (
        <div>
            {props.cards.map((card) => {
                return (
                    <CardInput
                        key={card.id}
                        id={card.id}
                        values={{ front: card.front, back: card.back }}
                        change={props.change}
                        delete={props.delete}
                    />
                );
            })}
        </div>
    );
};

export default CardInputs;
