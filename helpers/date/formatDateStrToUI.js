// Format date string to 'XX-Mon-YYYY'

const MONTHNAMES = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
];

const formatDateStrToUI = (date) => {
    const dateObject = new Date(date);

    return `${dateObject.getDate()} ${
        MONTHNAMES[dateObject.getMonth()]
    } ${dateObject.getFullYear()}`;
};

export default formatDateStrToUI;
