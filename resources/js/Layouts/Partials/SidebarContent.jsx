import PropTypes from "prop-types"
import React, { useEffect, useRef } from "react"

// //Import Scrollbar
import SimpleBar from "simplebar-react"

// MetisMenu
import MetisMenu from "metismenujs"
import { Link } from '@inertiajs/react';

//i18n
import { withTranslation } from "react-i18next";

const SidebarContent = props => {
  const ref = useRef()
  // Use ComponentDidMount and ComponentDidUpdate method symultaniously
  useEffect(() => {
    const pathName = props.location

    const initMenu = () => {
      new MetisMenu("#side-menu")
      let matchingMenuItem = null
      const ul = document.getElementById("side-menu")
      const items = ul.getElementsByTagName("a")
      for (let i = 0; i < items.length; ++i) {
        if (pathName === items[i].pathname) {
          matchingMenuItem = items[i]
          break
        }
      }
      if (matchingMenuItem) {
        activateParentDropdown(matchingMenuItem)
      }
    }
    initMenu()
  }, [route()])

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

  function activateParentDropdown(item) {
    item.classList.add("active")
    const parent = item.parentElement
    const parent2El = parent.childNodes[1]
    if (parent2El && parent2El.id !== "side-menu") {
      parent2El.classList.add("mm-show")
    }

    if (parent) {
      parent.classList.add("mm-active")
      const parent2 = parent.parentElement

      if (parent2) {
        parent2.classList.add("mm-show") // ul tag

        const parent3 = parent2.parentElement // li tag

        if (parent3) {
          parent3.classList.add("mm-active") // li
          parent3.childNodes[0].classList.add("mm-active") //a
          const parent4 = parent3.parentElement // ul
          if (parent4) {
            parent4.classList.add("mm-show") // ul
            const parent5 = parent4.parentElement
            if (parent5) {
              parent5.classList.add("mm-show") // li
              parent5.childNodes[0].classList.add("mm-active") // a tag
            }
          }
        }
      }
      scrollElement(item);
      return false
    }
    scrollElement(item);
    return false
  }

  return (
    <>
      <SimpleBar className="h-100" ref={ref}>
        <div id="sidebar-menu">
          <ul className="metismenu list-unstyled" id="side-menu">
            <li className="menu-title">{props.t("Menu")} </li>
            <li>
              <Link to="/#" className="has-arrow">
                <i className="bx bx-home-circle"></i>
                <span>{props.t("Dashboards")}</span>
              </Link>
              <ul className="sub-menu" aria-expanded="false">
                <li>
                  <Link href={route('dashboard')}>{props.t("Default")}</Link>
                </li>
                <li>
                  <Link href={route('profile.edit')}>{props.t("Saas")}</Link>
                </li>
                <li>
                  <Link to="/dashboard-crypto">{props.t("Crypto")}</Link>
                </li>
                <li>
                  <Link to="/blog">{props.t("Blog")}</Link>
                </li>
                <li>
                  <Link to="/dashboard-job">
                    <span className="badge rounded-pill text-bg-success float-end" key="t-new">New</span>
                    {props.t("Jobs")}
                  </Link>
                </li>
              </ul>
            </li>

            <li className="menu-title">{props.t("Apps")}</li>

            <li>
              <Link to="/calendar" className=" ">
                <i className="bx bx-calendar"></i>
                <span>{props.t("Calendar")}</span>
              </Link>
            </li>

            <li>
              <Link href={route('subs.index')} className="">
                <i className="bx bx-chat"></i>
                <span>{props.t("Subscription")}</span>
              </Link>
            </li>
            <li>
              <Link to="/apps-filemanager" >
                <i className="bx bx-file"></i>
                <span>{props.t("File Manager")}</span>
              </Link>
            </li>

            <li>
              <Link href={route('setting.custom')}>
                <i className="bx bx-store"></i>
                <span>{props.t("Setting")}</span>
              </Link>
            </li>

            <li>
              <Link to="/#" className="has-arrow ">
                <i className="bx bx-bitcoin"></i>
                <span>{props.t("Crypto")}</span>
              </Link>
              <ul className="sub-menu" aria-expanded="false">
                <li>
                  <Link to="/crypto-wallet">{props.t("Wallet")}</Link>
                </li>
                <li>
                  <Link to="/crypto-buy-sell">{props.t("Buy/Sell")}</Link>
                </li>
                <li>
                  <Link to="/crypto-exchange">{props.t("Exchange")}</Link>
                </li>
                <li>
                  <Link to="/crypto-lending">{props.t("Lending")}</Link>
                </li>
                <li>
                  <Link to="/crypto-orders">{props.t("Orders")}</Link>
                </li>
                <li>
                  <Link to="/crypto-kyc-application">
                    {props.t("KYC Application")}
                  </Link>
                </li>
                <li>
                  <Link to="/crypto-ico-landing">{props.t("ICO Landing")}</Link>
                </li>
              </ul>
            </li>

            <li>
              <Link to="/#" className="has-arrow ">
                <i className="bx bx-receipt"></i>
                <span>{props.t("Invoices")}</span>
              </Link>
              <ul className="sub-menu" aria-expanded="false">
                <li>
                  <Link to="/invoices-list">{props.t("Invoice List")}</Link>
                </li>
                <li>
                  <Link to="/invoices-detail">{props.t("Invoice Detail")}</Link>
                </li>
              </ul>
            </li>

            <li className="menu-title">Pages</li>

            <li>
              <Link to="/#" className="has-arrow ">
                <i className="bx bx-user-circle"></i>
                <span>{props.t("Authentication")}</span>
              </Link>
              <ul className="sub-menu">
                <li>
                  <Link to="/pages-login">{props.t("Login")}</Link>
                </li>
                <li>
                  <Link to="/pages-login-2">{props.t("Login 2")}</Link>
                </li>
                <li>
                  <Link to="/pages-register">{props.t("Register")}</Link>
                </li>
                <li>
                  <Link to="/pages-register-2">{props.t("Register 2")}</Link>
                </li>
                <li>
                  <Link to="/page-recoverpw">
                    {props.t("Recover Password")}
                  </Link>
                </li>
                <li>
                  <Link to="/page-recoverpw-2">
                    {props.t("Recover Password 2")}
                  </Link>
                </li>
                <li>
                  <Link to="/auth-lock-screen">{props.t("Lock Screen")}</Link>
                </li>
                <li>
                  <Link to="/auth-lock-screen-2">
                    {props.t("Lock Screen 2")}
                  </Link>
                </li>
                <li>
                  <Link to="/page-confirm-mail">{props.t("Confirm Mail")}</Link>
                </li>
                <li>
                  <Link to="/page-confirm-mail-2">
                    {props.t("Confirm Mail 2")}
                  </Link>
                </li>
                <li>
                  <Link to="/auth-email-verification">
                    {props.t("Email Verification")}
                  </Link>
                </li>
                <li>
                  <Link to="/auth-email-verification-2">
                    {props.t("Email Verification 2")}
                  </Link>
                </li>
                <li>
                  <Link to="/auth-two-step-verification">
                    {props.t("Two Step Verification")}
                  </Link>
                </li>
                <li>
                  <Link to="/auth-two-step-verification-2">
                    {props.t("Two Step Verification 2")}
                  </Link>
                </li>
              </ul>
            </li>
          </ul>
        </div>
      </SimpleBar>
    </>
  )
}

SidebarContent.propTypes = {
  location: PropTypes.object,
  t: PropTypes.any,
}

export default withTranslation()(SidebarContent)
