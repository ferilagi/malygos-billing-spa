import React, { useEffect, useState } from "react";
import NProgress from 'nprogress'
import "nprogress/nprogress.css";
import { Head, Link, router } from "@inertiajs/react";
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
    UncontrolledDropdown,
    DropdownToggle,
    DropdownMenu,
    DropdownItem,
    Form,
    UncontrolledTooltip,
} from "reactstrap";



//Import Breadcrumb
import Breadcrumbs from "../../Layouts/Partials/Breadcrumb";

// Import Partial Sync
import SyncPPP from "./SyncPPP";
import SyncStatic from "./SyncStatic";


const SyncIndex = (props) => {

    const users = Object.values(props.users);
    const routers = props.routers;
    const sak = props.sak;
    const ar = props.ar;

    const [isOpen, setIsOpen] = useState(false);
    const toggle = () => setIsOpen(!isOpen);

    // const [router, setRouter] = useState(props.router);
    const [mikrotik, setMikrotik] = useState('')
    const [type, setType] = useState('')
    const [isStatic, setIsStatic] = useState(false)

    const [isLoading, setIsLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");

    const [filters, setFilters] = useState([])

    const handleSetMikrotik = (e) => {
        setMikrotik(e.target.value)
    }

    const handleSetType = (e) => {
        setType(e.target.value)
    }

    useEffect(() =>{
        type != "static" ? setIsStatic(false) : setIsStatic(true)
        setFilters([])
        console.log(mikrotik, type, isStatic)
    }, [type, mikrotik])

    useEffect(() => {
        const deBounce = setTimeout(() => {
            setFilters(users); // panggil fungsi getFilters ketika komponen dimount
        }, 500);
        return () => clearTimeout(deBounce);
    }, [props.users]);


    const handleSync = (e) => {

        e.preventDefault();
        if (mikrotik === "" || type === "") {
            return
        }
        router.get(route('sync.index'), {router: mikrotik, type: type}, {
            preserveState: true,
            replace:true,
        })
    };


    return (
        <>
            <Head title="Sync" />
            <div className="page-content">
                <Container fluid>
                    {/* Render Breadcrumbs */}
                    <Breadcrumbs title="Sync" breadcrumbItem="Import User" />

                    {/* show loading indicator if isLoading is true */}
                    {isLoading && <div className="loading-indicator">Loading...</div>}

                    {/* show error message if it exists */}
                    {errorMessage && <div className="error-message">{errorMessage}</div>}

                    <Row>
                        <Col lg={12}>
                            <Card className="job-filter">
                                <CardBody>
                                    <Row className="g-3">
                                        <Form onSubmit={handleSync}>
                                            <Row>
                                                <Col xxl={2} lg={10}>
                                                    <Row className="mb-3">
                                                        <Label htmlFor="router" className="col-md-2 col-form-label">Mikrotik</Label>
                                                        <Col md={4}>
                                                            <select
                                                            className="form-select"
                                                            name="router"
                                                            onChange={(e) => handleSetMikrotik(e)}
                                                            >
                                                                <option value="">Select</option>
                                                                {routers.map( router => (
                                                                <option key={router.name} value={router.name}>
                                                                    {router.name}
                                                                </option>
                                                                ))}
                                                            </select>
                                                        </Col>
                                                        <Label htmlFor="type" className="col-md-2 col-form-label">Type</Label>
                                                        <Col md={4}>
                                                            <select
                                                            className="form-select"
                                                            name="type"
                                                            onChange={(e) => handleSetType(e)}
                                                            >
                                                                <option value="">Select</option>
                                                                <option value="ppp">PPPoE</option>
                                                                <option value="static">Static</option>
                                                            </select>
                                                        </Col>
                                                    </Row>
                                                </Col>

                                                <Col xxl={2} lg={2}>
                                                    <div className="float-end">
                                                        <button
                                                            type="submit"
                                                            className="btn btn-primary ms-3"
                                                        >
                                                            <i className="bx bx-search-alt align-middle"></i>{" "}
                                                            Import User
                                                        </button>
                                                    </div>
                                                </Col>
                                            </Row>
                                        </Form>
                                    </Row>

                                </CardBody>
                            </Card>
                        </Col>
                    </Row>

                    {!isStatic ?
                        <SyncPPP
                        ar = {ar}
                        filters = {filters}
                        />
                        :
                        <SyncStatic
                        ar = {ar}
                        sak = {sak}
                        filters = {filters}
                        />
                    }

                </Container>
            </div>
        </>
    );
};

export default SyncIndex;
