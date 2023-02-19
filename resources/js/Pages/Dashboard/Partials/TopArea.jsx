import React from "react";
import { Card, CardBody, CardTitle, Progress } from "reactstrap";

const TopArea = (props) => {
    const areas = props.areas

    return (
        <React.Fragment>
            <Card>
                <CardBody>
                    <CardTitle className="mb-4">
                        Top Area With Total Subscribers
                    </CardTitle>
                    <div className="text-center">
                        <div className="mb-4">
                            <i className="bx bx-map-pin text-primary display-4" />
                        </div>
                        {areas.length > 0 ?
                        <>
                            <h3>{areas[0]['count']}</h3>
                            <p>{areas[0]['name']}</p>
                        </> :
                        <>
                            <h3>No area</h3>
                            <p> - </p>
                        </>
                        }
                    </div>

                    <div className="table-responsive mt-4">
                        <table className="table align-middle table-nowrap">
                            <tbody>
                                {areas.slice(1).map((area, index) =>
                                <tr key={index}>
                                    <td style={{ width: "30%" }}>
                                        <p className="mb-0">{area.name}</p>
                                    </td>
                                    <td style={{ width: "25%" }}>
                                        <h5 className="mb-0">{area.count}</h5>
                                    </td>
                                    <td>
                                        <Progress
                                            value="94"
                                            color="primary"
                                            className="bg-transparent progress-sm"
                                            size="sm"
                                        />
                                    </td>
                                </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </CardBody>
            </Card>
        </React.Fragment>
    );
};

export default TopArea;
