import PropTypes from 'prop-types'
import React, { useEffect, useState } from "react"
import { Col, Modal, ModalBody, Row } from "reactstrap"

const StatusModal = ({ show, statusChange, onActiveClick, onIsolateClick, onCloseClick }) => {

    const [isStatus, setIsStatus] = useState('')

    useEffect(() => {
        if (statusChange) {
            setIsStatus(statusChange.status)
        }
    }, [statusChange]);

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
              <h4>Ubah Status ?</h4>
            </div>
          </Col>
        </Row>
        <Row>
          <Col>
            <div className="text-center mt-3">
              <button
                disabled={isStatus === 'active'}
                type="button"
                className="btn btn-success btn-lg ms-2 my-2"
                onClick={onActiveClick}
              >
                Active!
              </button>
              <button
                disabled={isStatus === 'isolated'}
                type="button"
                className="btn btn-danger btn-lg ms-2 my-2"
                onClick={onIsolateClick}
              >
                Isolir!
              </button>
              <button
                type="button"
                className="btn btn-secondary btn-lg ms-2 my-2"
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

StatusModal.propTypes = {
  onCloseClick: PropTypes.func,
  onActiveClick: PropTypes.func,
  onIsolateClick: PropTypes.func,
  show: PropTypes.any
}

export default StatusModal
