import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { usePage } from "@inertiajs/react";
import {
    Dropdown,
    DropdownToggle,
    DropdownMenu,
    DropdownItem,
} from "reactstrap";

//i18n
import { withTranslation } from "react-i18next";

import { Link } from "@inertiajs/react";

// Default Avatar
import avdefault from "../../../../assets/images/users/default.jpeg";


const ProfileMenu = (props) => {
    const { auth } = usePage().props;
    const avatar = auth.avatar;

    const defaultSrc =(ev) => {
        ev.target.src = avdefault
      }

    // Declare a new state variable, which we'll call "menu"
    const [menu, setMenu] = useState(false);

    return (
        <Dropdown
            isOpen={menu}
            toggle={() => setMenu(!menu)}
            className="d-inline-block"
        >
            <DropdownToggle
                className="btn header-item "
                id="page-header-user-dropdown"
                tag="button"
            >
                <img
                    className="rounded-circle header-profile-user"
                    src={avatar ? avatar : avdefault}
                    onError={defaultSrc}
                    alt="Header Avatar"
                />

                <span className="d-none d-xl-inline-block ms-2 me-1">
                    {auth.name}
                </span>
                <i className="mdi mdi-chevron-down d-none d-xl-inline-block" />
            </DropdownToggle>
            <DropdownMenu className="dropdown-menu-end">
                <DropdownItem tag="a" href="/profile">
                    {" "}
                    <i className="bx bx-user font-size-16 align-middle me-1" />
                    {props.t("Profile")}{" "}
                </DropdownItem>
                <DropdownItem tag="a" href="auth-lock-screen">
                    <i className="bx bx-lock-open font-size-16 align-middle me-1" />
                    {props.t("Lock screen")}
                </DropdownItem>
                <div className="dropdown-divider" />
                <Link
                    href={route("logout")}
                    method="post"
                    as="button"
                    className="dropdown-item"
                >
                    <i className="bx bx-power-off font-size-16 align-middle me-1 text-danger" />
                    <span>{props.t("Logout")}</span>
                </Link>
            </DropdownMenu>
        </Dropdown>
    );
};

ProfileMenu.propTypes = {
    success: PropTypes.any,
    t: PropTypes.any,
};

const mapStatetoProps = (state) => {
    const { error, success } = state.Profile;
    return { error, success };
};

export default withTranslation()(ProfileMenu);
