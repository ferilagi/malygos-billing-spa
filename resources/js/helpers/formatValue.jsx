import moment from "moment/moment";


const formatDate = (date, format) => {
    const dateFormat = format ? format : "DD MMM Y";
    const date1 = moment(new Date(date)).format(dateFormat);
    return date1;
};

const currencyFormat = (num) => {
    return "IDR " + num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
};

const trunCate = (str, num) => {
    // return "IDR " + num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
    return str.length > num ? str.substring(0, num) + "..." : str;
};

const lowerCase = (str) => {
    return str === "" || str === undefined ? "" : str.toLowerCase();
};

const upperCase = (str) => {
    return str === "" || str === undefined ? "" : str.toUpperCase();
};

export {
    formatDate,
    currencyFormat,
    trunCate,
    lowerCase,
    upperCase
}
