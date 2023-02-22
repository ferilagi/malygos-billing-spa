import { Link, router } from "@inertiajs/react";
import { useState, useEffect } from "react";
import { Row, Col, Table, UncontrolledTooltip } from "reactstrap";

import mago from "../../../assets/images/companies/img-2.png";

const SyncStatic = (props) => {

    const [filters, setFilters] = useState([]);
    const ar = props.ar;
    const sak = props.sak;

    useEffect(() => {
        setFilters(props.filters)
    }, [props.filters])

    const handleProfileChange = (item, sprof) => {
        const updatedFilters = filters.map(filter => {
            if (filter === item) {
              return { ...filter, sProfile: sprof };
            } else {
              return filter;
            }
          });
          setFilters(updatedFilters);
    }

    const handleAreaChange = (item, area) => {
        const updatedFilters = filters.map(filter => {
            if (filter === item) {
              return { ...filter, thisArea: area };
            } else {
              return filter;
            }
          });
          setFilters(updatedFilters);
        console.log(item)
    }

    const handleSaveSyncStatic = (item) => {
        const submitButton = document.getElementById("saveSyncButton");
        nProgress.start();
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
            },
        })
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
                            <p className="text-muted mb-0"><span className={"badge bg-primary"}>{item.comment}</span></p>
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
                </div>
            </div>
            </Col>
        </Row>

    );
};

export default SyncStatic;
