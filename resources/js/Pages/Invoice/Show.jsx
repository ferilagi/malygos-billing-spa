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
    Table,
} from "reactstrap";

//Import Breadcrumb
import Breadcrumbs from "../../Layouts/Partials/Breadcrumb";

import logo from "../../../assets/images/logo-dark.png";

const InvoiceShow = (props) => {

    const invoiceDetail = props.invoice
    const prefix  = props.prefix
    const comp = props.comp

    //Print the Invoice
    const printInvoice = () => {
        window.print();
    };

    return (
        <>
            <Head title={`${invoiceDetail.invoice}-${invoiceDetail.name}`} />
            <div className="page-content">
                <Container fluid>
                    {/* Render Breadcrumbs */}
                    <Breadcrumbs title="Invoice" breadcrumbItem="Details" />

                    <Row>
                        <Col lg="12">
                            <Card>
                            <CardBody>
                                <div className="invoice-title">
                                    <h4 className="float-end font-size-16">
                                        {invoiceDetail.invoice}
                                    </h4>
                                    <div className="mb-4">
                                        <img src={comp.logo || logo} alt="logo" height="20" />
                                    </div>
                                </div>
                                <hr />
                                <Row>
                                    <Col className="text-end">
                                        <address className="mt-2 mt-sm-0">
                                            <strong>{comp.name}</strong> <br /><br />
                                            {comp.phone} <br />
                                            {comp.address} <br />
                                            {comp.state} <br />
                                            {comp.zipcode}
                                        </address>
                                    </Col>
                                </Row>
                                <hr />
                                <Row>
                                    <div className="col-6 mt-2">
                                        <address className="mt-2 mt-sm-0">
                                            <strong>Billed To :</strong> <br /><br />
                                            {invoiceDetail.name}<br />
                                            {invoiceDetail.phone}<br />
                                            {invoiceDetail.address}
                                        </address>
                                    </div>
                                    <div className="col-6 mt-2 text-end">
                                        <address className="mt-2 mt-sm-0">
                                            <strong>Period :</strong> <br />
                                            {invoiceDetail.date} <br /><br />
                                            <strong>Due Date :</strong> <br />
                                            {invoiceDetail.dueDate} <br /><br />
                                        </address>
                                    </div>
                                </Row>
                                <hr />
                                <div className="py-2 mt-2">
                                    <h3 className="font-size-15 font-weight-bold">('translation.Description')</h3>
                                </div>

                                <div className="table-responsive">
                                <Table className="table-nowrap">
                                    <thead>
                                        <tr>
                                            <th style={{ width: "20px" }}>No.</th>
                                            <th>Item</th>
                                            <th className="text-end">Price</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td className="font-size-12">01</td>
                                            <td>{ invoiceDetail.packet }</td>
                                            <td className="text-end">{ invoiceDetail.subtotal }</td>
                                        </tr>
                                        <tr>
                                            <td className="font-size-12">02</td>
                                            <td></td>
                                            <td className="text-end"></td>
                                        </tr>
                                        <tr>
                                            <td className="font-size-12">03</td>
                                            <td></td>
                                            <td className="text-end"></td>
                                        </tr>
                                        <tr>
                                            <td colSpan="2" className="border-0 text-end">
                                                <strong></strong></td>
                                            <td className="border-0 text-end"></td>
                                        </tr>
                                        <tr>
                                            <td colSpan="2" className="border-0 text-end">
                                                @lang('translation.Sub_Total') :</td>
                                            <td className="font-size-14 border-0 text-end"><b>{ invoiceDetail.subtotal}</b></td>
                                        </tr>
                                        <tr>
                                            <td colSpan="2" className="border-0 text-end">
                                                @lang('translation.Tax') :</td>
                                                {invoiceDetail.taxtotal === '0' ?
                                                    <td className="font-size-14 border-0 text-end"><b>-</b></td>
                                                :
                                                    <td className="font-size-14 border-0 text-end"><b>{ invoiceDetail.taxtotal }</b></td>
                                                }

                                        </tr>
                                        <tr>
                                            <td colSpan="2" className="border-0 text-end">
                                                <strong>@lang('translation.Total') :</strong></td>
                                            <td className="font-size-15 border-0 text-end"><b>{ invoiceDetail.total}</b></td>
                                        </tr>
                                        <tr>
                                            <td className="font-size-12 border-0">
                                                @lang('translation.Spelled') :</td>
                                            <td className="border-0"><h5 className="m-0"></h5></td>

                                        </tr>
                                        <tr>
                                            <td className="border-0 text-end"></td>
                                        </tr>
                                        <tr>
                                            <td></td>
                                            <td></td>
                                            <td></td>
                                        </tr>
                                        <tr>
                                            <td className="border-0 font-size-12">
                                                {comp.email}</td>
                                        </tr>
                                    </tbody>
                                </Table>
                                </div>
                                <div className="invoice-footer mt-4">
                                    <h5 className="text-center font-size-12">{ comp.slogan }</h5>
                                </div>
                                <div className="d-print-none">
                                <div className="float-end">
                                    <Link
                                    to="#"
                                    onClick={printInvoice}
                                    className="btn btn-success  me-2"
                                    >
                                    <i className="fa fa-print" />
                                    </Link>
                                    <Link to="#" className="btn btn-primary w-md ">
                                    Send
                                    </Link>
                                </div>
                                </div>
                            </CardBody>
                            </Card>
                        </Col>
                    </Row>

                </Container>
            </div>
        </>
    );
};

export default InvoiceShow;
