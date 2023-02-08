import { useEffect } from "react";
import GuestLayout from "@/Layouts/GuestLayout";

import {
    Row,
    Col,
    CardBody,
    Card,
    Alert,
    Container,
    Form,
    Input,
    FormFeedback,
    Label,
} from "reactstrap";

//redux
import { useSelector, useDispatch } from "react-redux";

// import images
import profile from "../../../assets/images/profile-img.png";
import logo from "../../../assets/images/logo.svg";

import { Head, Link, useForm } from "@inertiajs/react";

const Login = ({ status, canResetPassword }) => {
    const { data, setData, post, processing, errors, reset } = useForm({
        email: "",
        password: "",
        remember: "",
    });

    useEffect(() => {
        return () => {
            reset("password");
        };
    }, []);

    const onHandleChange = (event) => {
        setData(
            event.target.name,
            event.target.type === "checkbox"
                ? event.target.checked
                : event.target.value
        );
    };

    const submit = (e) => {
        e.preventDefault();

        post(route("login"));
    };

    return (
        <>
            <Head title="Log in" />

            <div className="home-btn d-none d-sm-block">
                <Link href="/" className="text">
                    <i className="bx bx-home h2" />
                </Link>
            </div>

            {status && (
                <div className="mb-4 font-medium text-sm text-green-600">
                    {status}
                </div>
            )}

            <div className="account-pages my-5 pt-sm-5">
                <Container>
                    <Row className="justify-content-center">
                        <Col md={8} lg={6} xl={5}>
                            <Card className="overflow-hidden">
                                <div className="bg-primary bg-soft">
                                    <Row>
                                        <Col xs={7}>
                                            <div className="text-primary p-4">
                                                <h5 className="text-primary">
                                                    Welcome Back !
                                                </h5>
                                                <p>
                                                    Sign in to continue to
                                                    Skote.
                                                </p>
                                            </div>
                                        </Col>
                                        <Col className="col-5 align-self-end">
                                            <img
                                                src={profile}
                                                alt=""
                                                className="img-fluid"
                                            />
                                        </Col>
                                    </Row>
                                </div>
                                <CardBody className="pt-0">
                                    <div>
                                        <Link
                                            to="/"
                                            className="auth-logo-light"
                                        >
                                            <div className="avatar-md profile-user-wid mb-4">
                                                <span className="avatar-title rounded-circle bg-light">
                                                    <img
                                                        src={logo}
                                                        alt=""
                                                        className="rounded-circle"
                                                        height="34"
                                                    />
                                                </span>
                                            </div>
                                        </Link>
                                    </div>
                                    <div className="p-2">
                                        <Form
                                            className="form-horizontal"
                                            onSubmit={submit}
                                        >
                                            <div className="mb-3">
                                                <Label className="form-label">
                                                    Email
                                                </Label>
                                                <Input
                                                    id="email"
                                                    type="email"
                                                    name="email"
                                                    value={data.email}
                                                    className="form-control"
                                                    autoComplete="username"
                                                    onChange={onHandleChange}
                                                />
                                                <FormFeedback type="invalid">
                                                    {errors.email}
                                                </FormFeedback>
                                            </div>

                                            <div className="mb-3">
                                                <Label className="form-label">
                                                    Password
                                                </Label>
                                                <Input
                                                    id="password"
                                                    type="password"
                                                    name="password"
                                                    value={data.password}
                                                    className="form-control"
                                                    autoComplete="current-password"
                                                    onChange={onHandleChange}
                                                />
                                                <FormFeedback type="invalid">
                                                    {errors.password}
                                                </FormFeedback>
                                            </div>

                                            <div className="form-check">
                                                <input
                                                    id="remember"
                                                    type="checkbox"
                                                    name="remember"
                                                    value={data.remember}
                                                    className="form-check-input"
                                                    onChange={onHandleChange}
                                                />
                                                <label
                                                    className="form-check-label"
                                                    htmlFor="customControlInline"
                                                >
                                                    Remember me
                                                </label>
                                            </div>

                                            <div className="mt-3 d-grid">
                                                <button
                                                    className="btn btn-primary btn-block"
                                                    type="submit"
                                                    disabled={processing}
                                                >
                                                    Log In
                                                </button>
                                            </div>

                                            <div className="mt-4 text-center">
                                                {canResetPassword && (
                                                    <Link
                                                        href={route(
                                                            "password.request"
                                                        )}
                                                        className="text-muted"
                                                    >
                                                        <i className="mdi mdi-lock me-1" />
                                                        Forgot your password?
                                                    </Link>
                                                )}
                                            </div>
                                        </Form>
                                    </div>
                                </CardBody>
                            </Card>
                            <div className="mt-5 text-center">
                                <p>
                                    Don&#39;t have an account ?{" "}
                                    <Link
                                        href={route("register")}
                                        className="fw-medium text-primary"
                                    >
                                        {" "}
                                        Signup now{" "}
                                    </Link>{" "}
                                </p>
                                <p>
                                    © {new Date().getFullYear()} Malygos{" "}
                                    <i className="mdi mdi-heart text-danger" />{" "}
                                    FerilAgi
                                </p>
                            </div>
                        </Col>
                    </Row>
                </Container>
            </div>
        </>
    );
};

Login.layout = (page) => <GuestLayout children={page} />;

export default Login;
