import React from "react";
import {
    Container,
    Row,
    Col,
    Card,
    CardBody,
    CardHeader,
    Button,
} from "reactstrap";
import { Link } from "@inertiajs/react";

//Import Countdown
import Countdown from "react-countdown";

const renderer = ({ days, hours, minutes, seconds, completed }) => {
    if (completed) {
        // Render a completed state
        return (
            <>
                <div className="coming-box">
                    00
                    <span>Days</span>
                </div>
                <div className="coming-box">
                    00
                    <span>Hours</span>
                </div>
                <div className="coming-box">
                    00
                    <span>Minutes</span>
                </div>
                <div className="coming-box">
                    00
                    <span>Seconds</span>
                </div>
            </>
        );
    } else {
        // Render a countdown
        return (
            <>
                <div className="coming-box">
                    {days}
                    <span>Days</span>
                </div>
                <div className="coming-box">
                    {hours}
                    <span>Hours</span>
                </div>
                <div className="coming-box">
                    {minutes}
                    <span>Minutes</span>
                </div>
                <div className="coming-box">
                    {seconds}
                    <span>Seconds</span>
                </div>
            </>
        );
    }
};

const Section = () => {
    return (
        <>
            <section className="section hero-section bg-ico-hero" id="home">
                <div className="bg-overlay bg-primary" />
                <Container>
                    <Row className="align-items-center">
                        <Col lg="5">
                            <div className="text-white-50">
                                <h1 className="text-white fw-semibold mb-3 hero-title">
                                    #Malygos - Unintended Landing
                                </h1>
                                <p className="font-size-14">
                                    It will be as simple as occidental in fact
                                    to an English person, it will seem like
                                    simplified as a skeptical Cambridge
                                </p>

                                <div className="d-flex flex-wrap gap-2 mt-4">
                                    <a
                                        href="https://play.google.com/store/apps/details?id=com.ferilagi.malygos"
                                        target="_blank"
                                        className="btn btn-success"
                                    >
                                        Get the Apps
                                    </a>
                                    <Link to="#" className="btn btn-light">
                                        How it work
                                    </Link>
                                </div>
                            </div>
                        </Col>
                        <Col lg="5" md="8" sm="10" className="ms-lg-auto">
                            <Card className="overflow-hidden mb-0 mt-5 mt-lg-0">
                                <CardHeader className="text-center">
                                    <h5 className="mb-0">ICO Countdown time</h5>
                                </CardHeader>
                                <CardBody>
                                    <div className="text-center">
                                        <h5>Time left to Ico :</h5>
                                        <div className="mt-4">
                                            <div className="counter-number ico-countdown">
                                                <Countdown
                                                    date="2023/10/08"
                                                    renderer={renderer}
                                                />
                                            </div>
                                        </div>

                                        <div className="mt-4">
                                            <Button
                                                type="button"
                                                color="success"
                                                className="w-md"
                                            >
                                                Get Token
                                            </Button>
                                        </div>

                                        <div className="mt-5">
                                            <h4 className="font-weight-semibold">
                                                1 ETH = 2235 SKT
                                            </h4>
                                            <div className="clearfix mt-4">
                                                <h5 className="float-end font-size-14">
                                                    5234.43
                                                </h5>
                                            </div>
                                            <div className="progress p-1 progress-xl softcap-progress">
                                                <div
                                                    className="progress-bar bg-info"
                                                    role="progressbar"
                                                    style={{ width: "15%" }}
                                                    aria-valuenow="15"
                                                    aria-valuemin="0"
                                                    aria-valuemax="100"
                                                >
                                                    <div className="progress-label">
                                                        15 %
                                                    </div>
                                                </div>
                                                <div
                                                    className="progress-bar progress-bar-striped progress-bar-animated"
                                                    role="progressbar"
                                                    style={{ width: "30%" }}
                                                    aria-valuenow="30"
                                                    aria-valuemin="0"
                                                    aria-valuemax="100"
                                                >
                                                    <div className="progress-label">
                                                        30 %
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </CardBody>
                            </Card>
                        </Col>
                    </Row>
                </Container>
            </section>
        </>
    );
};

export default Section;
