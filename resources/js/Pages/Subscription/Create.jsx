import React, { useEffect, useState, useRef, useMemo } from "react";
import { Head, Link } from "@inertiajs/react";

import {
    Card,
    CardBody,
    Col,
    Container,
    Row,
    Modal,
    ModalHeader,
    ModalBody,
    Label,
    FormFeedback,
    UncontrolledTooltip,
    Input,
    Form,
    FormGroup,
    Button,
} from "reactstrap";

import * as Yup from "yup";
import { useFormik } from "formik";
import { isEmpty } from "lodash";

//Import Breadcrumb
import Breadcrumb from "../../Layouts/Partials/Breadcrumb";

const SubscriptionCreate = (props) => {
    const cust = props.cust;
    const areas = props.areas;
    const pprofile = props.pprofile;
    const sprofile = props.sprofile;

    const [selectedGroup, setselectedGroup] = useState(null);
    const [isPPP, setIsPPP] = useState(true);

    // Form validation
    const validation = useFormik({
        // enableReinitialize : use this flag when initial values needs to be changed
        enableReinitialize: true,

        initialValues: {
            customer: "",
            type: "ppp",
            planable: "",
            area: "",
            ip_addr: "",
            queuename: "",
            username: "",
            password: "",
            is_taxed: 0,
            integration: 0,
            auto_disable: 0,
            custom_duedate: 0,
        },
        validationSchema: Yup.object({
            customer: Yup.string().required("Atleast Pick One Customer"),
            type: Yup.string().required("Please Select Type"),
            planable: Yup.string().required("Atleast Pick One Plan"),
            area: Yup.string().required("Please Select Area"),
            ip_addr: Yup.string().when("type", {
                is: "static",
                then: Yup.string().required("Please Enter IP Address"),
            }),
            queuename: Yup.string().when("type", {
                is: "static",
                then: Yup.string().required("Please Enter Queue Name"),
            }),
            username: Yup.string().when("type", {
                is: "ppp",
                then: Yup.string().required("Please Enter Username"),
            }),
            password: Yup.string().when("type", {
                is: "ppp",
                then: Yup.string().required("Please Enter Password"),
            }),
            is_taxed: Yup.boolean(),
            integration: Yup.boolean(),
            auto_disable: Yup.boolean(),
            custom_duedate: Yup.boolean(),
        }),
        onSubmit: (values) => {
            console.log("values", values);
        },
    });

    const optionPlan = isPPP
        ? pprofile.map((pprof) => (
              <option key={pprof.id} value={pprof.id}>
                  {pprof.name_prof}
              </option>
          ))
        : sprofile.map((sprof) => (
              <option key={sprof.id} value={sprof.id}>
                  {sprof.name_prof}
              </option>
          ));

    useEffect(() => {
        validation.values.type === "ppp" ? setIsPPP(true) : setIsPPP(false);
        console.log(validation.values, isPPP);
    }, [validation.values]);

    // function handleSelectGroup(selectedGroup) {
    //     setselectedGroup(selectedGroup);
    //   }

    return (
        <>
            <Head title="Activation" />
            <div className="page-content">
                <Container fluid>
                    {/* Render Breadcrumbs */}
                    <Breadcrumb
                        title="Subscription"
                        breadcrumbItem="Activation"
                    />
                    <Row>
                        <Col xl="8">
                            <Card>
                                <CardBody>
                                    <h4 className="card-title">
                                        React Validation - Normal
                                    </h4>
                                    <p className="card-title-desc">
                                        Provide valuable, actionable feedback to
                                        your users with HTML5 form
                                        validation–available in all our
                                        supported browsers.
                                    </p>
                                    <Form
                                        className="needs-validation"
                                        onSubmit={(e) => {
                                            e.preventDefault();
                                            validation.handleSubmit();
                                            return false;
                                        }}
                                    >
                                        <Row>
                                            <Col md="8">
                                                <FormGroup className="mb-3">
                                                    <Label htmlFor="customer">
                                                        Customer Name
                                                    </Label>
                                                    <Input
                                                        name="customer"
                                                        id="customer"
                                                        type="select"
                                                        className="form-control"
                                                        onChange={
                                                            validation.handleChange
                                                        }
                                                        onBlur={
                                                            validation.handleBlur
                                                        }
                                                        value={
                                                            validation.values
                                                                .customer || ""
                                                        }
                                                        invalid={
                                                            validation.touched
                                                                .customer &&
                                                            validation.errors
                                                                .customer
                                                                ? true
                                                                : false
                                                        }
                                                    >
                                                        <option value=""></option>
                                                        {cust.map((ctm) => (
                                                            <option
                                                                key={ctm.id}
                                                                value={ctm.id}
                                                            >
                                                                {ctm.name}
                                                            </option>
                                                        ))}
                                                    </Input>
                                                    {validation.touched
                                                        .customer &&
                                                    validation.errors
                                                        .customer ? (
                                                        <FormFeedback type="invalid">
                                                            {
                                                                validation
                                                                    .errors
                                                                    .customer
                                                            }
                                                        </FormFeedback>
                                                    ) : null}
                                                </FormGroup>
                                            </Col>
                                            <Col md="4">
                                                <FormGroup className="mb-3">
                                                    <Label htmlFor="type">
                                                        Type
                                                    </Label>
                                                    <Input
                                                        name="type"
                                                        id="type"
                                                        type="select"
                                                        className="form-control"
                                                        onChange={
                                                            validation.handleChange
                                                        }
                                                        onBlur={
                                                            validation.handleBlur
                                                        }
                                                        value={
                                                            validation.values
                                                                .type || ""
                                                        }
                                                        invalid={
                                                            validation.touched
                                                                .type &&
                                                            validation.errors
                                                                .type
                                                                ? true
                                                                : false
                                                        }
                                                    >
                                                        <option value="ppp">
                                                            PPPoE
                                                        </option>
                                                        <option value="static">
                                                            Static
                                                        </option>
                                                    </Input>
                                                    {validation.touched.type &&
                                                    validation.errors.type ? (
                                                        <FormFeedback type="invalid">
                                                            {
                                                                validation
                                                                    .errors.type
                                                            }
                                                        </FormFeedback>
                                                    ) : null}
                                                </FormGroup>
                                            </Col>
                                        </Row>

                                        <Row>
                                            <Col md="6">
                                                <FormGroup className="mb-3">
                                                    <Label htmlFor="planable">
                                                        Plan
                                                    </Label>
                                                    <Input
                                                        name="planable"
                                                        id="planable"
                                                        type="select"
                                                        className="form-control"
                                                        onChange={
                                                            validation.handleChange
                                                        }
                                                        onBlur={
                                                            validation.handleBlur
                                                        }
                                                        value={
                                                            validation.values
                                                                .planable || ""
                                                        }
                                                        invalid={
                                                            validation.touched
                                                                .planable &&
                                                            validation.errors
                                                                .planable
                                                                ? true
                                                                : false
                                                        }
                                                    >
                                                        <option value="">
                                                            Select
                                                        </option>
                                                        {optionPlan}

                                                        {/* {planables.map( planable => (
                                        <option key={planable.id} value={planable.id}>
                                            {planable.name}
                                        </option>
                                        ))} */}
                                                    </Input>
                                                    {validation.touched
                                                        .planable &&
                                                    validation.errors
                                                        .planable ? (
                                                        <FormFeedback type="invalid">
                                                            {
                                                                validation
                                                                    .errors
                                                                    .planable
                                                            }
                                                        </FormFeedback>
                                                    ) : null}
                                                </FormGroup>
                                            </Col>
                                            <Col md="6">
                                                <FormGroup className="mb-3">
                                                    <Label htmlFor="validationCustom03">
                                                        Area
                                                    </Label>
                                                    <Input
                                                        name="area"
                                                        id="area"
                                                        type="select"
                                                        className="form-control"
                                                        onChange={
                                                            validation.handleChange
                                                        }
                                                        onBlur={
                                                            validation.handleBlur
                                                        }
                                                        value={
                                                            validation.values
                                                                .area || ""
                                                        }
                                                        invalid={
                                                            validation.touched
                                                                .area &&
                                                            validation.errors
                                                                .area
                                                                ? true
                                                                : false
                                                        }
                                                    >
                                                        <option value=""></option>
                                                        {areas.map((area) => (
                                                            <option
                                                                key={area.id}
                                                                value={area.id}
                                                            >
                                                                {area.name}
                                                            </option>
                                                        ))}
                                                    </Input>
                                                    {validation.touched.area &&
                                                    validation.errors.area ? (
                                                        <FormFeedback type="invalid">
                                                            {
                                                                validation
                                                                    .errors.area
                                                            }
                                                        </FormFeedback>
                                                    ) : null}
                                                </FormGroup>
                                            </Col>
                                        </Row>

                                        {isPPP ? (
                                            <Row>
                                                <Col md="6">
                                                    <FormGroup className="mb-3">
                                                        <Label htmlFor="username">
                                                            Username
                                                        </Label>
                                                        <Input
                                                            name="username"
                                                            id="username"
                                                            placeholder="Username"
                                                            type="text"
                                                            className="form-control"
                                                            onChange={
                                                                validation.handleChange
                                                            }
                                                            onBlur={
                                                                validation.handleBlur
                                                            }
                                                            value={
                                                                validation
                                                                    .values
                                                                    .username ||
                                                                ""
                                                            }
                                                            invalid={
                                                                validation
                                                                    .touched
                                                                    .username &&
                                                                validation
                                                                    .errors
                                                                    .username
                                                                    ? true
                                                                    : false
                                                            }
                                                        />
                                                        {validation.touched
                                                            .username &&
                                                        validation.errors
                                                            .username ? (
                                                            <FormFeedback type="invalid">
                                                                {
                                                                    validation
                                                                        .errors
                                                                        .username
                                                                }
                                                            </FormFeedback>
                                                        ) : null}
                                                    </FormGroup>
                                                </Col>
                                                <Col md="6">
                                                    <FormGroup className="mb-3">
                                                        <Label htmlFor="password">
                                                            Password
                                                        </Label>
                                                        <Input
                                                            name="password"
                                                            id="password"
                                                            placeholder="Password"
                                                            type="text"
                                                            className="form-control"
                                                            onChange={
                                                                validation.handleChange
                                                            }
                                                            onBlur={
                                                                validation.handleBlur
                                                            }
                                                            value={
                                                                validation
                                                                    .values
                                                                    .password ||
                                                                ""
                                                            }
                                                            invalid={
                                                                validation
                                                                    .touched
                                                                    .password &&
                                                                validation
                                                                    .errors
                                                                    .password
                                                                    ? true
                                                                    : false
                                                            }
                                                        />
                                                        {validation.touched
                                                            .password &&
                                                        validation.errors
                                                            .password ? (
                                                            <FormFeedback type="invalid">
                                                                {
                                                                    validation
                                                                        .errors
                                                                        .password
                                                                }
                                                            </FormFeedback>
                                                        ) : null}
                                                    </FormGroup>
                                                </Col>
                                            </Row>
                                        ) : (
                                            <Row>
                                                <Col md="6">
                                                    <FormGroup className="mb-3">
                                                        <Label htmlFor="ip_addr">
                                                            IP Address
                                                        </Label>
                                                        <Input
                                                            name="ip_addr"
                                                            id="ip_addr"
                                                            placeholder="IP Address"
                                                            type="text"
                                                            className="form-control"
                                                            onChange={
                                                                validation.handleChange
                                                            }
                                                            onBlur={
                                                                validation.handleBlur
                                                            }
                                                            value={
                                                                validation
                                                                    .values
                                                                    .ip_addr ||
                                                                ""
                                                            }
                                                            invalid={
                                                                validation
                                                                    .touched
                                                                    .ip_addr &&
                                                                validation
                                                                    .errors
                                                                    .ip_addr
                                                                    ? true
                                                                    : false
                                                            }
                                                        />
                                                        {validation.touched
                                                            .ip_addr &&
                                                        validation.errors
                                                            .ip_addr ? (
                                                            <FormFeedback type="invalid">
                                                                {
                                                                    validation
                                                                        .errors
                                                                        .ip_addr
                                                                }
                                                            </FormFeedback>
                                                        ) : null}
                                                    </FormGroup>
                                                </Col>
                                                <Col md="6">
                                                    <FormGroup className="mb-3">
                                                        <Label htmlFor="queuename">
                                                            Queue Name
                                                        </Label>
                                                        <Input
                                                            name="queuename"
                                                            id="queuename"
                                                            placeholder="Queue Name"
                                                            type="text"
                                                            className="form-control"
                                                            onChange={
                                                                validation.handleChange
                                                            }
                                                            onBlur={
                                                                validation.handleBlur
                                                            }
                                                            value={
                                                                validation
                                                                    .values
                                                                    .queuename ||
                                                                ""
                                                            }
                                                            invalid={
                                                                validation
                                                                    .touched
                                                                    .queuename &&
                                                                validation
                                                                    .errors
                                                                    .queuename
                                                                    ? true
                                                                    : false
                                                            }
                                                        />
                                                        {validation.touched
                                                            .queuename &&
                                                        validation.errors
                                                            .queuename ? (
                                                            <FormFeedback type="invalid">
                                                                {
                                                                    validation
                                                                        .errors
                                                                        .queuename
                                                                }
                                                            </FormFeedback>
                                                        ) : null}
                                                    </FormGroup>
                                                </Col>
                                            </Row>
                                        )}

                                        <Row>
                                            <Col md="6">
                                                <FormGroup className="mb-3">
                                                    <Label htmlFor="is_taxed">
                                                        Tax
                                                    </Label>
                                                    <Input
                                                        name="is_taxed"
                                                        id="is_taxed"
                                                        type="select"
                                                        className="form-control"
                                                        onChange={
                                                            validation.handleChange
                                                        }
                                                        onBlur={
                                                            validation.handleBlur
                                                        }
                                                        value={
                                                            validation.values
                                                                .is_taxed || ""
                                                        }
                                                        invalid={
                                                            validation.touched
                                                                .is_taxed &&
                                                            validation.errors
                                                                .is_taxed
                                                                ? true
                                                                : false
                                                        }
                                                    >
                                                        <option value="0">
                                                            No
                                                        </option>
                                                        <option value="1">
                                                            Yes
                                                        </option>
                                                    </Input>
                                                    {validation.touched
                                                        .is_taxed &&
                                                    validation.errors
                                                        .is_taxed ? (
                                                        <FormFeedback type="invalid">
                                                            {
                                                                validation
                                                                    .errors
                                                                    .is_taxed
                                                            }
                                                        </FormFeedback>
                                                    ) : null}
                                                </FormGroup>
                                            </Col>
                                            <Col md="6">
                                                <FormGroup className="mb-3">
                                                    <Label htmlFor="integration">
                                                        Integration
                                                    </Label>
                                                    <Input
                                                        name="integration"
                                                        id="integration"
                                                        type="select"
                                                        className="form-control"
                                                        onChange={
                                                            validation.handleChange
                                                        }
                                                        onBlur={
                                                            validation.handleBlur
                                                        }
                                                        value={
                                                            validation.values
                                                                .integration ||
                                                            ""
                                                        }
                                                        invalid={
                                                            validation.touched
                                                                .integration &&
                                                            validation.errors
                                                                .integration
                                                                ? true
                                                                : false
                                                        }
                                                    >
                                                        <option value="0">
                                                            No
                                                        </option>
                                                        <option value="1">
                                                            Yes
                                                        </option>
                                                    </Input>
                                                    {validation.touched
                                                        .integration &&
                                                    validation.errors
                                                        .integration ? (
                                                        <FormFeedback type="invalid">
                                                            {
                                                                validation
                                                                    .errors
                                                                    .integration
                                                            }
                                                        </FormFeedback>
                                                    ) : null}
                                                </FormGroup>
                                            </Col>
                                        </Row>

                                        <Row>
                                            <Col md="6">
                                                <FormGroup className="mb-3">
                                                    <Label htmlFor="auto_disable">
                                                        Auto Isolate
                                                    </Label>
                                                    <Input
                                                        name="auto_disable"
                                                        id="auto_disable"
                                                        type="select"
                                                        className="form-control"
                                                        onChange={
                                                            validation.handleChange
                                                        }
                                                        onBlur={
                                                            validation.handleBlur
                                                        }
                                                        value={
                                                            validation.values
                                                                .auto_disable ||
                                                            ""
                                                        }
                                                        invalid={
                                                            validation.touched
                                                                .auto_disable &&
                                                            validation.errors
                                                                .auto_disable
                                                                ? true
                                                                : false
                                                        }
                                                    >
                                                        <option value="0">
                                                            No
                                                        </option>
                                                        <option value="1">
                                                            Yes
                                                        </option>
                                                    </Input>
                                                    {validation.touched
                                                        .auto_disable &&
                                                    validation.errors
                                                        .auto_disable ? (
                                                        <FormFeedback type="invalid">
                                                            {
                                                                validation
                                                                    .errors
                                                                    .auto_disable
                                                            }
                                                        </FormFeedback>
                                                    ) : null}
                                                </FormGroup>
                                            </Col>
                                            <Col md="6">
                                                <FormGroup className="mb-3">
                                                    <Label htmlFor="custom_duedate">
                                                        Duedate
                                                    </Label>
                                                    <Input
                                                        name="custom_duedate"
                                                        id="custom_duedate"
                                                        type="select"
                                                        className="form-control"
                                                        onChange={
                                                            validation.handleChange
                                                        }
                                                        onBlur={
                                                            validation.handleBlur
                                                        }
                                                        value={
                                                            validation.values
                                                                .custom_duedate ||
                                                            ""
                                                        }
                                                        invalid={
                                                            validation.touched
                                                                .custom_duedate &&
                                                            validation.errors
                                                                .custom_duedate
                                                                ? true
                                                                : false
                                                        }
                                                    >
                                                        <option value="0">
                                                            No
                                                        </option>
                                                        <option value="1">
                                                            Yes
                                                        </option>
                                                    </Input>
                                                    {validation.touched
                                                        .custom_duedate &&
                                                    validation.errors
                                                        .custom_duedate ? (
                                                        <FormFeedback type="invalid">
                                                            {
                                                                validation
                                                                    .errors
                                                                    .custom_duedate
                                                            }
                                                        </FormFeedback>
                                                    ) : null}
                                                </FormGroup>
                                            </Col>
                                        </Row>
                                        <Row>
                                            <Col lg="12">
                                                <FormGroup className="mb-3">
                                                    <div className="form-check">
                                                        <Input
                                                            type="checkbox"
                                                            className="form-check-input"
                                                            id="invalidCheck"
                                                        />
                                                        <Label
                                                            className="form-check-label"
                                                            htmlFor="invalidCheck"
                                                        >
                                                            {" "}
                                                            Agree to terms and
                                                            conditions
                                                        </Label>
                                                    </div>
                                                </FormGroup>
                                            </Col>
                                        </Row>
                                        <Button color="primary" type="submit">
                                            Activation
                                        </Button>
                                    </Form>
                                </CardBody>
                            </Card>
                        </Col>

                        <Col xl="4">
                            <Card>
                                <CardBody>
                                    <h4 className="card-title">
                                        React Validation (Tooltips)
                                    </h4>
                                    <p className="card-title-desc">
                                        If your form layout allows it, you can
                                        swap the
                                        <code>
                                            .{"{valid | invalid-}"}feedback
                                        </code>{" "}
                                        classes for
                                        <code>
                                            .{"{valid | invalid-}"}-tooltip
                                        </code>{" "}
                                        classes to display validation feedback
                                        in a styled tooltip.
                                    </p>
                                    {/* <form
                                        className="needs-validation"
                                        method="post"
                                        id="tooltipForm"
                                        onSubmit={(e) => {
                                            handleSubmit(e);
                                        }}
                                    >
                                        <Row>
                                            <Col md="4">
                                                <div className="mb-3 position-relative">
                                                    <Label htmlFor="validationTooltip01">
                                                        First name
                                                    </Label>
                                                    <Input
                                                        type="text"
                                                        className="form-control"
                                                        id="validationTooltip01"
                                                        placeholder="First name"
                                                        onChange={(event) => {
                                                            onChangeValidation(
                                                                "fnm",
                                                                event.target
                                                                    .value
                                                            );
                                                        }}
                                                        valid={
                                                            validation[
                                                                "fnm"
                                                            ] === true
                                                        }
                                                        invalid={
                                                            validation[
                                                                "fnm"
                                                            ] !== true &&
                                                            validation[
                                                                "fnm"
                                                            ] !== null
                                                        }
                                                    />

                                                    <div
                                                        className={
                                                            validation[
                                                                "fnm"
                                                            ] === true
                                                                ? "valid-tooltip"
                                                                : "invalid-tooltip"
                                                        }
                                                        name="validate"
                                                        id="validate1"
                                                    >
                                                        {validation["fnm"] ===
                                                        true
                                                            ? "Looks good!"
                                                            : "Please Enter Valid First Name"}
                                                    </div>
                                                </div>
                                            </Col>
                                            <Col md="4">
                                                <div className="mb-3 position-relative">
                                                    <Label htmlFor="validationTooltip02">
                                                        Last name
                                                    </Label>
                                                    <Input
                                                        type="text"
                                                        className="form-control"
                                                        id="validationTooltip02"
                                                        placeholder="Last name"
                                                        onChange={(event) =>
                                                            onChangeValidation(
                                                                "lnm",
                                                                event.target
                                                                    .value
                                                            )
                                                        }
                                                        valid={
                                                            validation[
                                                                "lnm"
                                                            ] === true
                                                        }
                                                        invalid={
                                                            validation[
                                                                "lnm"
                                                            ] !== true &&
                                                            validation[
                                                                "lnm"
                                                            ] !== null
                                                        }
                                                    />
                                                    <div
                                                        className={
                                                            validation[
                                                                "lnm"
                                                            ] === true
                                                                ? "valid-tooltip"
                                                                : "invalid-tooltip"
                                                        }
                                                        name="validate"
                                                        id="validate2"
                                                    >
                                                        {validation["lnm"] ===
                                                        true
                                                            ? "Looks good!"
                                                            : "Please Enter Valid Last Name"}
                                                    </div>
                                                </div>
                                            </Col>
                                            <Col md="4">
                                                <div className="mb-3 position-relative">
                                                    <Label htmlFor="validationTooltipUsername">
                                                        Username
                                                    </Label>
                                                    <div className="input-group">
                                                        <div className="input-group-prepend">
                                                            <span
                                                                className="input-group-text"
                                                                id="validationTooltipUsernamePrepend"
                                                            >
                                                                @
                                                            </span>
                                                        </div>
                                                        <Input
                                                            type="text"
                                                            className="form-control"
                                                            id="validationTooltipUsername"
                                                            placeholder="Username"
                                                            onChange={(event) =>
                                                                onChangeValidation(
                                                                    "unm",
                                                                    event.target
                                                                        .value
                                                                )
                                                            }
                                                            valid={
                                                                validation[
                                                                    "unm"
                                                                ] === true
                                                            }
                                                            invalid={
                                                                validation[
                                                                    "unm"
                                                                ] !== true &&
                                                                validation[
                                                                    "unm"
                                                                ] !== null
                                                            }
                                                        />
                                                        <div
                                                            className={
                                                                validation[
                                                                    "unm"
                                                                ] === true
                                                                    ? "valid-tooltip"
                                                                    : "invalid-tooltip"
                                                            }
                                                            name="validate"
                                                            id="validate3"
                                                        >
                                                            {validation[
                                                                "unm"
                                                            ] === true
                                                                ? "Looks good!"
                                                                : "Please choose a unique and valid username."}
                                                        </div>
                                                    </div>
                                                </div>
                                            </Col>
                                        </Row>
                                        <Row>
                                            <Col md="6">
                                                <div className="mb-3 position-relative">
                                                    <Label htmlFor="validationTooltip03">
                                                        City
                                                    </Label>
                                                    <Input
                                                        type="text"
                                                        className="form-control"
                                                        id="validationTooltip03"
                                                        placeholder="City"
                                                        onChange={(event) =>
                                                            onChangeValidation(
                                                                "city",
                                                                event.target
                                                                    .value
                                                            )
                                                        }
                                                        valid={
                                                            validation[
                                                                "city"
                                                            ] === true
                                                        }
                                                        invalid={
                                                            validation[
                                                                "city"
                                                            ] !== true &&
                                                            validation[
                                                                "city"
                                                            ] !== null
                                                        }
                                                    />
                                                    <div
                                                        className={
                                                            validation[
                                                                "city"
                                                            ] === true
                                                                ? "valid-tooltip"
                                                                : "invalid-tooltip"
                                                        }
                                                        name="validate"
                                                        id="validate4"
                                                    >
                                                        {validation["city"] ===
                                                        true
                                                            ? "Looks good!"
                                                            : "Please choose a unique and valid username.Please provide a valid city."}
                                                    </div>
                                                </div>
                                            </Col>
                                            <Col md="6">
                                                <div className="mb-3 position-relative">
                                                    <Label htmlFor="validationTooltip04">
                                                        State
                                                    </Label>
                                                    <Input
                                                        type="text"
                                                        className="form-control"
                                                        id="validationTooltip04"
                                                        placeholder="State"
                                                        onChange={(event) =>
                                                            onChangeValidation(
                                                                "stateV",
                                                                event.target
                                                                    .value
                                                            )
                                                        }
                                                        valid={
                                                            validation[
                                                                "stateV"
                                                            ] === true
                                                        }
                                                        invalid={
                                                            validation[
                                                                "stateV"
                                                            ] !== true &&
                                                            validation[
                                                                "stateV"
                                                            ] !== null
                                                        }
                                                    />
                                                    <div
                                                        className={
                                                            validation[
                                                                "stateV"
                                                            ] === true
                                                                ? "valid-tooltip"
                                                                : "invalid-tooltip"
                                                        }
                                                        name="validate"
                                                        id="validate5"
                                                    >
                                                        {validation[
                                                            "stateV"
                                                        ] === true
                                                            ? "Looks good!"
                                                            : "Please provide a valid state."}
                                                    </div>
                                                </div>
                                            </Col>
                                        </Row>
                                        <Button color="primary" type="submit">
                                            Activation
                                        </Button>
                                    </form> */}
                                </CardBody>
                            </Card>
                        </Col>
                    </Row>
                </Container>
            </div>
        </>
    );
};

export default SubscriptionCreate;
