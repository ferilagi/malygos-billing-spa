
import React from "react";
import moment from "moment/moment";
import { Button } from "reactstrap";

const formateDate = (date, format) => {
    const dateFormat = format ? format : "DD MMM Y";
    const date1 = moment(new Date(date)).format(dateFormat);
    return date1;
};

const currencyFormat = (num) => {
    return "IDR " + num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
};

const toLowerCase1 = (str) => {
    return str === "" || str === undefined ? "" : str.toLowerCase();
};

const InvoiceID = (cell) => {
    return cell.value ? cell.value : "";
};

const Name = (cell) => {
    return cell.value ? cell.value : "";
};

const Alias = (cell) => {
    return cell.value ? cell.value : "";
};

const Total = (cell) => {
    return cell.value ? currencyFormat(cell.value) : "";
};

const Status = (cell) => {
    if (cell.value == "paid") {
        return (
            <Button color="success" outline className="btn-sm">
                {" "}
                <i className="bx bx-check-double font-size-12 align-middle me-2"></i>
                {cell.value}
            </Button>
        );
    } else {
        return (
            <Button color="danger" outline className="btn-sm">
                {" "}
                <i className="bx bx-sad font-size-12 align-middle me-1"></i>
                {cell.value}
            </Button>
        );
    }
};

const Period = (cell) => {
    return formateDate(cell.value, "MMMM, Y");
};

const Coin = (cell) => {
    return cell.value ? cell.value : "";
};

export { InvoiceID, Name, Alias, Total, Status, Period };
