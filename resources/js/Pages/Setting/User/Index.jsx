import React, { useState } from "react";
import { Head } from "@inertiajs/react";
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
import UserList from "./UserList";

const User = (props) => {
    const users = props.users;

    const [isOpen, setIsOpen] = useState(false);
    const toggle = () => setIsOpen(!isOpen);

    return (
        <>
            <Head title="User Setting" />
            <div className="page-content">
                <Container fluid>
                    {/* Render Breadcrumbs */}
                    <Breadcrumbs title="Setting" breadcrumbItem="User" />

                    <Row>
                        <Col lg={12}>
                            <Card className="job-filter">
                                <CardBody>
                                    <form action="#">
                                        <Row className="g-3">
                                            <Col xxl={2} lg={6}>
                                                <div className="position-relative">
                                                    <div id="datepicker1">
                                                        <Input
                                                            type="text"
                                                            className="form-control"
                                                            placeholder="Select date"
                                                            data-date-format="dd M, yyyy"
                                                            data-date-autoclose="true"
                                                            data-date-container="#datepicker1"
                                                            data-provide="datepicker"
                                                        />
                                                    </div>
                                                </div>
                                            </Col>

                                            <Col xxl={2} lg={6}>
                                                <div className="position-relative h-100 hstack gap-3">
                                                    <button
                                                        type="submit"
                                                        className="btn btn-primary h-100 w-100"
                                                    >
                                                        <i className="bx bx-search-alt align-middle"></i>{" "}
                                                        Find Jobs
                                                    </button>
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
                                    </form>
                                </CardBody>
                            </Card>
                        </Col>
                    </Row>

                    <UserList data={users} />
                </Container>
            </div>
        </>
    );
};

export default User;
