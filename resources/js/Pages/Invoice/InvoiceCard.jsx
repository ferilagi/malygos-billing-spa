import React, { useState, useEffect } from "react"
import { Link } from "@inertiajs/react"

import { Button, Card, CardBody, Col, Row, UncontrolledTooltip } from "reactstrap"
import images from "../../../assets/images"

import { currencyFormat, formatDate } from "@/helpers/formatValue";

const InvoiceCard = ({ trans, setPayModal, setPayInvoice }) => {

    const pagination = 12 ;  // or whatever you like
    const [index , setIndex] = useState (0)
    const [filter , setFilter] = useState ([])

    useEffect(() => {
        const numberOfItems = pagination * ( index +1 );
        const newArray = [];
        for(let i= 0 ;i< trans.length ; i++ ){
            // const namechart = props.trans[i].name.charAt(0)
          if(i < numberOfItems)
              newArray.push(trans[i])
        }

        setFilter(newArray);

    } , [index])

  return (
    <>
        <Row>
            {filter.map((tran, key) => (
            <Col xl="4" sm="6" key={key}>
                <Card>
                <CardBody>
                    <Row>
                    <Col lg="4">
                        <div className="text-lg-center">
                        {tran.image ? (
                            <img
                            src={images[tran.image]}
                            className="avatar-sm me-3 mx-lg-auto mb-3 mt-1 float-start float-lg-none rounded-circle"
                            alt="img"
                            />
                        ) : (
                            <div className="avatar-sm me-3 mx-lg-auto mb-3 mt-1 float-start float-lg-none rounded-circle">
                            <span
                                className=
                                "avatar-title rounded-circle bg-soft bg-primary text-primary font-size-16"
                            >
                                {`${tran.name.charAt(0)}`}
                            </span>
                            </div>
                        )}

                        <h5 className="mb-2 font-size-15 text-truncate">
                            {tran.status === 'unpaid'?
                            <a
                            type="button"
                            onClick={() => {
                                const invPay = tran;
                                setPayInvoice(invPay);
                                setPayModal(true);}}
                            >
                                <span className="text-danger">{tran.status}</span>
                            </a>
                            :
                            <span className="text-success">{tran.status}</span>

                            }
                        </h5>
                        <span className="text-muted text-truncate">
                            {tran.owner.name}
                        </span>
                        </div>
                    </Col>

                    <Col lg="8">
                        <div>
                        <Link
                            href={`/invoice/${tran.id}`}
                            className="d-block text-primary text-decoration-underline mb-2"
                        >
                            # {tran.id}
                        </Link>
                        <h5 className="text-truncate mb-4 mb-lg-5" id={`ownerTooltip-${tran.id}`} >
                            {tran.name}
                            <UncontrolledTooltip
                                placement="top"
                                target={`ownerTooltip-${tran.id}`}
                                >
                                Owner : {tran.owner.name}
                                </UncontrolledTooltip>
                        </h5>
                        <ul className="list-inline mb-0">
                            <li className="list-inline-item me-3">
                            <h5 className="font-size-12" id={`amountTooltip-${tran.id}`}>
                                <i className="bx bx-money me-1 text-muted" />
                                {currencyFormat(tran.total)}
                                <UncontrolledTooltip
                                placement="top"
                                target={`amountTooltip-${tran.id}`}
                                >
                                Amount
                                </UncontrolledTooltip>
                            </h5>
                            </li>{" "}
                            <li className="list-inline-item">
                            <h5 className="font-size-12" id={`periodTooltip-${tran.id}`}>
                                <i className="bx bx-calendar me-1 text-muted" />{" "}
                                {formatDate(tran.period, "MMM, Y")}
                                <UncontrolledTooltip
                                placement="top"
                                target={`periodTooltip-${tran.id}`}
                                >
                                Due Date
                                </UncontrolledTooltip>
                            </h5>
                            </li>
                        </ul>
                        </div>
                    </Col>
                    </Row>
                </CardBody>
                </Card>
            </Col>
            ))}
        </Row>

        <Row>
            <Col xs="12">
              <div className="text-center my-3">
                <a type="button" onClick={ () => setIndex (index+1 )} to="#" className="text-success">
                  <i className="bx bx-loader bx-spin font-size-18 align-middle me-2" />
                  Load more
                </a>
              </div>
            </Col>
          </Row>
    </>
  )
}

export default InvoiceCard
