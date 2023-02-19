import { Link, router } from "@inertiajs/react";
import nProgress from "nprogress";
import { useState, useEffect } from "react";
import { Row, Col, Table, UncontrolledTooltip } from "reactstrap";


import migo from "../../../assets/images/companies/img-3.png";

const SyncPPP = (props) => {

    const [filters, setFilters] = useState([]);
    const ar = props.ar;

    useEffect(() => {
        setFilters(props.filters)
    }, [props.filters])


    const handleAreaChange = (item, area) => {
        const updatedFilters = filters.map(filter => {
            if (filter === item) {
              return { ...filter, thisArea: area };
            } else {
              return filter;
            }
          });
          setFilters(updatedFilters);
    }

    const handleSaveSyncPPP = (item) => {
        setIsLoading(true);
        const submitButton = document.getElementById("saveSyncButton");
        nProgress.start();
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
                nProgress.set(percentCompleted);
            },
        }).then(() => {
            setIsLoading(false);
            nProgress.done();
            submitButton.disabled = false;
            console.log('Data saved successfully');
            // Implementasi tindakan setelah data berhasil disimpan
        }).catch((error) => {
            setIsLoading(false);
            nProgress.done();
            submitButton.disabled = false;
            console.log(error.message);
            // Implementasi tindakan jika terjadi error
        });
    };

    return (

        <Row>
            <Col lg="12">
            <div className="">
                <div className="table-responsive">
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
                </div>
            </div>
            </Col>
        </Row>

    );
};

export default SyncPPP;
