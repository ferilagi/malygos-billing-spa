import { useEffect, useRef } from "react";
import { Link, usePage } from "@inertiajs/react";

//i18n
import { withTranslation } from "react-i18next";

// //Import Scrollbar
import SimpleBar from "simplebar-react";

// MetisMenu
// import MetisMenu from "metismenujs"
import MetisMenu from "@metismenu/react";
//  import 'metismenujs/style';

import masterlogo from "../../../assets/images/masterlogo.png";
import logo from "../../../assets/images/logo.svg";
import logoLightSvg from "../../../assets/images/logo-light.svg";

const Sidebar = (props) => {
    // console.log(props)
    const ref = useRef();
    const { url, component } = usePage();

    useEffect(() => {
        const pathName = window.location.pathname;
        const initMenu = () => {
            let matchingMenuItem = null;
            const ul = document.getElementById("sidebar-menu");
            const items = ul.getElementsByTagName("a");
            for (let i = 0; i < items.length; ++i) {
                if (pathName === items[i].pathname) {
                    matchingMenuItem = items[i];
                    break;
                }
            }
            if (matchingMenuItem) {
                activateParentDropdown(matchingMenuItem);
            }
        };
        initMenu();
    }, [window.location.pathname]);

    useEffect(() => {
        ref.current.recalculate();
    });

    function scrollElement(item) {
        if (item) {
            const currentPosition = item.offsetTop;
            if (currentPosition > window.innerHeight) {
                ref.current.getScrollElement().scrollTop =
                    currentPosition - 300;
            }
        }
    }

    function activateParentDropdown(item) {
        item.classList.add("mm-active");
        const parent = item.parentElement;
        const parent2El = parent.childNodes[1];
        if (parent2El && parent2El.id !== "side-menu") {
            parent2El.classList.add("mm-show");
        }

        if (parent) {
            parent.classList.add("mm-active");
            const parent2 = parent.parentElement;

            if (parent2) {
                parent2.classList.add("mm-show"); // ul tag

                const parent3 = parent2.parentElement; // li tag

                if (parent3) {
                    parent3.classList.add("mm-active"); // li
                    parent3.childNodes[0].classList.add("mm-active"); //a
                    const parent4 = parent3.parentElement; // ul
                    if (parent4) {
                        parent4.classList.add("mm-show"); // ul
                        const parent5 = parent4.parentElement;
                        if (parent5) {
                            parent5.classList.add("mm-show"); // li
                            parent5.childNodes[0].classList.add("mm-active"); // a tag
                        }
                    }
                }
            }
            scrollElement(item);
            return false;
        }
        scrollElement(item);
        return false;
    }

    return (
        <>
            <div className="vertical-menu" id="vertical-menu">
                <div className="navbar-brand-box">
                    <Link href="/" className="logo logo-dark">
                        <span className="logo-sm">
                            <img src={logo} alt="" height="24" />
                        </span>
                        <span className="logo-lg">
                            <img src={masterlogo} alt="" height="52" />
                        </span>
                    </Link>

                    <Link href="/" className="logo logo-light">
                        <span className="logo-sm">
                            <img src={logoLightSvg} alt="" height="24" />
                        </span>
                        <span className="logo-lg">
                            <img src={masterlogo} alt="" height="52" />
                        </span>
                    </Link>
                </div>

                <SimpleBar className="h-100" ref={ref}>
                    <div id="sidebar-menu">
                        <MetisMenu
                            className="metismenu list-unstyled"
                            id="side-menu"
                        >
                            <li className="menu-title">{props.t("Menu")} </li>
                            <li>
                                <Link href="/dashboard" className=" ">
                                    <i className="bx bx-home-circle"></i>
                                    <span>{props.t("Dashboard")}</span>
                                </Link>
                            </li>

                            <li className="menu-title">{props.t("Apps")}</li>

                            <li>
                                <Link href="/customer" className=" ">
                                    <i className="bx bxs-contact"></i>
                                    <span>{props.t("Customer")}</span>
                                </Link>
                            </li>

                            <li>
                                <Link href="/subscription" className=" ">
                                    <i className="bx bx-doughnut-chart"></i>
                                    <span>{props.t("Subscription")}</span>
                                </Link>
                            </li>

                            <li>
                                <a to="/#" className="has-arrow">
                                    <i className="bx bx-server"></i>
                                    <span>{props.t("Plan")}</span>
                                </a>
                                <ul className="sub-menu" aria-expanded="false">
                                    <li>
                                        <Link href="/plan/ppp">
                                            <span>{props.t("PPP")}</span>
                                        </Link>
                                    </li>
                                    <li>
                                        <Link href="/plan/static">
                                            <span>{props.t("Static")}</span>
                                        </Link>
                                    </li>
                                </ul>
                            </li>

                            <li>
                                <Link
                                    href="/invoice"
                                    className={
                                        component.startsWith("Invoice")
                                            ? "mm-active navlink"
                                            : ""
                                    }
                                >
                                    <i className="bx bx-receipt"></i>
                                    <span>{props.t("Invoice")}</span>
                                </Link>
                            </li>

                            <li>
                                <Link to="#" className="has-arrow">
                                    <i className="bx bx-bar-chart"></i>
                                    <span>{props.t("Report")}</span>
                                </Link>
                                <ul>
                                    <li>
                                        <Link
                                            href="/report"
                                            className={
                                                component.startsWith("Report")
                                                    ? "mm-active navlink"
                                                    : ""
                                            }
                                        >
                                            <span>{props.t("Report")}</span>
                                        </Link>
                                    </li>
                                </ul>
                            </li>

                            <li>
                                <Link
                                    href="/notification"
                                    className={
                                        component.startsWith(
                                            "Notification/Index"
                                        )
                                            ? "mm-active navlink"
                                            : ""
                                    }
                                >
                                    <i className="bx bxs-bell-ring"></i>
                                    <span>{props.t("Notification")}</span>
                                </Link>
                            </li>

                            <li>
                                <Link
                                    href="/setting/custom"
                                    className={
                                        component.startsWith("Setting/Custom")
                                            ? "mm-active navlink"
                                            : ""
                                    }
                                >
                                    <i className="bx bx-airplane"></i>
                                    <span>{props.t("Custom")}</span>
                                </Link>
                            </li>

                            <li className="menu-title">Settings</li>

                            {/* DropDown But Still Not Work */}
                            <li>
                                <Link href="/#" className="has-arrow">
                                    <i className="bx bx-cog"></i>
                                    <span>{props.t("Setting")}</span>
                                </Link>
                                <ul className="sub-menu">
                                    <li>
                                        <Link
                                            href="/setting/billing"
                                            className={
                                                component.startsWith(
                                                    "Setting/Billing"
                                                )
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
                                        <Link
                                            href="/setting/mikrotik"
                                            className={
                                                component.startsWith(
                                                    "Setting/Mikrotik"
                                                )
                                                    ? "mm-active navlink"
                                                    : ""
                                            }
                                        >
                                            <span>
                                                {props.t("Mikrotik Setting")}
                                            </span>
                                        </Link>
                                    </li>
                                    <li>
                                        <Link
                                            href="/setting/user"
                                            className={
                                                component.startsWith(
                                                    "Setting/User"
                                                )
                                                    ? "mm-active navlink"
                                                    : ""
                                            }
                                        >
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
                                <Link
                                    href="/map/area"
                                    className={
                                        component.startsWith("Map")
                                            ? "active"
                                            : ""
                                    }
                                >
                                    <i className="bx bx-map"></i>
                                    <span>{props.t("Area")}</span>
                                </Link>
                            </li>
                        </MetisMenu>
                    </div>
                </SimpleBar>

                <div className="sidebar-background"></div>
            </div>
        </>
    );
};

export default withTranslation()(Sidebar);
