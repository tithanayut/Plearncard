import { useTranslation } from "next-i18next";

const ErrorDialog = (props) => {
    const { t } = useTranslation("common");

    return (
        <div className="mt-6 flex justify-center">
            <p className="flex w-full items-center justify-center rounded-lg bg-red-100 p-3 text-gray-600 lg:w-1/2">
                <span className="mr-2 font-bold">{t("error")}:</span>
                {props.msg}
            </p>
        </div>
    );
};

export default ErrorDialog;
