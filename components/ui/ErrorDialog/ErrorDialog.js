import { useTranslation } from "next-i18next";

const ErrorDialog = (props) => {
    const { t } = useTranslation("common");

    return (
        <div className="flex justify-center mt-6">
            <p className="flex justify-center items-center w-full lg:w-1/2 p-3 text-gray-600 bg-red-100 rounded-lg">
                <span className="font-bold mr-2">{t("error")}:</span>
                {props.msg}
            </p>
        </div>
    );
};

export default ErrorDialog;
