import React, { useState } from 'react';
import { Link } from '@inertiajs/react';

import {
    Card,
    CardBody,
    Col,
    Modal,
    ModalBody,
    ModalHeader,
    Row,
    Form,
    Label,
    Input,
    Pagination,
    Button
} from 'reactstrap';


//import images
import mapro from "../../../../assets/images/companies/img-5.png";
import mipro from "../../../../assets/images/companies/img-6.png";

const StaticData = (props) => {

    const sprofiles = props.sprofiles;

    const [modal, setModal] = useState(false);

    const currencyFormat = (num) => {
        return "IDR " + num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
    };

    return (
        <React.Fragment>
            <Row>
                {(sprofiles || []).map((item, key) => (
                    <Col xl={3} md={6} key={key}>
                        <Card>
                            <CardBody>
                                <div className="favorite-icon">
                                    <Link to="#"><i className="uil uil-heart-alt fs-18"></i></Link>
                                </div>
                                <img src={mapro} alt="" height="50" className="mb-3" />
                                <h5 className="fs-17 mb-3">
                                    <Link to="/job-details" className="text-dark">{item.alias}</Link> <small className="text-muted fw-normal">({item.name_prof})</small></h5>
                                <ul className="list-inline mb-0">
                                    <li className="list-inline-item">
                                        <p className="text-muted fs-14 mb-1"> <i className="mdi mdi-speedometer"></i> {item.rateLimit}</p>
                                        <p className="text-muted fs-14 mb-1"> <i className="mdi mdi-poll-box-outline"></i> {item.addressList}</p>
                                    </li>{" "}
                                    <li className="list-inline-item mb-1">
                                        <p className="text-muted fs-14 mb-0"><i className="mdi mdi-cable-data"></i> {item.remoteAddress}</p>
                                        <p className="text-muted fs-14 mb-0"><i className="mdi mdi-crosshairs"></i> {item.parentQueue}</p>
                                    </li>
                                    <li className="list-inline-item">
                                        <p className="text-muted fs-14 mb-0"><i className="mdi mdi-cash-usd-outline"></i> {currencyFormat(item.price)}</p>
                                    </li>
                                </ul>
                                <div className="mt-3 hstack gap-2">
                                    <span className="badge rounded-1 badge-soft-primary">static</span>
                                    <span className="badge rounded-1 badge-soft-danger">{item.routers}</span>
                                    <span className="badge rounded-1 badge-soft-info">{item.prefixQueue}</span>
                                    <span className="badge rounded-1 badge-soft-warning">{item.sufixQueue}</span>
                                    <span className="badge rounded-1 badge-soft-success">{item.onlyOne}</span>
                                </div>
                                <div className="mt-4 hstack gap-2">
                                    <Link to="/job-details" className="btn btn-soft-success w-100">Details</Link>
                                    <Button  onClick={() => setModal(true)} className="btn btn-soft-primary w-100">Apply Now</Button>
                                </div>
                            </CardBody>
                        </Card>
                    </Col>
                ))}
            </Row>

            <Row className="justify-content-between align-items-center mb-3">
                <div className="col-auto me-auto">
                    <p className="text-muted mb-0">Showing <b>1</b> to <b>12</b> of <b>45</b> entries</p>
                </div>
                <div className="col-auto">
                    <Card className="d-inline-block ms-auto mb-0">
                        <CardBody className="p-2">
                            <nav aria-label="Page navigation example" className="mb-0">
                                <ul className="pagination mb-0">
                                    <li className="page-item">
                                        <Link className="page-link" to="#">
                                            <span aria-hidden="true">&laquo;</span>
                                        </Link>
                                    </li>
                                    <li className="page-item active"><Link className="page-link" to="#">1</Link></li>
                                    <li className="page-item"><Link className="page-link" to="#">2</Link></li>
                                    <li className="page-item"><Link className="page-link" to="#">3</Link></li>
                                    <li className="page-item"><Link className="page-link" to="#">...</Link></li>
                                    <li className="page-item"><Link className="page-link" to="#">12</Link></li>
                                    <li className="page-item">
                                        <Link className="page-link" to="#">
                                            <span aria-hidden="true">&raquo;</span>
                                        </Link>
                                    </li>
                                </ul>
                            </nav>
                        </CardBody>
                    </Card>
                </div>
            </Row>

            {/* Modal */}
            <Modal
                isOpen={modal}
                toggle={() => {
                    setModal()
                }}
                id="applyJobs"
            >
                <div className="modal-content">
                    <ModalHeader toggle={() => setModal()} id="applyJobsLabel" className="modal-header">
                        Apply For This Job
                    </ModalHeader>
                    <ModalBody>
                        <Row>
                            <Col lg={12}>
                                <div className="mb-3">
                                    <Label htmlFor="fullnameInput" className="form-label">Full Name</Label>
                                    <Input type="text" className="form-control" id="fullnameInput" placeholder="Enter your name" />
                                </div>
                            </Col>
                            <Col lg={6}>
                                <div className="mb-3">
                                    <Label htmlFor="emailInput" className="form-label">Email</Label>
                                    <Input type="email" className="form-control" id="emailInput" placeholder="Enter your email" />
                                </div>
                            </Col>
                            <Col lg={6}>
                                <div className="mb-3">
                                    <Label htmlFor="phoneNumberInput" className="form-label">Phone Number</Label>
                                    <Input type="email" className="form-control" id="phoneNumberInput" placeholder="Enter your number" />
                                </div>
                            </Col>
                            <Col lg={12}>
                                <div className="mb-3">
                                    <Label htmlFor="uploadResume" className="form-label">Upload Resume</Label>
                                    <Input type="file" className="form-control" id="uploadResume" placeholder="Upload resume" />
                                </div>
                            </Col>
                            <Col lg={12}>
                                <div className="mb-4">
                                    <Label htmlFor="messageInput" className="form-label">Message</Label>
                                    <textarea className="form-control" id="messageInput" rows="3" placeholder="Enter your message"></textarea>
                                </div>
                            </Col>
                            <Col lg={12}>
                                <div className="text-end">
                                    <button className="btn btn-success me-1">Send Application <i className="bx bx-send align-middle"></i></button>
                                    <button className="btn btn-secondary" onClick={() => setModal(false)} >Cancel</button>
                                </div>
                            </Col>
                        </Row>
                    </ModalBody>
                </div>
            </Modal>
        </React.Fragment>
    );
}

export default StaticData;
