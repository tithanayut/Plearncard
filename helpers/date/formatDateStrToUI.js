// Format date string to 'XX-Mon-YYYY'

const MONTHNAMES = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
];

const formatDateStrToUI = (date) => {
    const dateObject = new Date(date);

    return `${dateObject.getDate()} ${
        MONTHNAMES[dateObject.getMonth()]
    } ${dateObject.getFullYear()}`;
};

export default formatDateStrToUI;
