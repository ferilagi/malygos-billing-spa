import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Link, usePage } from "@inertiajs/react";

// Redux Store
import {
    showRightSidebarAction,
    toggleLeftmenu,
    changeSidebarType,
} from "../../store/actions";
// reactstrap
import { Row, Col, Dropdown, DropdownToggle, DropdownMenu } from "reactstrap";

import LanguageDropdown from "./TopbarDropdown/LanguageDropdown";
import NotificationDropdown from "./TopbarDropdown/NotificationDropdown";
import ProfileMenu from "./TopbarDropdown/ProfileMenu";

import logo from "../../../assets/images/logo.svg";
import masterlogo from "../../../assets/images/masterlogo.png"
import logoLightSvg from "../../../assets/images/logo-light.svg";

//i18n
import { withTranslation } from "react-i18next";

const TopBar = (props) => {

    const logonew = usePage().logo
    function toggleFullscreen() {
        if (
            !document.fullscreenElement &&
            /* alternative standard method */ !document.mozFullScreenElement &&
            !document.webkitFullscreenElement
        ) {
            // current working methods
            if (document.documentElement.requestFullscreen) {
                document.documentElement.requestFullscreen();
            } else if (document.documentElement.mozRequestFullScreen) {
                document.documentElement.mozRequestFullScreen();
            } else if (document.documentElement.webkitRequestFullscreen) {
                document.documentElement.webkitRequestFullscreen(
                    Element.ALLOW_KEYBOARD_INPUT
                );
            }
        } else {
            if (document.cancelFullScreen) {
                document.cancelFullScreen();
            } else if (document.mozCancelFullScreen) {
                document.mozCancelFullScreen();
            } else if (document.webkitCancelFullScreen) {
                document.webkitCancelFullScreen();
            }
        }
    }

    function tToggle() {
        var body = document.body;
        if (window.screen.width <= 998) {
            body.classList.toggle("sidebar-enable");
        } else {
            body.classList.toggle("vertical-collpsed");
            body.classList.toggle("sidebar-enable");
        }
    }

    return (
        <>
            <header id="page-topbar">
                <div className="navbar-header">
                    <div className="d-flex">
                        <div className="navbar-brand-box d-lg-none d-md-block">
                            <Link
                                href={route("dashboard")}
                                className="logo logo-dark"
                            >
                                <span className="logo-sm">
                                    <img src={masterlogo} alt="" height="22" />
                                </span>
                            </Link>

                            <Link
                                href={route("dashboard")}
                                className="logo logo-light"
                            >
                                <span className="logo-sm">
                                    <img
                                        src={masterlogo}
                                        alt=""
                                        height="22"
                                    />
                                </span>
                            </Link>
                        </div>

                        <button
                            type="button"
                            onClick={() => {
                                tToggle();
                            }}
                            className="btn btn-sm px-3 font-size-16 header-item "
                            id="vertical-menu-btn"
                        >
                            <i className="fa fa-fw fa-bars" />
                        </button>
                    </div>

                    <div className="d-flex">
                        <LanguageDropdown />

                        <div className="dropdown d-none d-lg-inline-block ms-1">
                            <button
                                type="button"
                                onClick={() => {
                                    toggleFullscreen();
                                }}
                                className="btn header-item noti-icon "
                                data-toggle="fullscreen"
                            >
                                <i className="bx bx-fullscreen" />
                            </button>
                        </div>

                        <NotificationDropdown />
                        <ProfileMenu />

                        <div
                            onClick={() => {
                                props.showRightSidebarAction(
                                    !props.showRightSidebar
                                );
                            }}
                            className="dropdown d-inline-block"
                        >
                            <button
                                type="button"
                                className="btn header-item noti-icon right-bar-toggle "
                            >
                                <i className="bx bx-cog bx-spin" />
                            </button>
                        </div>
                    </div>
                </div>
            </header>
        </>
    );
};

TopBar.propTypes = {
    changeSidebarType: PropTypes.func,
    leftMenu: PropTypes.any,
    leftSideBarType: PropTypes.any,
    showRightSidebar: PropTypes.any,
    showRightSidebarAction: PropTypes.func,
    t: PropTypes.any,
    toggleLeftmenu: PropTypes.func,
};

const mapStatetoProps = (state) => {
    const { layoutType, showRightSidebar, leftMenu, leftSideBarType } =
        state.Layout;
    return { layoutType, showRightSidebar, leftMenu, leftSideBarType };
};

export default connect(mapStatetoProps, {
    showRightSidebarAction,
    toggleLeftmenu,
    changeSidebarType,
})(withTranslation()(TopBar));
