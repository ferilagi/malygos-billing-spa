import React from "react";
import { Head, Link } from "@inertiajs/react";
import { size, map } from "lodash";
import moment from "moment/moment";

const formateDate = (date, format) => {
    const dateFormat = format ? format : "DD MMM Y";
    const date1 = moment(new Date(date)).format(dateFormat);
    return date1;
};
const toLowerCase1 = (str) => {
    return str === "" || str === undefined ? "" : str.toLowerCase();
};

const Name = (cell) => {
    return cell.value ? <strong>{cell.value}</strong> : "";
};

const Email = (cell) => {
    return cell.value ? cell.value : "";
};

const Status = (cell) => {
    if (cell.value == "active") {
        return (
            <Link
                href="#"
                className="badge badge-soft-success font-size-11 m-1"
            >
                {cell.value}
            </Link>
        );
    } else {
        return (
            <Link href="#" className="badge badge-soft-danger font-size-11 m-1">
                {cell.value}
            </Link>
        );
    }
};

const Tags = (cell) => {
    return (
        <>
            {map(
                cell.value,
                (tag, index) =>
                    index < 2 && (
                        <Link
                            href="#"
                            className="badge badge-soft-primary font-size-11 m-1"
                            key={"_skill_" + cell.value + index}
                        >
                            {tag}
                        </Link>
                    )
            )}
            {size(cell.value) > 2 && (
                <Link
                    href="#"
                    className="badge badge-soft-primary font-size-11 m-1"
                    key={"_skill_" + cell.value}
                >
                    {size(cell.value) - 1} + more
                </Link>
            )}
        </>
    );
};

const Projects = (cell) => {
    return cell.value ? cell.value : "";
};

const Img = (cell) => {
    return (
        <>
            {!cell.value ? (
                <div className="avatar-xs">
                    <span className="avatar-title rounded-circle">
                        {cell.data[0].name.charAt(0)}
                    </span>
                </div>
            ) : (
                <div>
                    <img
                        className="rounded-circle avatar-xs"
                        src={cell.value}
                        alt=""
                    />
                </div>
            )}
        </>
    );
};

export { Name, Email, Status, Tags, Projects, Img };
