import Link from "next/link";
import { useTranslation } from "next-i18next";
import formatDateStrToUI from "../../../../helpers/date/formatDateStrToUI";
import FavouriteSolidIcon from "../../../../icons/FavouriteSolidIcon";
import GridIcon from "../../../../icons/GridIcon";

const SetsGridItem = (props) => {
    const { t } = useTranslation(["sets", "common"]);

    const createdAt = formatDateStrToUI(props.createdAt);
    const isFavourite = props.isFavourite && (
        <FavouriteSolidIcon className="w-6 h-6 text-yellow-500" />
    );
    const totalCards =
        props.total > 1
            ? `${props.total} ${t("cards")}`
            : `${props.total} ${t("card")}`;

    return (
        <Link href={`/sets/${props._id}`}>
            <div className="flex flex-col justify-between m-1 p-4 text-gray-600 bg-gray-100 rounded-md cursor-pointer hover:shadow">
                <div className="mb-4">
                    <div className="flex justify-between">
                        <p className="text-lg font-bold">{props.name}</p>
                        {isFavourite}
                    </div>
                    <p>{totalCards}</p>
                </div>
                <div className="text-sm">
                    <p className="flex items-center">
                        <GridIcon className="w-4 h-4 mr-1" />
                        {t("created")} {createdAt}
                    </p>
                </div>
            </div>
        </Link>
    );
};

export default SetsGridItem;
