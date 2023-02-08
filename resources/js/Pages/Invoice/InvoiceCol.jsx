import React from "react";
import { Button } from "reactstrap";
import moment from "moment/moment";
import { Link } from "@inertiajs/react";

const formateDate = (date, format) => {
    const dateFormat = format ? format : "DD MMM Y";
    const date1 = moment(new Date(date)).format(dateFormat);
    return date1;
};
const toLowerCase1 = (str) => {
    return str === "" || str === undefined ? "" : str.toLowerCase();
};

const InvoiceID = (cell) => {
    return (
        cell.value ?
            <Link href={`/invoice/${cell.value}`} className="font-size-13 text-dark">{cell.value}
            </Link>
        : ""
    );
};

const Name = (cell) => {
    return cell.value ? cell.value : "";
};

const Total = (cell) => {
    return cell.value ? cell.value : "";
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
                <Button color="danger" outline className="btn-sm"
                    onClick={() => {
                        const invPay = cellProps.row.original;
                        setPayModal(true);}}
                    >
                    {" "}
                    <i className="bx bx-sad font-size-12 align-middle me-1"></i>
                    {cell.value}
                </Button>
        );
    }
};

const Period = (cell) => {
    return formateDate(cell.value, "MMM, Y");
};

const Coin = (cell) => {
    return cell.value ? cell.value : "";
};

export { InvoiceID, Name, Total, Status, Period };
