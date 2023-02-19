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
import TopArea from "./Partials/TopArea";
import NewSubscribers from "./Partials/NewSubscribers";

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

    const substype = props.substype;
    const totalsubs = props.totalsubs;
    const comm = props.comm;
    const monthly = props.monthly;
    const areas = props.areas;

    const { chartsData } = useSelector((state) => ({
        chartsData: state.Dashboard.chartsData,
    }));

    const currFormat = (num) => {
        return "IDR " + num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
    };

    // useEffect(() => {
    //     setTimeout(() => {
    //         setSubscribemodal(true);
    //     }, 2000);
    // }, []);

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
                            <WelcomeComp totalsubs={totalsubs} comm={comm} />
                            <MonthlyEarning monthly={monthly} />
                        </Col>

                        <Col xl="8">
                            <Row>
                                {/* Reports Render */}
                                {substype.map((st, key) => (
                                    <Col md="6" key={"_col_" + key}>
                                        <Card className="mini-stats-wid">
                                            <CardBody>

                                                <h5 className="text-muted mb-4">
                                                    <i className="mdi h2 text-warning align-middle mb-0 me-3"></i> {st.type} {`{ ${st.total} }`}
                                                </h5>

                                                <div className="row">
                                                    <div className="col-6">
                                                        <div>
                                                            <h6 className="text-truncate">{`{ ${st.paid} }`} Paid</h6>
                                                            <p className="text-muted text-truncate mb-0">{currFormat(st.earn)}<i className="mdi mdi-arrow-up ms-1 text-success"></i></p>
                                                        </div>
                                                    </div>
                                                    <div className="col-6">
                                                        <div>
                                                            <h6 className="text-truncate">{`{ ${st.total - st.paid} }`} Unpaid</h6>
                                                            <p className="text-muted text-truncate mb-0">{currFormat(st.debt)}<i className="mdi mdi-arrow-down ms-1 text-danger"></i></p>
                                                        </div>
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
                            <ActivityComp />
                        </Col>

                        <Col xl="4">
                            <NewSubscribers />
                        </Col>

                        <Col xl="4">
                            <TopArea areas={areas}/>
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
