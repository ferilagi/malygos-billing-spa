import { useForm } from "@inertiajs/react";
import { useEffect } from "react";
import {
    Card,
    CardBody,
    CardSubtitle,
    CardTitle,
    Form,
    FormGroup,
    Label,
    Col,
    Input,
    Row
} from "reactstrap";




const CompanyInfo = (props) => {

    const comp = props.comp

    const { data, setData, post, processing, errors, reset } = useForm({
        name: comp.name,
        email: comp.email,
        phone: comp.phone,
        slogan: comp.slogan,
        address: comp.address,
        state: comp.state,
        zipcode: comp.zipcode,
        logo: comp.logo,
    });

    useEffect(() => {
        return () => {
            reset("password");
        };
    }, []);

    const onHandleChange = (event) => {
        setData(
            event.target.name, event.target.value
        );
    };

    const submit = (e) => {
        e.preventDefault();

        post(route("login"));
    };

    return (
        <>
            <CardTitle>Company information</CardTitle>
                <CardSubtitle className="mb-3">
                This library allows you to create editable elements on your
                page. It can be used with any engine (bootstrap, jquery-ui,
                jquery only) and includes both popup and inline modes.
                Please try out demo to see how it works.
                </CardSubtitle>

                <Form onSubmit={submit}>
                    <Row>
                        <Col xl={6}>
                        <Card>
                            <CardBody>
                            <CardTitle className="h5">Floating labels</CardTitle>
                            <p className="card-title-desc">Create beautifully simple form labels that float over your input fields.</p>

                                <div className="form-floating mb-3">
                                <input type="text" className="form-control" id="nameInput" placeholder="Enter Name"/>
                                <label htmlFor="nameInput" className="text-success">{data.name}</label>
                                </div>
                                <Row>
                                <Col md={6}>
                                    <div className="form-floating mb-3">
                                    <input type="email" className="form-control" id="emailInput" placeholder="Enter Email address"/>
                                    <label htmlFor="emailInput" className="text-success">{data.email}</label>
                                    </div>
                                </Col>
                                <Col md={6}>
                                    <div className="form-floating mb-3">
                                    <input type="phone" className="form-control" id="phoneInput" placeholder="Enter Phone address"/>
                                    <label htmlFor="phoneInput" className="text-success">{data.phone}</label>
                                    </div>
                                </Col>
                                </Row>

                                <div className="form-floating mb-3">
                                <input type="text" className="form-control" id="sloganInput" placeholder="Enter Slogan"/>
                                <label htmlFor="sloganInput" className="text-success">{data.slogan}</label>
                                </div>
                            </CardBody>
                        </Card>
                        </Col>

                        <Col xl={6}>
                        <Card>
                            <CardBody>
                            <CardTitle className="h5">Floating labels</CardTitle>
                            <p className="card-title-desc">Create beautifully simple form labels that float over your input fields.</p>

                                <div className="form-floating mb-3">
                                <input type="text" className="form-control" id="addressInput" placeholder="Enter Address"/>
                                <label htmlFor="addressInput" className="text-success">{data.address}</label>
                                </div>
                                <Row>
                                <Col md={8}>
                                    <div className="form-floating mb-3">
                                    <input type="text" className="form-control" id="stateInput" placeholder="Enter State"/>
                                    <label htmlFor="stateInput" className="text-success">{data.state}</label>
                                    </div>
                                </Col>
                                <Col md={4}>
                                    <div className="form-floating mb-3">
                                    <input type="number" className="form-control" id="zipcodeInput" placeholder="Enter Zipcode"/>
                                    <label htmlFor="zipcodeInput" className="text-success">{data.zipcode}</label>
                                    </div>
                                </Col>
                                </Row>
                                <div className="hstack gap-3">
                                    <Input className="form-control" type="file" id="logoInput" />
                                    <div className="vr"></div>
                                    <button type="submit" className="btn btn-success">Submit</button>
                                </div>
                            </CardBody>
                        </Card>
                        </Col>
                    </Row>
                </Form>

        </>
    )

}

export default CompanyInfo;
