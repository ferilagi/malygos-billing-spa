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

import mago from "../../../assets/images/companies/img-2.png";
import migo from "../../../assets/images/companies/img-3.png";

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

    const [filters, setFilters] = useState(users)

    useEffect(() =>{
        type != "static" ? setIsStatic(false) : setIsStatic(true)
        setFilters([])
        // console.log(mikrotik, type, isStatic)
    }, [type, mikrotik])

    const handleSync = async (e) => {
        e.preventDefault();
        // console.log(mikrotik)

        if (mikrotik === "" || type === "") {
            return
        }

        router.get(route('sync.index'), {router: mikrotik, type: type}, {
            preserveState: true,
            replace:true,
            onSuccess: () => {
                return Promise.all([
                    setFilters(users)
                ])
              }
        });

    };

    const handleAreaChange = (item, area) => {
        item.thisArea = area; // menyimpan nilai area pada item
    }
    const handleProfileChange = (item, sprof) => {
        item.sProfile = sprof; // menyimpan nilai profile pada item
        console.log(item, sprof)
    }

    const handleSaveSyncPPP = (item) => {
        setIsLoading(true);
        const submitButton = document.getElementById("saveSyncButton");
        NProgress.start();
        submitButton.disabled = true;

        const data = ({
            service: item.service,
            name: item.name,
            password: item.password,
            profile: item.profile,
            area: item.thisArea,
        });

        router.post(route('sync.ppp.store'), data, {
            onProgress: (event) => {
                console.log('Progress:', event.loaded, event.total);
                const percentCompleted = (event.loaded / event.total) * 100;
                NProgress.set(percentCompleted);
            },
        }).then(() => {
            setIsLoading(false);
            NProgress.done();
            submitButton.disabled = false;
            console.log('Data saved successfully');
            // Implementasi tindakan setelah data berhasil disimpan
        }).catch((error) => {
            setIsLoading(false);
            NProgress.done();
            submitButton.disabled = false;
            console.log(error.message);
            // Implementasi tindakan jika terjadi error
        });
    };

    const handleSaveSyncStatic = (item) => {
        setIsLoading(true);
        const submitButton = document.getElementById("saveSyncButton");
        NProgress.start();
        submitButton.disabled = true;

        const data = ({
            queuename: item.name,
            target: item.target,
            parent: item.parent,
            profile: item.sProfile,
            area: item.thisArea,
        });

        router.post(route('sync.static.store'), data, {
            onProgress: (event) => {
                console.log('Progress:', event.loaded, event.total);
                const percentCompleted = (event.loaded / event.total) * 100;
                NProgress.set(percentCompleted);
            },
        }).then(() => {
            setIsLoading(false);
            NProgress.done();
            submitButton.disabled = false;
            console.log('Data saved successfully');
            // Implementasi tindakan setelah data berhasil disimpan
        }).catch((error) => {
            setIsLoading(false);
            NProgress.done();
            submitButton.disabled = false;
            console.log(error.message);
            // Implementasi tindakan jika terjadi error
        });
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
                                                            onChange={(e) => setMikrotik(e.target.value)}
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
                                                            onChange={(e) => setType(e.target.value)}
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

                    <Row>
                        <Col lg="12">
                        <div className="">
                            <div className="table-responsive">
                            {!isStatic ?
                                <Table className="project-list-table table-nowrap align-middle table-borderless">
                                    <thead>
                                    <tr>
                                        <th scope="col" style={{ width: "100px" }}>
                                        #
                                        </th>
                                        <th scope="col">Username</th>
                                        <th scope="col">Password</th>
                                        <th scope="col">Profile</th>
                                        <th scope="col">Comment</th>
                                        <th scope="col">Area</th>
                                        <th scope="col">Action</th>
                                    </tr>
                                    </thead>
                                    <tbody>
                                    {filters.map((item, key) => (
                                        <tr key={key}>
                                        <td><img src={migo} alt="" className="avatar-sm" /></td>
                                        <td>
                                            <h5 className="text-truncate font-size-14"><Link to="" className="text-dark">{item['name']}</Link></h5>
                                            <p className="text-muted mb-0">{item['parent-queue']} </p>
                                        </td>
                                        <td>{item['password']}</td>
                                        <td>{item['profile']}</td>
                                        <td><span className={"badge bg-primary"}>{item.comment}</span></td>
                                        <td>
                                            <select
                                            name="area"
                                            id="area"
                                            value={item.thisArea || ''}
                                            onChange={(e) => handleAreaChange(item, e.target.value)}
                                            className="form-select">
                                                <option value="">select</option>
                                                {ar.map( area => (
                                                <option key={area.id} value={area.id}>
                                                    {area.name}
                                                </option>
                                                ))}

                                            </select>
                                        </td>
                                        <td>
                                            <div style={{ textAlign: "center" }}>
                                                <a
                                                    to="#"
                                                    className="text-success"
                                                    onClick={() => handleSaveSyncPPP(item)}
                                                    // onClick={e => console.log(cellProps)}
                                                >
                                                    <i
                                                        className="mdi mdi-content-save font-size-20"
                                                        id="saveSyncButton"
                                                    />
                                                    <UncontrolledTooltip
                                                        placement="left"
                                                        target="saveSyncButton"
                                                    >
                                                        Import to Database
                                                    </UncontrolledTooltip>
                                                </a>
                                            </div>
                                        </td>
                                        </tr>
                                    ))}
                                    </tbody>
                                </Table>
                            :
                                <Table className="project-list-table table-nowrap align-middle table-borderless">
                                <thead>
                                <tr>
                                    <th scope="col" style={{ width: "100px" }}>
                                    #
                                    </th>
                                    <th scope="col">Queue Name</th>
                                    <th scope="col">Target IP</th>
                                    <th scope="col">Parent Queue</th>
                                    <th scope="col">Profil</th>
                                    <th scope="col">Area</th>
                                    <th scope="col">Action</th>
                                </tr>
                                </thead>
                                <tbody>
                                {filters.map((item, key) => (
                                    <tr key={key}>
                                    <td><img src={mago} alt="" className="avatar-sm" /></td>
                                    <td>
                                        <h5 className="text-truncate font-size-14"><Link to="" className="text-dark">{item.name}</Link></h5>
                                        <p className="text-muted mb-0">{item.comment} </p>
                                    </td>
                                    <td>{item.target}</td>
                                    <td>{item.parent}</td>
                                    <td>
                                        <select
                                            name="sprofile"
                                            id="sprofile"
                                            value={item.sProfile || ''}
                                            onChange={(e) => handleProfileChange(item, e.target.value)}
                                            className="form-select">
                                                <option value="">select</option>
                                                {sak.map( sa => (
                                                <option key={sa.id} value={sa.id}>
                                                    {sa.name_prof}
                                                </option>
                                                ))}
                                        </select>
                                    </td>
                                    <td>
                                        <select
                                        name="areaStatic"
                                        id="areaStatic"
                                        value={item.thisArea || ''}
                                        onChange={(e) => handleAreaChange(item, e.target.value)}
                                        className="form-select">
                                            <option value="">select</option>
                                            {ar.map( area => (
                                            <option key={area.id} value={area.id}>
                                                {area.name}
                                            </option>
                                            ))}
                                        </select>
                                    </td>
                                    <td>
                                        <div style={{ textAlign: "center" }}>
                                            <a
                                                to="#"
                                                className="text-success"
                                                onClick={() => handleSaveSyncStatic(item)}
                                                // onClick={e => console.log(cellProps)}
                                            >
                                                <i
                                                    className="mdi mdi-content-save font-size-20"
                                                    id="saveSyncButton"
                                                />
                                                <UncontrolledTooltip
                                                    placement="left"
                                                    target="saveSyncButton"
                                                >
                                                    Import to Database
                                                </UncontrolledTooltip>
                                            </a>
                                        </div>
                                    </td>
                                    </tr>
                                ))}
                                </tbody>
                                </Table>
                            }
                            </div>
                        </div>
                        </Col>
                    </Row>
                </Container>
            </div>
        </>
    );
};

export default SyncIndex;
