import PropTypes from 'prop-types'
import React from "react"
import { Col, Modal, ModalBody, Row } from "reactstrap"

const PayModal = ({ show, onCashClick, onTransClick, onCloseClick }) => {
  return (
    <Modal isOpen={show} toggle={onCloseClick} centered={true}>
      <ModalBody className="py-3 px-3">
        <Row>
          <Col lg={12}>
            <div className="text-center">
              <i
                className="mdi mdi-alert-circle-outline"
                style={{ fontSize: "7em", color: "orange" }}
              />
              <h4>Lakukan Pembayaran 💰 ?</h4>
            </div>
          </Col>
        </Row>
        <Row>
          <Col>
            <div className="text-center mt-3">
              <button
                type="button"
                className="btn btn-success btn-lg ms-2 my-2"
                onClick={onCashClick}
              >
                Yes, Pay Cash!
              </button>
              <button
                type="button"
                className="btn btn-info btn-lg ms-2 my-2"
                onClick={onTransClick}
              >
                Yes, Pay Transfer!
              </button>
              <button
                type="button"
                className="btn btn-danger btn-lg ms-2 my-2"
                onClick={onCloseClick}
              >
                Cancel
              </button>
            </div>
          </Col>
        </Row>
      </ModalBody>
    </Modal>
  )
}

PayModal.propTypes = {
  onCloseClick: PropTypes.func,
  onCashClick: PropTypes.func,
  onTransClick: PropTypes.func,
  show: PropTypes.any
}

export default PayModal
