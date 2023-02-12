import React, { useState } from "react";
import { Link } from "@inertiajs/react";

import {
    Row,
    Col,
    Card,
    CardBody,
    CardTitle,
    Dropdown,
    DropdownToggle,
    DropdownMenu,
    DropdownItem
} from "reactstrap";

import ApexRadial from "./ApexRadial";

//i18n
import { withTranslation } from "react-i18next";

const MonthlyEarning = (props) => {

    const monthly = props.monthly

    const currFormat = (num) => {
        return "IDR " + num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
    };

    const [isMenu, setIsMenu] = useState(false);

    const toggleMenu = () => {
        setIsMenu(!isMenu);
    };

    return (
        <React.Fragment>
            {" "}
            <Card>
                <CardBody>
                    <div className="d-flex align-items-start mb-3">
                        <div className="flex-grow-1 align-self-center">
                        <Link href={route('report.index')}>
                        <CardTitle className="mb-4">
                            <h5>Monthly Earning</h5>
                        </CardTitle>
                        </Link>
                        </div>
                        <Dropdown
                        isOpen={isMenu}
                        toggle={toggleMenu}
                        >
                            <DropdownToggle
                                type="button"
                                tag="button"
                                className="btn btn-light"
                            >
                                <i className="mdi mdi-wallet me-1" />
                                <span className="d-none d-sm-inline-block">
                                    <i className="mdi mdi-chevron-down" />
                                </span>
                            </DropdownToggle>
                            <DropdownMenu className="dropdown-menu-end dropdown-menu-md">
                                <div className="dropdown-item-text">
                                    <div>
                                        <p className="text-muted mb-2">{props.t("Cash")}</p>
                                        <h6 className="mb-0">{currFormat(monthly.earncash)}</h6>
                                    </div>
                                </div>

                                <DropdownItem divider />

                                <div className="dropdown-item-text">
                                    <div>
                                        <p className="text-muted mb-2">{props.t("Transfer")}</p>
                                        <h6 className="mb-0">{currFormat(monthly.earntransfer)}</h6>
                                    </div>
                                </div>
                            </DropdownMenu>
                        </Dropdown>
                    </div>
                    <Row>
                        <Col sm="6">
                            <p className="text-muted">This month</p>
                            <h3>{currFormat(monthly.earnmonth)}</h3>
                            <p className="text-muted">
                                <span className="text-success me-2">
                                    {" "}
                                    12% <i className="mdi mdi-arrow-up"></i>{" "}
                                </span>{" "}
                                From previous period
                            </p>
                            <div className="mt-4">
                                <Link
                                    href={route('report.index')}
                                    className="btn btn-primary waves-effect waves-light btn-sm"
                                >
                                    View More{" "}
                                    <i className="mdi mdi-arrow-right ms-1"></i>
                                </Link>
                            </div>
                        </Col>
                        <Col sm="6">
                            <div className="mt-4 mt-sm-0">
                                <ApexRadial dataColors='["--bs-primary"]' />
                            </div>
                        </Col>
                    </Row>
                    <p className="text-muted mb-0">
                        We craft digital, graphic and dimensional thinking.
                    </p>
                </CardBody>
            </Card>
        </React.Fragment>
    );
};

export default (withTranslation()(MonthlyEarning));
