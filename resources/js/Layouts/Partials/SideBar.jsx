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

import logo from "../../../assets/images/logo.svg";
import logoLightPng from "../../../assets/images/logo-light.png";
import logoLightSvg from "../../../assets/images/logo-light.svg";
import logoDark from "../../../assets/images/logo-dark.png";

const Sidebar = (props) => {
    const ref = useRef();
    const { url, component } = usePage();
    const pathName = url;

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
                            <ul
                                className="metismenu list-unstyled"
                                id="side-menu"
                            >
                                <li className="menu-title">
                                    {props.t("Menu")}{" "}
                                </li>
                                <li
                                    className={
                                        component.startsWith("Dashboard")
                                            ? "mm-active"
                                            : ""
                                    }
                                >
                                    <Link href="/dashboard">
                                        <i className="bx bx-home-circle"></i>
                                        <span>{props.t("Dashboard")}</span>
                                    </Link>
                                </li>

                                <li className="menu-title">
                                    {props.t("Apps")}
                                </li>

                                <li
                                    className={
                                        component.startsWith("Customer")
                                            ? "mm-active"
                                            : ""
                                    }
                                >
                                    <Link href="/customer">
                                        <i className="bx bxs-contact"></i>
                                        <span>{props.t("Customer")}</span>
                                    </Link>
                                </li>

                                <li
                                    className={
                                        component.startsWith("Subscription")
                                            ? "mm-active"
                                            : ""
                                    }
                                >
                                    <Link href="/subscription">
                                        <i className="bx bx-doughnut-chart"></i>
                                        <span>{props.t("Subscription")}</span>
                                    </Link>
                                </li>

                                <li
                                    className={
                                        component.startsWith("Plan")
                                            ? "mm-active"
                                            : ""
                                    }
                                >
                                    <Link href="/plan/ppp">
                                        <i className="bx bx-server"></i>
                                        <span>{props.t("Plan")}</span>
                                    </Link>
                                </li>

                                <li
                                    className={
                                        component.startsWith("Invoice")
                                            ? "mm-active"
                                            : ""
                                    }
                                >
                                    <Link href="/invoice">
                                        <i className="bx bx-receipt"></i>
                                        <span>{props.t("Invoice")}</span>
                                    </Link>
                                </li>

                                <li
                                    className={
                                        component.startsWith("Report")
                                            ? "mm-active"
                                            : ""
                                    }
                                >
                                    <Link href="/report">
                                        <i className="bx bx-receipt"></i>
                                        <span>{props.t("Report")}</span>
                                    </Link>
                                </li>

                                <li>
                                    <Link href="/apps-filemanager" className="">
                                        <i className="bx bx-file"></i>
                                        <span>{props.t("File Manager")}</span>
                                    </Link>
                                </li>

                                <li>
                                    <Link href="/setting/custom" className="">
                                        <i className="bx bx-airplane"></i>
                                        <span>{props.t("Custom")}</span>
                                    </Link>
                                </li>

                                {/* <li>
                      <Link href="/#" className={component === "Crypto/Index" ? "has-arrow mm-show" :"has-arrow mm-hide"}>
                        <i className="bx bx-bitcoin"></i>
                        <span>{props.t("Crypto")}</span>
                      </Link>
                      <ul className="sub-menu" aria-expanded="false">
                        <li>
                          <Link href="/crypto-wallet">{props.t("Wallet")}</Link>
                        </li>
                        <li>
                          <Link href="/crypto-buy-sell">{props.t("Buy/Sell")}</Link>
                        </li>
                        <li>
                          <Link href="/crypto-exchange">{props.t("Exchange")}</Link>
                        </li>
                        <li>
                          <Link href="/crypto-lending">{props.t("Lending")}</Link>
                        </li>
                        <li>
                          <Link href="/crypto-orders">{props.t("Orders")}</Link>
                        </li>
                        <li>
                          <Link href="/crypto-kyc-application">
                            {props.t("KYC Application")}
                          </Link>
                        </li>
                        <li>
                          <Link href="/crypto-ico-landing">{props.t("ICO Landing")}</Link>
                        </li>
                      </ul>
                    </li> */}

                                <li className="menu-title">Settings</li>

                                <li
                                    className={
                                        component.startsWith("Setting/Billing")
                                            ? "mm-active"
                                            : ""
                                    }
                                >
                                    <Link href="/setting/billing" className="">
                                        <i className="bx bx-cog"></i>
                                        <span>
                                            {props.t("Billing Setting")}
                                        </span>
                                    </Link>
                                </li>

                                <li
                                    className={
                                        component.startsWith("Setting/Mikrotik")
                                            ? "mm-active"
                                            : ""
                                    }
                                >
                                    <Link href="/setting/mikrotik" className="">
                                        <i className="bx bx-cog"></i>
                                        <span>
                                            {props.t("Mikrotik Setting")}
                                        </span>
                                    </Link>
                                </li>

                                <li
                                    className={
                                        component.startsWith("Setting/User")
                                            ? "mm-active"
                                            : ""
                                    }
                                >
                                    <Link href="/setting/user" className="">
                                        <i className="bx bx-cog"></i>
                                        <span>{props.t("User Setting")}</span>
                                    </Link>
                                </li>

                                <li
                                    className={
                                        component.startsWith("AuthMethod")
                                            ? "mm-active"
                                            : ""
                                    }
                                >
                                    <a
                                        className={
                                            component.startsWith("AuthMethod")
                                                ? "has-arrow wave-effect mm-active"
                                                : "has-arrow wave-effect"
                                        }
                                    >
                                        <i className="bx bx-user-circle"></i>
                                        <span>{props.t("Authentication")}</span>
                                    </a>
                                    <ul
                                        className={
                                            component.startsWith("AuthMethod")
                                                ? "sub-menu mm-collapse mm-show"
                                                : "sub-menu mm-collapse"
                                        }
                                    >
                                        <li
                                            className={
                                                component.startsWith(
                                                    "AuthMethod"
                                                )
                                                    ? "mm-active"
                                                    : ""
                                            }
                                        >
                                            <Link href="/pages-login">
                                                {props.t("Login")}
                                            </Link>
                                        </li>
                                        <li>
                                            <Link href="/pages-login-2">
                                                {props.t("Login 2")}
                                            </Link>
                                        </li>
                                        <li>
                                            <Link href="/pages-register">
                                                {props.t("Register")}
                                            </Link>
                                        </li>
                                        <li>
                                            <Link href="/pages-register-2">
                                                {props.t("Register 2")}
                                            </Link>
                                        </li>
                                        <li>
                                            <Link href="/page-recoverpw">
                                                {props.t("Recover Password")}
                                            </Link>
                                        </li>
                                        <li>
                                            <Link href="/page-recoverpw-2">
                                                {props.t("Recover Password 2")}
                                            </Link>
                                        </li>
                                        <li>
                                            <Link href="/auth-lock-screen">
                                                {props.t("Lock Screen")}
                                            </Link>
                                        </li>
                                        <li>
                                            <Link href="/auth-lock-screen-2">
                                                {props.t("Lock Screen 2")}
                                            </Link>
                                        </li>
                                        <li>
                                            <Link href="/page-confirm-mail">
                                                {props.t("Confirm Mail")}
                                            </Link>
                                        </li>
                                        <li>
                                            <Link href="/page-confirm-mail-2">
                                                {props.t("Confirm Mail 2")}
                                            </Link>
                                        </li>
                                        <li>
                                            <Link href="/auth-email-verification">
                                                {props.t("Email Verification")}
                                            </Link>
                                        </li>
                                        <li>
                                            <Link href="/auth-email-verification-2">
                                                {props.t(
                                                    "Email Verification 2"
                                                )}
                                            </Link>
                                        </li>
                                        <li>
                                            <Link href="/auth-two-step-verification">
                                                {props.t(
                                                    "Two Step Verification"
                                                )}
                                            </Link>
                                        </li>
                                        <li>
                                            <Link href="/auth-two-step-verification-2">
                                                {props.t(
                                                    "Two Step Verification 2"
                                                )}
                                            </Link>
                                        </li>
                                    </ul>
                                </li>
                            </ul>
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
