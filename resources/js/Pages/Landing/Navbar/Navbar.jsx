import PropTypes from "prop-types";
import React, { useState } from "react";
import {
    Nav,
    NavbarToggler,
    NavItem,
    NavLink,
    Container,
    Collapse,
} from "reactstrap";
import { Link } from "@inertiajs/react";
import ScrollspyNav from "./scrollSpy";

//Import Images
import masterlogo from "../../../../assets/images/masterlogo.png";

const navItems = [
    { id: 1, idnm: "home", navheading: "Home" },
    { id: 2, idnm: "about", navheading: "About" },
    { id: 3, idnm: "features", navheading: "Features" },
    { id: 3, idnm: "roadmap", navheading: "Roadmap" },
    { id: 4, idnm: "team", navheading: "Team" },
    // { id: 5, idnm: "news", navheading: "News" },
    // { id: 6, idnm: "faqs", navheading: "FAQs" },
];

const Navbar_Page = (props) => {
    const [isOpenMenu, setisOpenMenu] = useState(false);

    //Store all NavigationbaFr Id into TargetID variable(Used for Scrollspy)
    let TargetId = navItems.map((item) => {
        return item.idnm;
    });

    const toggle = () => {
        setisOpenMenu(!isOpenMenu);
    };

    return (
        <>
            <nav
                className={
                    "navbar navbar-expand-lg navigation fixed-top sticky " +
                    props.navClass
                }
            >
                <Container>
                    <Link className="navbar-logo" href="/#">
                        <img
                            src={masterlogo}
                            alt="masterlogo"
                            height="52"
                            className="logo"
                        />
                    </Link>

                    <NavbarToggler
                        className="px-3 font-size-16 d-lg-none header-item"
                        onClick={() => {
                            toggle();
                        }}
                    >
                        <i className="fa fa-fw fa-bars" />
                    </NavbarToggler>

                    <Collapse
                        id="topnav-menu-content"
                        isOpen={isOpenMenu}
                        navbar
                    >
                        <ScrollspyNav
                            scrollTargetIds={TargetId}
                            scrollDuration="800"
                            headerBackground="true"
                            activeNavClass="active"
                            className="navbar-collapse"
                        >
                            <Nav
                                className="ms-auto navbar-nav"
                                id="topnav-menu"
                            >
                                {navItems.map((item, key) => (
                                    <NavItem
                                        key={key}
                                        className={
                                            item.navheading === "Home"
                                                ? "active"
                                                : ""
                                        }
                                    >
                                        <NavLink href={"#" + item.idnm}>
                                            {" "}
                                            {item.navheading}
                                        </NavLink>
                                    </NavItem>
                                ))}
                            </Nav>
                        </ScrollspyNav>
                        <div className="my-2 ms-lg-2">
                            <Link
                                href={route("login")}
                                className="btn btn-outline-success w-xs"
                            >
                                Sign in
                            </Link>
                        </div>
                    </Collapse>
                </Container>
            </nav>
        </>
    );
};

Navbar_Page.propTypes = {
    imglight: PropTypes.any,
    navClass: PropTypes.string,
};

export default Navbar_Page;
