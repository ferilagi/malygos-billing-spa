import React, { useState } from "react";
import { Head, Link } from "@inertiajs/react";
import {
    Card,
    CardBody,
    Col,
    Container,
    Row,
    Collapse,
    Label,
    Input,
} from "reactstrap";

//Import Breadcrumb
import Breadcrumbs from "../../../Layouts/Partials/Breadcrumb";
import DatePicker from "react-flatpickr";
import StaticData from "./StaticData";

const PlanStatic = (props) => {

    const sprofiles = props.sprofiles

    const [selectDate, setSelectDate] = useState();
    const dateChange = (date) => {
        setSelectDate(date)
    };

    const [isOpen, setIsOpen] = useState(false);
    const toggle = () => setIsOpen(!isOpen);

    return (
        <>
            <Head title="Plan" />
            <div className="page-content">
                <Container fluid>
                    {/* Render Breadcrumbs */}
                    <Breadcrumbs title="Plan" breadcrumbItem="Static" />

                    <Row>
                        <Col lg={12}>
                            <Card className="ppp-plan">
                                <CardBody>

                                        <Row className="g-3">

                                            <Col xxl={4} lg={6}>
                                                <div className="position-relative h-100 hstack gap-3">

                                                    <Link href="/plan/ppp" className="btn btn-primary h-100 w-100">
                                                        <i className="bx bx-server align-middle"></i>{"  "}
                                                            PPP Plan
                                                    </Link>

                                                    <a
                                                        href="#"
                                                        onClick={toggle}
                                                        className="btn btn-secondary h-100 w-100"
                                                    >
                                                        <i className="bx bx-filter-alt align-middle"></i>{" "}
                                                        Advance
                                                    </a>


                                                </div>
                                            </Col>

                                            <Col xxl={4} lg={6}>
                                                <div className="position-relative">
                                                    <div id="datepicker1">
                                                    <DatePicker
                                                        className="form-control"
                                                        selected={selectDate}
                                                        onChange={dateChange}
                                                    />
                                                    </div>
                                                </div>
                                            </Col>

                                            <Collapse
                                                isOpen={isOpen}
                                                id="collapseExample"
                                            >
                                                <div>
                                                    <Row className="g-3">
                                                        <Col xxl={4} lg={6}>
                                                            <div>
                                                                <Label
                                                                    htmlFor="experience"
                                                                    className="form-label fw-semibold"
                                                                >
                                                                    Experience
                                                                </Label>
                                                            </div>
                                                            <div className="form-check form-check-inline">
                                                                <Input
                                                                    className="form-check-input"
                                                                    type="checkbox"
                                                                    id="inlineCheckbox1"
                                                                    value="option1"
                                                                />
                                                                <Label
                                                                    className="form-check-label"
                                                                    htmlFor="inlineCheckbox1"
                                                                >
                                                                    All
                                                                </Label>
                                                            </div>
                                                            <div className="form-check form-check-inline">
                                                                <Input
                                                                    className="form-check-input"
                                                                    type="checkbox"
                                                                    id="inlineCheckbox2"
                                                                    value="option1"
                                                                />
                                                                <Label
                                                                    className="form-check-label"
                                                                    htmlFor="inlineCheckbox2"
                                                                >
                                                                    Fresher
                                                                </Label>
                                                            </div>
                                                            <div className="form-check form-check-inline">
                                                                <Input
                                                                    className="form-check-input"
                                                                    type="checkbox"
                                                                    id="inlineCheckbox3"
                                                                    value="option2"
                                                                />
                                                                <Label
                                                                    className="form-check-label"
                                                                    htmlFor="inlineCheckbox3"
                                                                >
                                                                    1-2
                                                                </Label>
                                                            </div>
                                                            <div className="form-check form-check-inline">
                                                                <Input
                                                                    className="form-check-input"
                                                                    type="checkbox"
                                                                    id="inlineCheckbox4"
                                                                    value="option2"
                                                                />
                                                                <Label
                                                                    className="form-check-label"
                                                                    htmlFor="inlineCheckbox4"
                                                                >
                                                                    2-3
                                                                </Label>
                                                            </div>
                                                            <div className="form-check form-check-inline">
                                                                <Input
                                                                    className="form-check-input"
                                                                    type="checkbox"
                                                                    id="inlineCheckbox5"
                                                                    value="option3"
                                                                />
                                                                <Label
                                                                    className="form-check-label"
                                                                    htmlFor="inlineCheckbox5"
                                                                >
                                                                    4+
                                                                </Label>
                                                            </div>
                                                        </Col>
                                                        <Col xxl={4} lg={6}>
                                                            <div>
                                                                <Label
                                                                    htmlFor="jobType"
                                                                    className="form-label fw-semibold"
                                                                >
                                                                    Job Type
                                                                </Label>
                                                            </div>
                                                            <div className="form-check form-check-inline">
                                                                <Input
                                                                    className="form-check-input"
                                                                    type="checkbox"
                                                                    id="inlineCheckbox6"
                                                                    value="option3"
                                                                />
                                                                <Label
                                                                    className="form-check-label"
                                                                    htmlFor="inlineCheckbox6"
                                                                >
                                                                    Full Time
                                                                </Label>
                                                            </div>
                                                            <div className="form-check form-check-inline">
                                                                <Input
                                                                    className="form-check-input"
                                                                    type="checkbox"
                                                                    id="inlineCheckbox7"
                                                                    value="option3"
                                                                />
                                                                <Label
                                                                    className="form-check-label"
                                                                    htmlFor="inlineCheckbox7"
                                                                >
                                                                    Part Time
                                                                </Label>
                                                            </div>
                                                            <div className="form-check form-check-inline">
                                                                <Input
                                                                    className="form-check-input"
                                                                    type="checkbox"
                                                                    id="inlineCheckbox8"
                                                                    value="option3"
                                                                />
                                                                <Label
                                                                    className="form-check-label"
                                                                    htmlFor="inlineCheckbox8"
                                                                >
                                                                    Freelance
                                                                </Label>
                                                            </div>
                                                            <div className="form-check form-check-inline">
                                                                <Input
                                                                    className="form-check-input"
                                                                    type="checkbox"
                                                                    id="inlineCheckbox9"
                                                                    value="option3"
                                                                />
                                                                <Label
                                                                    className="form-check-label"
                                                                    htmlFor="inlineCheckbox9"
                                                                >
                                                                    Internship
                                                                </Label>
                                                            </div>
                                                        </Col>
                                                        <Col xxl={4} lg={4}>
                                                            <div className="position-relative">
                                                                <Label
                                                                    htmlFor="qualificationInput"
                                                                    className="form-label fw-semibold"
                                                                >
                                                                    Qualification
                                                                </Label>
                                                                <Input
                                                                    type="text"
                                                                    className="form-control"
                                                                    id="qualificationInput"
                                                                    autoComplete="off"
                                                                    placeholder="Qualification"
                                                                />
                                                                <i className="ri-government-line filter-icon"></i>
                                                            </div>
                                                        </Col>
                                                    </Row>
                                                </div>
                                            </Collapse>
                                        </Row>
                                </CardBody>
                            </Card>
                        </Col>
                    </Row>

                    <StaticData sprofiles={sprofiles} />

                </Container>
            </div>
        </>
    );
};

export default PlanStatic;
