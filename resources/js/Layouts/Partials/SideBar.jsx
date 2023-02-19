import PropTypes from "prop-types";
import { useEffect, useRef } from "react";
import { Link, usePage } from "@inertiajs/react";
import { connect } from "react-redux";

//i18n
import { withTranslation } from "react-i18next";

// //Import Scrollbar
import SimpleBar from "simplebar-react";

// MetisMenu
// import MetisMenu from "metismenujs"
import MetisMenu from '@metismenu/react';
//  import 'metismenujs/style';

import logo from "../../../assets/images/logo.svg";
import logoLightPng from "../../../assets/images/logo-light.png";
import logoLightSvg from "../../../assets/images/logo-light.svg";
import logoDark from "../../../assets/images/logo-dark.png";

const Sidebar = (props) => {
    const ref = useRef();
    const { url, component } = usePage();
    // console.log(usePage().component)

    function hideDropdown(item) {
        const parent = item.parentElement
        const parent2El = parent.childNodes[1]
        if (parent2El && parent2El.className !== "metismenu") {
            parent2El.classList.remove("mm-show")
        }

        if (parent) {
            parent.classList.remove("mm-active")
            const parent2 = parent.parentElement
            if (parent2) {
            parent2.classList.remove("mm-show") // ul tag
            const parent3 = parent2.parentElement // li tag
                if (parent3) {
                    parent3.classList.remove("mm-active") // li
                    parent3.childNodes[0].classList.remove("mm-active") //a
                }
            }
            scrollElement(item);
            return false
        }
        scrollElement(item);
        return false
    }

    // useEffect(() => {
    //     const initMenu = () => {
    //         let matchingMenuItem = null
    //         let activeMenuItem = null
    //         const ul = document.getElementById("sidebar-menu")
    //         const items = ul.getElementsByTagName("a")
    //         // console.log(items)
    //         for (let i = 0; i < items.length; ++i) {
    //         // activateRemoveParentDropdown(items[i])
    //         if (items[i].className !== "mm-active navlink") {
    //             matchingMenuItem = items[i]
    //             hideDropdown(matchingMenuItem)
    //             // console.log(matchingMenuItem)
    //             }
    //         }


    //     }
    //     initMenu()
    // }, [usePage().component])

    useEffect(() => {
        ref.current.recalculate()
    })

    function scrollElement(item) {
    if (item) {
        const currentPosition = item.offsetTop
        if (currentPosition > window.innerHeight) {
        ref.current.getScrollElement().scrollTop = currentPosition - 300
        }
    }
    }

    // function activateParentDropdown(item) {
    // const parent = item.parentElement
    // const parent2El = parent.childNodes[1]
    // if (parent2El && parent2El.id !== "side-menu") {
    //     parent2El.classList.add("mm-show")
    // }

    // if (parent) {
    //     parent.classList.add("mm-active")
    //     const parent2 = parent.parentElement

    //     if (parent2) {
    //     parent2.classList.add("mm-show") // ul tag

    //     const parent3 = parent2.parentElement // li tag

    //     if (parent3) {
    //         parent3.classList.add("mm-active") // li
    //         parent3.childNodes[0].classList.add("mm-active") //a
    //         const parent4 = parent3.parentElement // ul
    //         if (parent4) {
    //         parent4.classList.add("mm-show") // ul
    //         const parent5 = parent4.parentElement
    //         if (parent5) {
    //             parent5.classList.add("mm-show") // li
    //             parent5.childNodes[0].classList.add("mm-active") // a tag
    //         }
    //         }
    //     }
    //     }
    //     scrollElement(item);
    //     return false
    // }
    // scrollElement(item);
    // return false
    // }




    return (
        <>
            <div className="vertical-menu">
                <div className="navbar-brand-box">
                    <Link href="/" className="logo logo-dark">
                        <span className="logo-sm">
                            <img src={logo} alt="" height="22" />
                        </span>
                        <span className="logo-lg">
                            <img src={logoDark} alt="" height="17" />
                        </span>
                    </Link>

                    <Link href="/" className="logo logo-light">
                        <span className="logo-sm">
                            <img src={logoLightSvg} alt="" height="22" />
                        </span>
                        <span className="logo-lg">
                            <img src={logoLightPng} alt="" height="19" />
                        </span>
                    </Link>
                </div>

                <div data-simplebar className="h-100">
                    <SimpleBar className="h-100" ref={ref}>
                        <div id="sidebar-menu">
                            <MetisMenu
                                className="list-unstyled"
                            >
                                <li className="menu-title">
                                    {props.t("Menu")}{" "}
                                </li>
                                <li>
                                    <Link href="/dashboard"
                                    className={
                                        component.startsWith("Dashboard")
                                            ? "mm-active navlink"
                                            : ""
                                    }>
                                        <i className="bx bx-home-circle"></i>
                                        <span>{props.t("Dashboard")}</span>
                                    </Link>
                                </li>

                                <li className="menu-title">
                                    {props.t("Apps")}
                                </li>

                                <li>
                                    <Link href="/customer"
                                    className={
                                        component.startsWith("Customer")
                                            ? "mm-active navlink"
                                            : ""
                                    }>
                                        <i className="bx bxs-contact"></i>
                                        <span>{props.t("Customer")}</span>
                                    </Link>
                                </li>

                                <li>
                                    <Link href="/subscription"
                                    className={
                                        component.startsWith("Subscription")
                                            ? "mm-active navlink"
                                            : ""
                                    }
                                    >
                                        <i className="bx bx-doughnut-chart"></i>
                                        <span>{props.t("Subscription")}</span>
                                    </Link>
                                </li>

                                <li>
                                    <Link href="/plan/ppp"
                                    className={
                                        component.startsWith("Plan")
                                            ? "mm-active navlink"
                                            : ""
                                    }>
                                        <i className="bx bx-server"></i>
                                        <span>{props.t("Plan")}</span>
                                    </Link>
                                </li>

                                <li>
                                    <Link href="/invoice"
                                    className={
                                        component.startsWith("Invoice")
                                            ? "mm-active navlink"
                                            : ""
                                    }>
                                        <i className="bx bx-receipt"></i>
                                        <span>{props.t("Invoice")}</span>
                                    </Link>
                                </li>

                                <li>
                                    <Link href="/report"
                                     className={
                                        component.startsWith("Report")
                                            ? "mm-active navlink"
                                            : ""
                                    }>
                                        <i className="bx bx-bar-chart"></i>
                                        <span>{props.t("Report")}</span>
                                    </Link>
                                </li>

                                <li>
                                    <Link href="/notification"
                                    className={
                                        component.startsWith("Notification/Index")
                                            ? "mm-active navlink"
                                            : ""
                                    }>
                                        <i className="bx bxs-bell-ring"></i>
                                        <span>{props.t("Notification")}</span>
                                    </Link>
                                </li>

                                <li>
                                    <Link href="/setting/custom"
                                    className={
                                        component.startsWith("Setting/Custom")
                                            ? "mm-active navlink"
                                            : ""
                                    }>
                                        <i className="bx bx-airplane"></i>
                                        <span>{props.t("Custom")}</span>
                                    </Link>
                                </li>


                                <li className="menu-title">Settings</li>

                                {/* DropDown But Still Not Work */}
                                <li>
                                    <a to="/#" className="has-arrow">
                                        <i className="bx bx-cog"></i>
                                        <span>{props.t("Setting")}</span>
                                    </a>
                                    <ul className="sub-menu">
                                        <li>
                                            <Link href="/setting/billing"
                                            className={
                                                component.startsWith("Setting/Billing")
                                                    ? "mm-active navlink"
                                                    : ""
                                            }
                                            >
                                                <span>
                                                    {props.t("Billing Setting")}
                                                </span>
                                            </Link>
                                        </li>
                                        <li>
                                            <Link href="/setting/mikrotik"
                                            className={
                                                component.startsWith("Setting/Mikrotik")
                                                    ? "mm-active navlink"
                                                    : ""
                                            }>
                                                <span>
                                                    {props.t("Mikrotik Setting")}
                                                </span>
                                            </Link>
                                        </li>
                                        <li>
                                            <Link href="/setting/user"
                                            className={
                                                component.startsWith("Setting/User")
                                                    ? "mm-active navlink"
                                                    : ""
                                            }>
                                                <span>
                                                    {props.t("User Setting")}
                                                </span>
                                            </Link>
                                        </li>
                                    </ul>
                                </li>

                                {/* <li>
                                    <Link href="/setting/billing"
                                    className={
                                        component.startsWith("Setting/Billing")
                                            ? "active"
                                            : ""
                                    }>
                                        <i className="bx bx-cog"></i>
                                        <span>
                                            {props.t("Billing Setting")}
                                        </span>
                                    </Link>
                                </li>

                                <li>
                                    <Link href="/setting/mikrotik"
                                    className={
                                        component.startsWith("Setting/Mikrotik")
                                            ? "active"
                                            : ""
                                    }>
                                        <i className="bx bx-cog"></i>
                                        <span>
                                            {props.t("Mikrotik Setting")}
                                        </span>
                                    </Link>
                                </li>

                                <li>
                                    <Link href="/setting/user"
                                    className={
                                        component.startsWith("Setting/User")
                                            ? "mm-active navlink"
                                            : ""
                                    }>
                                        <i className="bx bx-cog"></i>
                                        <span>{props.t("User Setting")}</span>
                                    </Link>
                                </li> */}

                                <li>
                                    <Link href="/map/area"
                                    className={
                                        component.startsWith("Map")
                                            ? "active"
                                            : ""
                                    }>
                                        <i className="bx bx-map"></i>
                                        <span>{props.t("Area")}</span>
                                    </Link>
                                </li>

                            </MetisMenu>
                        </div>
                    </SimpleBar>
                </div>

                <div className="sidebar-background"></div>
            </div>
        </>
    );
};

Sidebar.propTypes = {
    type: PropTypes.string,
};

const mapStatetoProps = (state) => {
    return {
        layout: state.Layout,
    };
};
export default connect(mapStatetoProps, {})(withTranslation()(Sidebar));
