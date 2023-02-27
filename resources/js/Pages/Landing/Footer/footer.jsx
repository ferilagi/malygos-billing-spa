import React from "react";
import { Row, Col, Container } from "reactstrap";

//Import Images
import logolight from "../../../../assets/images/logo-light.png";
import masterlogo from "../../../../assets/images/masterlogo.png";

const FooterLink = () => {
    return (
        <>
            <footer className="landing-footer">
                <Container>
                <hr className="footer-border" />
                    <Row>
                        <Col lg="6">
                            <div className="mb-4">
                                <img src={masterlogo} alt="" height="48" />
                            </div>

                            <p className="mb-2">
                                {new Date().getFullYear()} © Malygos.
                            </p>
                            <p>
                                Develop by
                                Feril Agi
                            </p>
                        </Col>
                    </Row>
                </Container>
            </footer>
        </>
    );
};

export default FooterLink;
