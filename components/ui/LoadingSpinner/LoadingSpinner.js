import { useTranslation } from "next-i18next";
import style from "./LoadingSpinner.module.css";

const LoadingSpinner = () => {
    const { t } = useTranslation("common");

    return <div className={style.loader}>{t("loading")}...</div>;
};

export default LoadingSpinner;
