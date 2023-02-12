import React from "react";
import { Link } from "@inertiajs/react";
import { Card, CardBody, Col, Row } from "reactstrap";
import { Alignment } from "react-data-table-component";

const UserList = (props) => {
    const users = props.data;

    const activeBtn = (ele) => {
        if (ele.closest("button").classList.contains("active")) {
            ele.closest("button").classList.remove("active");
        } else {
            ele.closest("button").classList.add("active");
        }
    };
    return (
        <>
            {/* {filters.map(({ id, name, phone, address, joined_at}))} */}
            <Row>
                {(users || []).map((user) => (
                    <Col xl={3} key={user.id}>
                        <Card>
                            <CardBody>
                                <div className="d-flex align-start mb-3">
                                    <div className="flex-grow-1">
                                        <span
                                            className={
                                                user.level === "admin"
                                                    ? "badge badge-soft-success"
                                                    : user.level === "owner"
                                                    ? "badge badge-soft-info"
                                                    : user.level === "operator"
                                                    ? "badge badge-soft-danger"
                                                    : "badge badge-soft-warning"
                                            }
                                        >
                                            {user.level}
                                        </span>
                                    </div>
                                    <button
                                        type="button"
                                        className="btn btn-light btn-sm like-btn"
                                        onClick={(e) => activeBtn(e.target)}
                                    >
                                        <i className="bx bx-heart"></i>
                                    </button>
                                </div>
                                <div className="text-center mb-3">
                                    {user.avatar ? (
                                        <img
                                            className="avatar-sm rounded-circle"
                                            src={user.avatar}
                                            alt="Header Avatar"
                                        />
                                    ): (
                                        <div
                                            className="avatar-sm mx-auto">
                                            <span className="avatar-title rounded-circle">
                                            {user.name.charAt(0)}
                                            </span>
                                        </div>
                                     )}
                                    <h6 className="font-size-15 mt-3 mb-1">
                                        {user.name}
                                    </h6>
                                    <p className="mb-0 text-muted">
                                        {user.level}
                                    </p>
                                </div>
                                <div className="d-flex mb-3 justify-content-center gap-2 text-muted">
                                    <div>
                                        <i className="bx bx-map align-middle text-primary"></i>{" "}
                                        {user.phone}
                                    </div>
                                    <p className="mb-0 text-center">
                                        <i className="bx bx-money align-middle text-primary"></i>{" "}
                                        {user.customer} Customer
                                    </p>
                                </div>
                                {/* <div className="hstack gap-2 justify-content-center">
                                {(user.skills || []).map((subItem , key) => (
                                <span key={key} className="badge badge-soft-secondary">{subItem}</span>
                                ))}
                            </div> */}

                                <div className="mt-4 pt-1">
                                    <Link
                                        to="/candidate-overview"
                                        className="btn btn-soft-primary d-block"
                                    >
                                        View Profile
                                    </Link>
                                </div>
                            </CardBody>
                        </Card>
                    </Col>
                ))}
            </Row>
        </>
    );
};

export default UserList;
