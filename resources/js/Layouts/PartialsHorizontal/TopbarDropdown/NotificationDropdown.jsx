import React, { useState } from "react";
import PropTypes from "prop-types";
import { Link, usePage} from "@inertiajs/react";
import { Dropdown, DropdownToggle, DropdownMenu, Row, Col } from "reactstrap";
import SimpleBar from "simplebar-react";

import moment from "moment/moment";

//Import images
import avatar3 from "../../../../assets/images/users/avatar-3.jpg";
import avatar4 from "../../../../assets/images/users/avatar-4.jpg";

//i18n
import { withTranslation } from "react-i18next";

const NotificationDropdown = (props) => {
    // Declare a new state variable, which we'll call "menu"
    const notif = usePage().props.notif
    const [menu, setMenu] = useState(false);

    return (
        <React.Fragment>
            <Dropdown
                isOpen={menu}
                toggle={() => setMenu(!menu)}
                className="dropdown d-inline-block"
                tag="li"
            >
                <DropdownToggle
                    className="btn header-item noti-icon position-relative"
                    tag="button"
                    id="page-header-notifications-dropdown"
                >
                    <i className="bx bx-bell bx-tada" />
                </DropdownToggle>

                <DropdownMenu className="dropdown-menu dropdown-menu-lg p-0 dropdown-menu-end">
                    <div className="p-3">
                        <Row className="align-items-center">
                            <Col>
                                <h6 className="m-0">
                                    {" "}
                                    {props.t("Notifications")}{" "}
                                </h6>
                            </Col>
                        </Row>
                    </div>

                    <SimpleBar style={{ height: "230px" }}>
                        {notif.map((notify, index) =>
                        <Link href="#/" className="text-reset notification-item" key={index}>
                            <div className="d-flex">
                                <div className="avatar-xs me-3">
                                    <span className="avatar-title bg-primary rounded-circle font-size-16">
                                        <i className="bx bx-cart" />
                                    </span>
                                </div>
                                <div className="flex-grow-1">
                                    <h6 className="mt-0 mb-1">
                                    {notify.data.table} {" "}{notify.data.status}
                                    </h6>
                                    <div className="font-size-12 text-muted">
                                        <p className="mb-1">
                                        {notify.data.subject}{" "}{notify.data.action}
                                        </p>
                                        <p className="mb-1">
                                        {notify.data.object}
                                        </p>
                                        <p className="mb-0">
                                            <i className="mdi mdi-clock-outline" />{" "}
                                            {moment(notify.created_at).fromNow()}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </Link>
                         )}
                    </SimpleBar>
                    <div className="p-2 border-top d-grid">
                        <Link
                            className="btn btn-sm btn-link font-size-14 btn-block text-center"
                            href="#/"
                        >
                            <i className="mdi mdi-arrow-right-circle me-1"></i>{" "}
                            {props.t("View all")}{" "}
                        </Link>
                    </div>
                </DropdownMenu>
            </Dropdown>
        </React.Fragment>
    );
};

export default withTranslation()(NotificationDropdown);

NotificationDropdown.propTypes = {
    t: PropTypes.any,
};
