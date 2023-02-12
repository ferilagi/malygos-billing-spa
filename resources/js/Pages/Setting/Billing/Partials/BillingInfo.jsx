import { Card, CardBody, CardSubtitle, CardTitle, Col, Input, Row } from "reactstrap";

const BillingInfo = (props) => {

    return (
        <>
            <CardTitle>Billing information</CardTitle>
                <CardSubtitle className="mb-3">
                This library allows you to create editable elements on your
                page. It can be used with any engine (bootstrap, jquery-ui,
                jquery only) and includes both popup and inline modes.
                Please try out demo to see how it works.
                </CardSubtitle>

                <Row>
                    <Col>
                        <Card>
                            <CardBody>
                            <CardTitle className="h5 mb-4">Inline Forms With Hstack</CardTitle>
                            <div className="hstack gap-3">
                                <Input className="form-control me-auto" type="text" placeholder="Add your item here..."
                                aria-label="Add your item here..."/>
                                <button type="button" className="btn btn-secondary">Submit</button>
                                <div className="vr"></div>
                                <button type="button" className="btn btn-outline-danger">Reset</button>
                            </div>
                            </CardBody>
                        </Card>
                    </Col>
                </Row>

        </>
    )

}

export default BillingInfo;
