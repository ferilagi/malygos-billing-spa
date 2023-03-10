import { Link, usePage } from "@inertiajs/react";
import PropTypes from "prop-types";
import React, { useEffect, useState } from "react";

import {
    changeLayout,
    changeLayoutMode,
    changeSidebarTheme,
    changeSidebarThemeImage,
    changeSidebarType,
    changeTopbarTheme,
    changeLayoutWidth,
    showRightSidebarAction,
} from "../store/actions";

import TopBar from "./Partials/TopBar";
import Sidebar from "./Partials/SideBar";
import Footer from "./Partials/Footer";
import RightSidebar from "./Partials/RightSidebar";
import ToastComp from "./Partials/ToastComp";

//redux
import { useSelector, useDispatch } from "react-redux";

const MainLayout = ({ header, children, props }) => {

    const toastData = usePage().props.toast;

    const dispatch = useDispatch();

    const {
        isPreloader,
        leftSideBarThemeImage,
        layoutWidth,
        leftSideBarType,
        topbarTheme,
        showRightSidebar,
        leftSideBarTheme,
        layoutModeType,
    } = useSelector((state) => ({
        isPreloader: state.Layout.isPreloader,
        layoutModeType: state.Layout.layoutModeType,
        leftSideBarThemeImage: state.Layout.leftSideBarThemeImage,
        leftSideBarType: state.Layout.leftSideBarType,
        layoutWidth: state.Layout.layoutWidth,
        topbarTheme: state.Layout.topbarTheme,
        showRightSidebar: state.Layout.showRightSidebar,
        leftSideBarTheme: state.Layout.leftSideBarTheme,
    }));

    const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);

    const toggleMenuCallback = () => {
        if (leftSideBarType === "default") {
            dispatch(changeSidebarType("condensed", isMobile));
        } else if (leftSideBarType === "condensed") {
            dispatch(changeSidebarType("default", isMobile));
        }
    };

    //hides right sidebar on body click
    const hideRightbar = (event) => {
        var rightbar = document.getElementById("right-bar");
        //if clicked in inside right bar, then do nothing
        if (rightbar && rightbar.contains(event.target)) {
            return;
        } else {
            //if clicked in outside of rightbar then fire action for hide rightbar
            dispatch(showRightSidebarAction(false));
        }
    };

    // const autoHideLeftSidebar = (event) => {
    //     var bd = document.body;
    //     var vmenu = document.getElementById("vertical-menu");
    //     var vmenubutton = document.getElementById("vertical-menu-btn");
    //     //if clicked in inside right bar, then do nothing
    //     if (window.screen.width <= 998) {
    //         if (vmenu && vmenu.contains(event.target)) {
    //             return;
    //         } else {
    //             //if clicked in outside of rightbar then fire action for hide rightbar
    //             bd.classList.remove("sidebar-enable");
    //         }
    //     }
    // };


    /*
    layout  settings
    */

    useEffect(() => {
        //init body click event fot toggle rightbar
        document.body.addEventListener("click", hideRightbar, true);
        // document.body.addEventListener("click", autoHideLeftSidebar, true);

        if (isPreloader === true) {
            document.getElementById("preloader").style.display = "block";
            document.getElementById("status").style.display = "block";

            setTimeout(function () {
                document.getElementById("preloader").style.display = "none";
                document.getElementById("status").style.display = "none";
            }, 2500);
        } else {
            document.getElementById("preloader").style.display = "none";
            document.getElementById("status").style.display = "none";
        }
    }, [isPreloader]);

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    useEffect(() => {
        dispatch(changeLayout("vertical"));
    }, [dispatch]);

    useEffect(() => {
        if (leftSideBarTheme) {
            dispatch(changeSidebarTheme(leftSideBarTheme));
        }
    }, [leftSideBarTheme, dispatch]);

    useEffect(() => {
        if (layoutModeType) {
            dispatch(changeLayoutMode(layoutModeType));
        }
    }, [layoutModeType, dispatch]);

    useEffect(() => {
        if (leftSideBarThemeImage) {
            dispatch(changeSidebarThemeImage(leftSideBarThemeImage));
        }
    }, [leftSideBarThemeImage, dispatch]);

    useEffect(() => {
        if (layoutWidth) {
            dispatch(changeLayoutWidth(layoutWidth));
        }
    }, [layoutWidth, dispatch]);

    useEffect(() => {
        if (leftSideBarType) {
            dispatch(changeSidebarType(leftSideBarType));
        }
    }, [leftSideBarType, dispatch]);

    useEffect(() => {
        if (topbarTheme) {
            dispatch(changeTopbarTheme(topbarTheme));
        }
    }, [topbarTheme, dispatch]);

    return (
        <>
            <ToastComp toastData={toastData} />

            <div id="preloader">
                <div id="status">
                    <div className="spinner-chase">
                        <div className="chase-dot" />
                        <div className="chase-dot" />
                        <div className="chase-dot" />
                        <div className="chase-dot" />
                        <div className="chase-dot" />
                        <div className="chase-dot" />
                    </div>
                </div>
            </div>

            <div id="layout-wrapper">
                <TopBar toggleMenuCallback={toggleMenuCallback} />
                <Sidebar
                theme={leftSideBarTheme}
                type={leftSideBarType}
                isMobile={isMobile}
                />
                <div className="main-content">{children}</div>
                <Footer />
            </div>

            {showRightSidebar ? <RightSidebar /> : null}
        </>
    );
};

MainLayout.propTypes = {
    changeLayoutWidth: PropTypes.func,
    changeSidebarTheme: PropTypes.func,
    changeSidebarThemeImage: PropTypes.func,
    changeSidebarType: PropTypes.func,
    changeTopbarTheme: PropTypes.func,
    children: PropTypes.object,
    isPreloader: PropTypes.any,
    layoutWidth: PropTypes.any,
    leftSideBarTheme: PropTypes.any,
    leftSideBarThemeImage: PropTypes.any,
    leftSideBarType: PropTypes.any,
    location: PropTypes.object,
    showRightSidebar: PropTypes.any,
    topbarTheme: PropTypes.any,
};

export default MainLayout;
