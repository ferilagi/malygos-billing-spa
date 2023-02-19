import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { Head, Link, router } from "@inertiajs/react";
import { isEmpty } from "lodash";
import { Button, Card, CardBody, Col, Container, Row } from "reactstrap";
import "../../../assets/scss/datatables.scss";

//Import Breadcrumb
import Breadcrumbs from "../../Layouts/Partials/Breadcrumb";
import InvoiceTable from "./InvoiceTable";
import PayModal from "./Partials/PayModal";


//redux
import { useSelector, useDispatch } from "react-redux";

const Invoice = (props) => {
    const dispatch = useDispatch();

    const [trans, setTrans] = useState(props.trans);

    const [payInvoice, setPayInvoice] = useState();
    const [payModal, setPayModal] = useState(false);

    const [isMenu, setIsMenu] = useState(false);
    const [activeTab, setActiveTab] = useState("1");

    // useEffect(() => {
    //   dispatch(onGetWallet());
    // }, [onGetWallet]);

    const toggleTab = (tab) => {
        if (activeTab !== tab) {
            setActiveTab(tab);
        }
    };

    const toggleMenu = () => {
        setIsMenu(!isMenu);
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
            replace: false,
            preserveState: false,
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
                    <Breadcrumbs title="Invoice" breadcrumbItem="Invoice" />

                    <Row>
                        <Col md={4}>
                            <Card className="mini-stats-wid">
                                <CardBody>
                                    <div className="d-flex">
                                        <div className="me-3 align-self-center">
                                            <i className="mdi mdi-bitcoin h2 text-warning mb-0" />
                                        </div>
                                        <div className="flex-grow-1">
                                            <p className="text-muted mb-2">
                                                Bitcoin Wallet
                                            </p>
                                            <h5 className="mb-0">
                                                1.02356 BTC{" "}
                                                <span className="font-size-14 text-muted">
                                                    = $ 9148.00
                                                </span>
                                            </h5>
                                        </div>
                                    </div>
                                </CardBody>
                            </Card>
                        </Col>
                        <Col md={4}>
                            <Card className="mini-stats-wid">
                                <CardBody>
                                    <div className="d-flex">
                                        <div className="me-3 align-self-center">
                                            <i className="mdi mdi-ethereum h2 text-primary mb-0" />
                                        </div>
                                        <div className="flex-grow-1">
                                            <p className="text-muted mb-2">
                                                Ethereum Wallet
                                            </p>
                                            <h5 className="mb-0">
                                                0.04121 ETH{" "}
                                                <span className="font-size-14 text-muted">
                                                    = $ 8235.00
                                                </span>
                                            </h5>
                                        </div>
                                    </div>
                                </CardBody>
                            </Card>
                        </Col>
                        <Col md={4}>
                            <Card className="mini-stats-wid">
                                <CardBody>
                                    <div className="d-flex">
                                        <div className="me-3 align-self-center">
                                            <i className="mdi mdi-litecoin h2 text-info mb-0" />
                                        </div>
                                        <div className="flex-grow-1">
                                            <p className="text-muted mb-2">
                                                litecoin Wallet
                                            </p>
                                            <h5 className="mb-0">
                                                0.00356 BTC{" "}
                                                <span className="font-size-14 text-muted">
                                                    = $ 4721.00
                                                </span>
                                            </h5>
                                        </div>
                                    </div>
                                </CardBody>
                            </Card>
                        </Col>
                    </Row>

                    <Row>
                        <Col>
                            <InvoiceTable
                                trans={trans}
                                activeTab={activeTab}
                                toggleTab={toggleTab}
                                setPayModal={setPayModal}
                                setPayInvoice={setPayInvoice}
                            />
                        </Col>
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
