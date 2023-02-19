import React, {
    useState,
    useRef,
    useMemo,
    useCallback,
    Component
} from "react"
import { Head, useForm } from "@inertiajs/react";

import {
    Container,
    Row,
    Col,
    Card,
    CardBody,
    Input,
    Nav,
    NavItem,
    NavLink,
    TabContent,
    TabPane,
    Label,
    InputGroup,
    Button
} from "reactstrap"

import classnames from "classnames"

//Import maps
import MapWithPopup from "./Partials/MapWithPopup"
import MapMarkerCustomIcons from "./Partials/MapMarkerCustomIcons"

//Import Breadcrumb
import Breadcrumb from "../../Layouts/Partials/Breadcrumb"
import SimpleBar from "simplebar-react";

// Leaflet
import Leaflet from "leaflet"
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet"
import "leaflet/dist/leaflet.css"

Leaflet.Icon.Default.imagePath = "../node_modules/leaflet"

delete Leaflet.Icon.Default.prototype._getIconUrl

Leaflet.Icon.Default.mergeOptions({
  iconUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png'
})

const MapIndex = (props) => {

    const areas = props.areas

    const [activeTab, setActiveTab] = useState("1")

    const toggleTab = tab => {
        if (activeTab !== tab) {
        setActiveTab(tab)
        }
    }

    const { data, setData, post, processing, errors, reset } = useForm({
        id: "",
        name: "",
        lat: "",
        lon: "",

    })

    const handleSubmit = (e) => {
        e.preventDefault()
        setData(
            data.lat = position.lat,
            data.lon = position.lng,
        )
        // console.log(data)
        post(route('area.store') ,{
            // preserveState: true,
            preserveScroll: true,
            replace: true
        })
        reset();
    }

    const defaultPosition = {
        lat: -7.87222,
        lng: 112.807126,
    }

    const zoomValue = 13

    // Draggable Marker
    const [draggable, setDraggable] = useState(false)
    const [position, setPosition] = useState(defaultPosition)
    const markerRef = useRef(null)

    const eventHandlers = useMemo(
        () => ({
        dragend() {
            const marker = markerRef.current
            if (marker != null) {
            setPosition(marker.getLatLng())
            }
        },}),
        [],
    )

    const toggleDraggable = useCallback(() => {
        setDraggable((d) => !d)
    }, [])


    return (
        <>
            <Head title="Map" />
            <div className="page-content">
                <Container fluid>
                <Breadcrumb title="Map" breadcrumbItem="Area" />

                    <Row>
                        <Col xl="8">
                            <Card>
                                <CardBody>
                                <h4 className="card-title mb-4">Price</h4>

                                <Row>
                                    <Col xl="3" sm="4">
                                    <div className="d-flex">
                                        <div className="avatar-sm me-3">
                                        <span className="avatar-title rounded-circle bg-warning bg-soft text-warning font-size-22">
                                            <i className="mdi mdi-bitcoin" />
                                        </span>
                                        </div>

                                        <div className="flex-grow-1">
                                        <p className="text-muted mb-2">Bitcoin</p>
                                        <h5>1.02356 BTC</h5>
                                        </div>
                                    </div>
                                    </Col>

                                    <Col xl="3" sm="4">
                                    <div className="mt-4 mt-sm-0">
                                        <p className="text-muted mb-2">In USD</p>
                                        <h5>6310.22 USD</h5>
                                    </div>
                                    </Col>

                                    <Col xl="3" sm="4">
                                    <div className="mt-4 mt-sm-0">
                                        <p className="text-muted mb-2">Last 24 hrs</p>
                                        <h5>
                                        0.24 % <i className="mdi mdi-arrow-up text-success" />
                                        </h5>
                                    </div>
                                    </Col>
                                </Row>

                                <div className="mt-4">
                                    <div id="leaflet-map-popup" className="leaflet-map">
                                        <MapContainer
                                            center={defaultPosition}
                                            zoom={zoomValue}
                                            scrollWheelZoom={false}
                                            style={{ height: "300px" }}
                                        >
                                            <TileLayer
                                            attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                                            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                                            />
                                            <Marker
                                            draggable={draggable}
                                            eventHandlers={eventHandlers}
                                            position={position}
                                            ref={markerRef}>

                                            <Popup minWidth={90}>
                                                <span>
                                                    This Location ?
                                                </span>
                                            </Popup>
                                            </Marker>
                                        </MapContainer>
                                    </div>
                                </div>

                                </CardBody>
                            </Card>
                        </Col>

                        <Col xl="4">
                            <Card>
                                <CardBody>
                                <div className="mt-4">
                                    <Nav pills className="bg-light rounded" role="tablist">
                                    <NavItem>
                                        <NavLink
                                        className={classnames({
                                            active: activeTab === "1",
                                        })}
                                        onClick={() => {
                                            toggleTab("1")
                                        }}
                                        >
                                        List Area
                                        </NavLink>
                                    </NavItem>
                                    <NavItem>
                                        <NavLink
                                        className={classnames({
                                            active: activeTab === "2",
                                        })}
                                        onClick={() => {
                                            toggleTab("2")
                                        }}
                                        >
                                        Add / Edit
                                        </NavLink>
                                    </NavItem>
                                    </Nav>

                                    <TabContent activeTab={activeTab} className="mt-4">
                                    <TabPane tabId="1" id="area-list">
                                        <SimpleBar className="mt-4" style={{ maxHeight: "350px" }}>
                                        {areas.map((area, key) => (
                                            <InputGroup  className="mb-3" key={key}>
                                                <Label className="input-group-text bg-primary bg-soft" style={{ width: "150px" }}>{area.name}</Label>
                                                <Input type="number" className="form-control text-end" disabled value={area.subs}/>
                                                <Label className="input-group-text"><span className="mdi mdi-account"></span></Label>
                                            </InputGroup>
                                        ))}
                                        </SimpleBar>
                                    </TabPane>
                                    <TabPane tabId="2" id="area-crud">
                                        <h5 className="font-size-14 mb-4">Add Area</h5>

                                        <form onSubmit={handleSubmit}>
                                        <div>
                                        <div>
                                            <InputGroup className="mb-3">
                                            <Label className="input-group-text" style={{ width: "100px" }}>Name</Label>
                                            <Input
                                            name="name"
                                            value={data.name}
                                            onChange={e => setData('name', e.target.value)}
                                            type="text"
                                            className="form-control"
                                            />
                                            <Label className="input-group-text">$</Label>
                                            </InputGroup>

                                            <InputGroup className="mb-3">
                                            <Button
                                            onClick={toggleDraggable}
                                            outline
                                            color={draggable ? 'info' : 'primary'}
                                            className="form-control success"
                                            >
                                            {draggable ? 'Lock location' : 'Click to pick'}
                                            </Button>
                                            <Label className="input-group-text">$</Label>
                                            </InputGroup>


                                            <InputGroup className="mb-3">
                                            <Label className="input-group-text" style={{ width: "100px" }}>Lattitude</Label>
                                            <Input
                                            readOnly
                                            value={position.lat || ''}
                                            type="text"
                                            className="form-control"
                                            />
                                            <Label className="input-group-text">$</Label>
                                            </InputGroup>

                                            <InputGroup className="mb-3">
                                            <Label className="input-group-text" style={{ width: "100px" }}>Longitude</Label>
                                            <Input
                                            readOnly
                                            value={position.lng || ''}
                                            type="text"
                                            className="form-control"
                                            />
                                            <Label className="input-group-text">$</Label>
                                            </InputGroup>
                                        </div>

                                        <div className="text-center">
                                            <Button
                                            type="submit"
                                            color="success"
                                            className="w-md"
                                            disabled={processing}
                                            >
                                            Save
                                            </Button>
                                        </div>
                                        </div>
                                        </form>
                                    </TabPane>
                                    </TabContent>
                                </div>
                                </CardBody>
                            </Card>
                        </Col>
                    </Row>

                    <Row>
                        <Col lg="6">
                        <Card>
                            <CardBody>
                            <h4 className="card-title mb-4">Working with popups</h4>
                            <div id="leaflet-map-popup" className="leaflet-map">
                                <MapWithPopup />
                            </div>
                            </CardBody>
                        </Card>
                        </Col>
                        <Col lg="6">
                        <Card>
                            <CardBody>
                            <h4 className="card-title mb-4">Markers with Custom Icons</h4>
                            <div id="leaflet-map-custom-icons" className="leaflet-map">
                                <MapMarkerCustomIcons />
                            </div>
                            </CardBody>
                        </Card>
                        </Col>
                    </Row>

                </Container>
            </div>
        </>
    )
}

export default MapIndex
