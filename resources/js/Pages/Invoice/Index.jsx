import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { Head, Link, router } from "@inertiajs/react";
import { isEmpty } from "lodash";
import { Button, Card, CardBody, Col, Container, Form, Input, Nav, NavItem, NavLink, Row, TabContent, TabPane } from "reactstrap";
import classnames from "classnames"

import "../../../assets/scss/datatables.scss";

//Import Breadcrumb
import Breadcrumb from "../../Layouts/Partials/Breadcrumb";
import InvoiceTable from "./InvoiceTable";
import InvoiceCard from "./InvoiceCard";
import PayModal from "./Partials/PayModal";

import { currencyFormat, formatDate } from "@/helpers/formatValue";


//redux
import { useSelector, useDispatch } from "react-redux";

const Invoice = (props) => {

    const counts = props.count;
    const [trans, setTrans] = useState(props.trans);

    const [payInvoice, setPayInvoice] = useState();
    const [payModal, setPayModal] = useState(false);

    const [activeTab, setActiveTab] = useState("1");

    const toggleTab = (tab) => {
        if (activeTab !== tab) {
            setActiveTab(tab);
        }
    };

    const handleCashPayEvent = () => {
        const invoice_id = payInvoice.id
        const invoice_status = "paid"
        const method = "cash"

        // console.log(invoice_id, invoice_status, method)
        router.visit(`/invoice/${invoice_id}`, {
            method: 'put',
            data: {
                id: invoice_id,
                status: invoice_status,
                method: method,
            },
            replace: false,
            preserveState: false,
            preserveScroll: true,
        })
        setPayModal(false);
        setPayInvoice();
    };

    const handleTransPayEvent = () => {
        const invoice_id = payInvoice.id
        const invoice_status = "paid"
        const method = "transfer"

        // console.log(invoice_id, invoice_status, method)
        router.visit(`/invoice/${invoice_id}`, {
            method: 'put',
            data: {
                id: invoice_id,
                status: invoice_status,
                method: method,
            },
            replace: true,
            preserveState: true,
            preserveScroll: true,
        })
        setPayModal(false);
        setPayInvoice();
    };


    return (
        <>
            <Head title="Invoice" />

            <PayModal
                show={payModal}
                onCashClick={handleCashPayEvent}
                onTransClick={handleTransPayEvent}
                onCloseClick={() => setPayModal(false)}
            />
            <div className="page-content">
                <Container fluid>
                    {/* Render Breadcrumb */}
                    <Breadcrumb title="Invoice" breadcrumbItem="Invoice" />

                        <Row className="mb-3">
                            <Col xl="9" sm="6">
                                <div className="d-flex">
                                    <div className="mx-1 align-self-center">
                                        <i className="mdi mdi-ethereum h2 text-primary mb-0" />
                                    </div>
                                    <div className="flex-grow-1">
                                        <p className="text-muted mb-0">
                                            Total
                                        </p>
                                        <h5 className="mb-0">
                                            <span className="font-size-12 text-muted">
                                            {currencyFormat(counts.total)}
                                            </span>
                                        </h5>
                                    </div>

                                    <div className="mx-1 align-self-center">
                                        <i className="mdi mdi-ethereum h2 text-success mb-0" />
                                    </div>
                                    <div className="flex-grow-1">
                                        <p className="text-muted mb-0">
                                            Paid
                                        </p>
                                        <h5 className="mb-0">
                                            <span className="font-size-12 text-muted">
                                            {currencyFormat(counts.paid)}
                                            </span>
                                        </h5>
                                    </div>

                                    <div className="mx-1 align-self-center">
                                        <i className="mdi mdi-ethereum h2 text-danger mb-0" />
                                    </div>
                                    <div className="flex-grow-1">
                                        <p className="text-muted mb-0">
                                            Unpaid
                                        </p>
                                        <h5 className="mb-0">
                                            <span className="font-size-12 text-muted">
                                            {currencyFormat(counts.unpaid)}
                                            </span>
                                        </h5>
                                    </div>
                                </div>
                            </Col>
                            <Col lg="3" sm="6">
                            <Form className="mt-4 mt-sm-0 float-sm-end d-flex align-items-center">
                                <Nav className="product-view-nav" pills>
                                <NavItem>
                                    <NavLink
                                    className={classnames({
                                        active: activeTab === "1",
                                    })}
                                    onClick={() => {
                                        toggleTab("1")
                                    }}
                                    >
                                    <i className="bx bx-list-ul" />
                                    </NavLink>
                                </NavItem>
                                <NavItem>
                                    <NavLink
                                    className={classnames({
                                        active: activeTab === "2",
                                    })}
                                    onClick={() => {
                                        toggleTab("2")
                                    }}
                                    >
                                    <i className="bx bx-grid-alt" />
                                    </NavLink>
                                </NavItem>
                                </Nav>
                            </Form>
                            </Col>
                        </Row>

                        <Row>
                            <TabContent activeTab={activeTab}>
                                <TabPane tabId="1" id="table">
                                    <InvoiceTable
                                        trans={trans}
                                        activeTab={activeTab}
                                        toggleTab={toggleTab}
                                        setPayModal={setPayModal}
                                        setPayInvoice={setPayInvoice}
                                    />
                                </TabPane>
                                <TabPane tabId="2" id="grid">
                                    <InvoiceCard
                                        trans={trans}
                                        setPayModal={setPayModal}
                                        setPayInvoice={setPayInvoice}
                                    />
                                </TabPane>
                            </TabContent>
                        </Row>
                </Container>
            </div>
        </>
    );
};

Invoice.propTypes = {
    trans: PropTypes.any,
};

export default Invoice;
