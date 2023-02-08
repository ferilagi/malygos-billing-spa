import PropTypes from "prop-types";
import React, { useEffect, useState } from "react";

import { Head, Link } from "@inertiajs/react";

import classNames from "classnames";

import {
    Container,
    Row,
    Col,
    Button,
    Card,
    CardBody,
    Input,
    Modal,
    ModalHeader,
    ModalBody,
    ModalFooter,
    Table,
} from "reactstrap";

// Dasboard Partial Components
import WelcomeComp from "./Partials/WelcomeComp";
import MonthlyEarning from "./Partials/MonthlyEarning";
import SocialSource from "./Partials/SocialSource";
import ActivityComp from "./Partials/ActivityComp";
import TopCities from "./Partials/TopCities";

//import Charts
import StackedColumnChart from "./Partials/StackedColumnChart";
//import action
import { getChartsData as onGetChartsData } from "../../store/actions";

//Import Breadcrumb
import Breadcrumbs from "../../Layouts/Partials/Breadcrumb";

//i18n
import { withTranslation } from "react-i18next";

//redux
import { useSelector, useDispatch } from "react-redux";

const Dashboard = (props) => {
    const [modal, setmodal] = useState(false);
    const [subscribemodal, setSubscribemodal] = useState(false);

    const { chartsData } = useSelector((state) => ({
        chartsData: state.Dashboard.chartsData,
    }));

    const reports = [
        { title: "Orders", iconClass: "bx-copy-alt", description: "1,235" },
        {
            title: "Revenue",
            iconClass: "bx-archive-in",
            description: "$35, 723",
        },
        {
            title: "Average Price",
            iconClass: "bx-purchase-tag-alt",
            description: "$16.2",
        },
    ];

    useEffect(() => {
        setTimeout(() => {
            setSubscribemodal(true);
        }, 2000);
    }, []);

    const [periodData, setPeriodData] = useState([]);
    const [periodType, setPeriodType] = useState("yearly");

    useEffect(() => {
        setPeriodData(chartsData);
    }, [chartsData]);

    const onChangeChartPeriod = (pType) => {
        setPeriodType(pType);
        dispatch(onGetChartsData(pType));
    };

    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(onGetChartsData("yearly"));
    }, [dispatch]);

    return (
        <>
            <Head title="Dashboard" />
            <div className="page-content">
                <Container fluid>
                    <Breadcrumbs title="Dashboard" breadcrumbItem="Dashboard" />

                    <Row>
                        <Col xl="4">
                            <WelcomeComp />
                            <MonthlyEarning />
                        </Col>

                        <Col xl="8">
                            <Row>
                                {/* Reports Render */}
                                {reports.map((report, key) => (
                                    <Col md="4" key={"_col_" + key}>
                                        <Card className="mini-stats-wid">
                                            <CardBody>
                                                <div className="d-flex">
                                                    <div className="flex-grow-1">
                                                        <p className="text-muted fw-medium">
                                                            {report.title}
                                                        </p>
                                                        <h4 className="mb-0">
                                                            {report.description}
                                                        </h4>
                                                    </div>
                                                    <div className="avatar-sm rounded-circle bg-primary align-self-center mini-stat-icon">
                                                        <span className="avatar-title rounded-circle bg-primary">
                                                            <i
                                                                className={
                                                                    "bx " +
                                                                    report.iconClass +
                                                                    " font-size-24"
                                                                }
                                                            ></i>
                                                        </span>
                                                    </div>
                                                </div>
                                            </CardBody>
                                        </Card>
                                    </Col>
                                ))}
                            </Row>

                            <Card>
                                <CardBody>
                                    <div className="d-sm-flex flex-wrap">
                                        <h4 className="card-title mb-4">
                                            Email Sent
                                        </h4>
                                        <div className="ms-auto">
                                            <ul className="nav nav-pills">
                                                <li className="nav-item">
                                                    <Link
                                                        to="#"
                                                        className={classNames(
                                                            {
                                                                active:
                                                                    periodType ===
                                                                    "weekly",
                                                            },
                                                            "nav-link"
                                                        )}
                                                        onClick={() => {
                                                            onChangeChartPeriod(
                                                                "weekly"
                                                            );
                                                        }}
                                                        id="one_month"
                                                    >
                                                        Week
                                                    </Link>{" "}
                                                </li>
                                                <li className="nav-item">
                                                    <Link
                                                        to="#"
                                                        className={classNames(
                                                            {
                                                                active:
                                                                    periodType ===
                                                                    "monthly",
                                                            },
                                                            "nav-link"
                                                        )}
                                                        onClick={() => {
                                                            onChangeChartPeriod(
                                                                "monthly"
                                                            );
                                                        }}
                                                        id="one_month"
                                                    >
                                                        Month
                                                    </Link>
                                                </li>
                                                <li className="nav-item">
                                                    <Link
                                                        to="#"
                                                        className={classNames(
                                                            {
                                                                active:
                                                                    periodType ===
                                                                    "yearly",
                                                            },
                                                            "nav-link"
                                                        )}
                                                        onClick={() => {
                                                            onChangeChartPeriod(
                                                                "yearly"
                                                            );
                                                        }}
                                                        id="one_month"
                                                    >
                                                        Year
                                                    </Link>
                                                </li>
                                            </ul>
                                        </div>
                                    </div>
                                    {/* <div className="clearfix"></div> */}
                                    <StackedColumnChart
                                        periodData={periodData}
                                        dataColors='["--bs-primary", "--bs-warning", "--bs-success"]'
                                    />
                                </CardBody>
                            </Card>
                        </Col>
                    </Row>

                    <Row>
                        <Col xl="4">
                            <SocialSource />
                        </Col>
                        <Col xl="4">
                            <ActivityComp />
                        </Col>

                        <Col xl="4">
                            <TopCities />
                        </Col>
                    </Row>

                    {/* <Row>
              <Col lg="12">
                <LatestTransaction />
              </Col>
            </Row> */}
                </Container>
            </div>
        </>
    );
};

Dashboard.propTypes = {
    t: PropTypes.any,
    chartsData: PropTypes.any,
    onGetChartsData: PropTypes.func,
};

export default withTranslation()(Dashboard);
