import React from "react";

import { Row, Col, Card, CardBody } from "reactstrap";
import { Link } from "@inertiajs/react";
import { usePage } from "@inertiajs/react";

// Default Avatar
import avdefault from "../../../../assets/images/users/default.jpeg";
import profileImg from "../../../../assets/images/profile-img.png";

const WelcomeComp = (props) => {
    const { auth } = usePage().props;
    const totalsubs = props.totalsubs;
    const comm = props.comm;
    const avatar = auth.avatar;

    const defaultSrc =(ev) => {
        ev.target.src = avdefault
      }

    return (
        <React.Fragment>
            <Card className="overflow-hidden">
                <div className="bg-primary bg-soft">
                    <Row>
                        <Col xs="7">
                            <div className="text-primary p-3">
                                <h5 className="text-primary">Welcome Back !</h5>
                                <p>Skote Dashboard</p>
                            </div>
                        </Col>
                        <Col xs="5" className="align-self-end">
                            <img
                                src={profileImg}
                                alt=""
                                className="img-fluid"
                            />
                        </Col>
                    </Row>
                </div>
                <CardBody className="pt-0">
                    <Row>
                        <Col sm="4">
                            <div className="avatar-md profile-user-wid mb-4">
                                <img
                                    src={avatar ? avatar : avdefault}
                                    onError={defaultSrc}
                                    alt=""
                                    className="img-thumbnail rounded-circle"
                                />
                            </div>
                            <h5 className="font-size-15 text-truncate">
                                {auth.name}
                            </h5>
                            <p className="text-muted mb-0 text-truncate">
                                ******
                            </p>
                        </Col>

                        <Col sm="8">
                            <div className="pt-4">
                                <Row>
                                    <Col xs="6">
                                        <h5 className="font-size-15">{totalsubs}</h5>
                                        <p className="text-muted mb-0">
                                            Subscribers
                                        </p>
                                    </Col>
                                    <Col xs="6">
                                        <h5 className="font-size-15">{comm}</h5>
                                        <p className="text-muted mb-0">
                                            Commissions
                                        </p>
                                    </Col>
                                </Row>
                                <div className="mt-4">
                                    <Link
                                        to=""
                                        className="btn btn-primary  btn-sm"
                                    >
                                        View Profile{" "}
                                        <i className="mdi mdi-arrow-right ms-1"></i>
                                    </Link>
                                </div>
                            </div>
                        </Col>
                    </Row>
                </CardBody>
            </Card>
        </React.Fragment>
    );
};
export default WelcomeComp;
