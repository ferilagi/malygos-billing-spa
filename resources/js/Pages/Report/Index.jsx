import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { Head, Link, router } from "@inertiajs/react";
import { isEmpty } from "lodash";
import { Button , Card, CardBody, Col, Container, Form, FormGroup, InputGroup, Label, Row } from "reactstrap";

//Import Breadcrumb
import Breadcrumbs from "../../Layouts/Partials/Breadcrumb";
import ReportTable from "./ReportTable";

//Import Flatepicker
import "flatpickr/dist/themes/dark.css";
import Flatpickr from "react-flatpickr";

//redux
import { useSelector, useDispatch } from "react-redux";

const Report = (props) => {
    const dispatch = useDispatch();

    const trans = props.trans;

    const [search, setSearch] = useState("");
    const [period, setPeriod] = useState("");
    const [filters, setFilters] = useState(trans);

    const [isMenu, setIsMenu] = useState(false);
    const [activeTab, setActiveTab] = useState("1");

    const toggleTab = (tab) => {
        if (activeTab !== tab) {
            setActiveTab(tab);
        }
    };

    const toggleMenu = () => {
        setIsMenu(!isMenu);
    };

    const handleSearch = (e) => {
        setSearch(e.target.value);
        e.preventDefault();
    };

    useEffect(() => {
        // fixthrottled.current(search), [search]
        const deBounce = setTimeout(() => {
            if (search == "") {
                setFilters(trans);
            } else {
                // console.log("event.target.value",event.target.value);
                let filtered = trans.filter((item) => {
                    return (
                        item.id == search ||
                        item.name
                            .toLowerCase()
                            .includes(search.toLowerCase()) ||
                        item.type
                            .toLowerCase()
                            .includes(search.toLowerCase()) ||
                        item.alias
                            .toLowerCase()
                            .includes(search.toLowerCase()) ||
                        item.total
                            .toString()
                            .includes(search.toLowerCase()) ||
                        item.status
                            .toLowerCase()
                            .includes(search.toLowerCase()) ||
                        item.owner.toLowerCase().includes(search.toLowerCase())
                    );
                });
                setFilters(filtered);
            }
        }, 500);
        return () => clearTimeout(deBounce);
    }, [search]);

    const handlePeriod = (e) => {
        e.preventDefault();
        // console.log(period)

        router.get('/report',{rangePeriod: period}, {
            // preserveState: true,
            replace:true,
            onSuccess: () => {
                return Promise.all([
                    setFilters(props.trans)
                ])
              }
        });


    };

    const currencyFormat = (num) => {
        return "IDR " + num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
    };

    // useEffect(() => {
    //     // fixthrottled.current(search), [search]
    //     const deBounce = setTimeout(() => {
    //         router.reload('/report',{rangePeriod: period}, {
    //             preserveState: true,
    //             replace:true,
    //         });
    //     }, 500);
    //     return () => clearTimeout(deBounce);
    // }, [period]);

    return (
        <>
            <Head title="Report" />
            <div className="page-content">
                <Container fluid>
                    {/* Render Breadcrumb */}
                    <Breadcrumbs title="Report" breadcrumbItem="Report" />

                    <Card>
                        <CardBody>
                        <Row mb={3}>
                            <Col md={6}>
                            <Form onSubmit={handlePeriod}>
                                <Label>('translation.Date_Range')</Label>
                                <div className="form-group mb-3">
                                    <InputGroup className="input-daterange input-group">
                                        <Flatpickr
                                        name="rangePeriod"
                                        className="form-control"
                                        selected={period}
                                        onChange={(e, dateStr) => setPeriod(dateStr)}
                                        options={{
                                            altInput: true,
                                            mode: "range",
                                            altFormat: "F j, Y",
                                            dateFormat: "Y-m-d",
                                        }}
                                        />
                                        <button
                                        type="submit"
                                        disabled={period === ""}
                                        className="btn btn-sm btn-primary waves-effect waves-light">
                                            <span className="bx bx-search-alt me-1"></span>
                                            Periode
                                        </button>
                                    </InputGroup>
                                </div>
                            </Form>
                            </Col>
                            <Col md={6}>
                                <Row className="mt-4 float-end">
                                <div className="hstack gap-3">
                                    <Col>
                                        <p className="mb-3">('translation.Total')</p>
                                        <h5 className="mb-3 text-center">{currencyFormat(props.reports.sum)}</h5>
                                    </Col>
                                    <Col>
                                        <p className="mb-3">('translation.Paid')</p>
                                        <h5 className="mb-3 text-center">{currencyFormat(props.reports.plussum)}</h5>
                                    </Col>
                                    <Col>
                                        <p className="mb-3 ">('translation.Unpaid')</p>
                                        <h5 className="mb-3 text-center">{currencyFormat(props.reports.negsum)}</h5>
                                    </Col>
                                    </div>
                                </Row>
                            </Col>
                        </Row>
                        </CardBody>
                    </Card>
                    <Row>
                        <Col lg="12">
                            <ReportTable
                                trans={filters}
                                activeTab={activeTab}
                                toggleTab={toggleTab}
                            />
                        </Col>
                    </Row>
                </Container>
            </div>
        </>
    );
};

Report.propTypes = {
    trans: PropTypes.any,
};

export default Report;
