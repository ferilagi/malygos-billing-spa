import * as React from "react";
import { Container, Row, Col, Card, CardBody } from "reactstrap";
import { Link } from "@inertiajs/react";

const PrivacyPolicy = () => {
    return (
        <>
            <section className="section pt-4 bg-white" id="privacy">
                <Container>
                    {/* Privacy Policy */}
                    <Row>
                        <Col lg="12">
                            <div className="text-center mt-3 mb-3">
                                <h4>Privacy Policy</h4>
                            </div>
                        </Col>
                    </Row>
                    <Row className="align-items-center">
                        <Col>
                            <div className="text-muted text-center">
                                <p>
                                    Malygos built the Malygos app as a
                                    Commercial app. This SERVICE is provided by
                                    Malygos and is intended for use as is.
                                </p>
                                <p>
                                    This page is used to inform visitors
                                    regarding my policies with the collection,
                                    use, and disclosure of Personal Information
                                    if anyone decided to use my Service.
                                </p>
                                <p>
                                    If you choose to use my Service, then you
                                    agree to the collection and use of
                                    information in relation to this policy. The
                                    Personal Information that I collect is used
                                    for providing and improving the Service. I
                                    will not use or share your information with
                                    anyone except as described in this Privacy
                                    Policy.
                                </p>
                                <p className="mb-4">
                                    The terms used in this Privacy Policy have
                                    the same meanings as in our Terms and
                                    Conditions, which are accessible at Malygos
                                    unless otherwise defined in this Privacy
                                    Policy.
                                </p>
                            </div>
                        </Col>
                    </Row>

                    {/* Information Collection and Use */}
                    <Row>
                        <Col lg="12">
                            <div className="text-center mt-3 mb-3">
                                <h4>Information Collection and Use</h4>
                            </div>
                        </Col>
                    </Row>
                    <Row className="align-items-center mb-3">
                        <Col>
                            <div className="text-muted text-center">
                                <p>
                                    For a better experience, while using our
                                    Service, I may require you to provide us
                                    with certain personally identifiable
                                    information, including but not limited to
                                    <i> nahdammar@gmail.com</i>. The information
                                    that I request will be retained on your
                                    device and is not collected by me in any
                                    way.
                                </p>
                                <p>
                                    The app does use third-party services that
                                    may collect information used to identify
                                    you.
                                </p>
                                <p>
                                    Link to the privacy policy of third-party
                                    service providers used by the app
                                </p>

                                <div className="d-flex flex-wrap gap-2 justify-content-center">
                                    <a
                                        href="https://www.google.com/policies/privacy/"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="btn btn-outline-success"
                                    >
                                        Google Play Services
                                    </a>
                                    <a
                                        href="https://firebase.google.com/policies/analytics"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="btn btn-outline-primary"
                                    >
                                        Google Analytics for Firebase
                                    </a>
                                    <a
                                        href="https://firebase.google.com/support/privacy/"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="btn btn-outline-success"
                                    >
                                        Firebase Crashlytics
                                    </a>
                                    <a
                                        href="https://onesignal.com/privacy_policy"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="btn btn-outline-primary"
                                    >
                                        One Signal
                                    </a>
                                    <a
                                        href="https://expo.io/privacy"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="btn btn-outline-success"
                                    >
                                        Expo
                                    </a>
                                </div>
                            </div>
                        </Col>
                    </Row>

                    {/* Log Data */}
                    <Row>
                        <Col lg="12">
                            <div className="text-center mt-3 mb-3">
                                <h4>Log Data</h4>
                            </div>
                        </Col>
                    </Row>
                    <Row className="align-items-center">
                        <Col>
                            <div className="text-muted text-center">
                                <p>
                                    I want to inform you that whenever you use
                                    my Service, in a case of an error in the app
                                    I collect data and information (through
                                    third-party products) on your phone called
                                    Log Data. This Log Data may include
                                    information such as your device Internet
                                    Protocol (“IP”) address, device name,
                                    operating system version, the configuration
                                    of the app when utilizing my Service, the
                                    time and date of your use of the Service,
                                    and other statistics.
                                </p>
                            </div>
                        </Col>
                    </Row>

                    {/* Cookies */}
                    <Row>
                        <Col lg="12">
                            <div className="text-center mt-3 mb-3">
                                <h4>Cookies</h4>
                            </div>
                        </Col>
                    </Row>
                    <Row className="align-items-center">
                        <Col>
                            <div className="text-muted text-center">
                                <p>
                                    Cookies are files with a small amount of
                                    data that are commonly used as anonymous
                                    unique identifiers. These are sent to your
                                    browser from the websites that you visit and
                                    are stored on your device's internal memory.
                                </p>
                                <p>
                                    This Service does not use these “cookies”
                                    explicitly. However, the app may use
                                    third-party code and libraries that use
                                    “cookies” to collect information and improve
                                    their services. You have the option to
                                    either accept or refuse these cookies and
                                    know when a cookie is being sent to your
                                    device. If you choose to refuse our cookies,
                                    you may not be able to use some portions of
                                    this Service.
                                </p>
                            </div>
                        </Col>
                    </Row>

                    {/* Service Providers */}
                    <Row>
                        <Col lg="12">
                            <div className="text-center mt-3 mb-3">
                                <h4>Service Providers</h4>
                            </div>
                        </Col>
                    </Row>
                    <Row className="align-items-center">
                        <Col>
                            <div className="text-muted">
                                <p>
                                    I may employ third-party companies and
                                    individuals due to the following reasons:
                                </p>
                                <ul>
                                    <li>To facilitate our Service;</li>{" "}
                                    <li>
                                        To provide the Service on our behalf;
                                    </li>{" "}
                                    <li>
                                        To perform Service-related services; or
                                    </li>{" "}
                                    <li>
                                        To assist us in analyzing how our
                                        Service is used.
                                    </li>
                                </ul>
                                <p>
                                    I want to inform users of this Service that
                                    these third parties have access to their
                                    Personal Information. The reason is to
                                    perform the tasks assigned to them on our
                                    behalf. However, they are obligated not to
                                    disclose or use the information for any
                                    other purpose.
                                </p>
                            </div>
                        </Col>
                    </Row>

                    {/* Security */}
                    <Row>
                        <Col lg="12">
                            <div className="text-center mt-3 mb-3">
                                <h4>Security</h4>
                            </div>
                        </Col>
                    </Row>
                    <Row className="align-items-center">
                        <Col>
                            <div className="text-muted text-center">
                                <p>
                                    I value your trust in providing us your
                                    Personal Information, thus we are striving
                                    to use commercially acceptable means of
                                    protecting it. But remember that no method
                                    of transmission over the internet, or method
                                    of electronic storage is 100% secure and
                                    reliable, and I cannot guarantee its
                                    absolute security.
                                </p>
                            </div>
                        </Col>
                    </Row>

                    {/* Links to Other Sites */}
                    <Row>
                        <Col lg="12">
                            <div className="text-center mt-3 mb-3">
                                <h4>Links to Other Sites</h4>
                            </div>
                        </Col>
                    </Row>
                    <Row className="align-items-center">
                        <Col>
                            <div className="text-muted text-center">
                                <p>
                                    This Service may contain links to other
                                    sites. If you click on a third-party link,
                                    you will be directed to that site. Note that
                                    these external sites are not operated by me.
                                    Therefore, I strongly advise you to review
                                    the Privacy Policy of these websites. I have
                                    no control over and assume no responsibility
                                    for the content, privacy policies, or
                                    practices of any third-party sites or
                                    services.
                                </p>
                            </div>
                        </Col>
                    </Row>

                    {/* Children’s Privacy */}
                    <Row>
                        <Col lg="12">
                            <div className="text-center mt-3 mb-3">
                                <h4>Children’s Privacy</h4>
                            </div>
                        </Col>
                    </Row>
                    <Row className="align-items-center">
                        <Col>
                            <div className="text-muted text-center">
                                <p>
                                    These Services do not address anyone under
                                    the age of 13. I do not knowingly collect
                                    personally identifiable information from
                                    children under 13 years of age. In the case
                                    I discover that a child under 13 has
                                    provided me with personal information, I
                                    immediately delete this from our servers. If
                                    you are a parent or guardian and you are
                                    aware that your child has provided us with
                                    personal information, please contact me so
                                    that I will be able to do the necessary
                                    actions.
                                </p>
                            </div>
                        </Col>
                    </Row>

                    {/* Changes to This Privacy Policy */}
                    <Row>
                        <Col lg="12">
                            <div className="text-center mt-3 mb-3">
                                <h4>Changes to This Privacy Policy</h4>
                            </div>
                        </Col>
                    </Row>
                    <Row className="align-items-center">
                        <Col>
                            <div className="text-muted text-center">
                                <p>
                                    I may update our Privacy Policy from time to
                                    time. Thus, you are advised to review this
                                    page periodically for any changes. I will
                                    notify you of any changes by posting the new
                                    Privacy Policy on this page.
                                </p>
                            </div>
                        </Col>
                    </Row>

                    <hr className="my-5" />

                    <Row>
                        <Col lg="12" className="ms-auto">
                            <div className="mt-4 mt-lg-0">
                                <Row>
                                    <Col sm="6">
                                        <Card className="border">
                                            <CardBody>
                                                <div className="mb-3">
                                                    <i className="mdi mdi-wallet-outline h2 text-success" />
                                                </div>
                                                <h5>
                                                    {" "}
                                                    This policy is effective as
                                                    of
                                                </h5>
                                                <p className="text-muted mb-0">
                                                    21-03-2024
                                                </p>
                                            </CardBody>
                                            <div className="card-footer bg-transparent border-top text-center">
                                                <Link
                                                    to="#"
                                                    className="text-primary"
                                                >
                                                    Learn more
                                                </Link>
                                            </div>
                                        </Card>
                                    </Col>
                                    <Col sm="6">
                                        <Card className="border">
                                            <CardBody>
                                                <div className="mb-3">
                                                    <i className="mdi mdi-wallet-outline h2 text-success" />
                                                </div>
                                                <h5>
                                                    This privacy policy was
                                                    created and modified by
                                                </h5>
                                                <p className="text-muted mb-0">
                                                    <a
                                                        href="https://privacypolicytemplate.net"
                                                        target="_blank"
                                                        rel="noopener noreferrer"
                                                    >
                                                        PrivacyPolicyTemplate{" "}
                                                    </a>
                                                    &{" "}
                                                    <a
                                                        href="https://app-privacy-policy-generator.nisrulz.com/"
                                                        target="_blank"
                                                        rel="noopener noreferrer"
                                                    >
                                                        App Privacy Policy
                                                        Generator
                                                    </a>{" "}
                                                </p>
                                            </CardBody>
                                            <div className="card-footer bg-transparent border-top text-center">
                                                <Link
                                                    to="#"
                                                    className="text-primary"
                                                >
                                                    Learn more
                                                </Link>
                                            </div>
                                        </Card>
                                    </Col>
                                </Row>
                            </div>
                        </Col>
                    </Row>
                </Container>
            </section>
        </>
    );
};

export default PrivacyPolicy;
