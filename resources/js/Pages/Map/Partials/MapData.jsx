import React, {
    useState,
    useRef,
    useMemo,
    useCallback,
    Component
} from "react"
import PropTypes from 'prop-types'
import Leaflet from "leaflet"
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet"
import "leaflet/dist/leaflet.css"

Leaflet.Icon.Default.imagePath = "../node_modules/leaflet"

delete Leaflet.Icon.Default.prototype._getIconUrl

Leaflet.Icon.Default.mergeOptions({
  iconUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png'
})

const MapData = (props) => {

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
        },
        }),
        [],
    )

    const toggleDraggable = useCallback(() => {
        setDraggable((d) => !d)
    }, [])

    return (
        <>
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
                    <span onClick={toggleDraggable}>
                    {draggable
                        ? 'Marker is draggable'
                        : 'Click here to make marker draggable'}
                    </span>
                </Popup>
                </Marker>
            </MapContainer>
        </>
    )
}

MapData.propTypes = {
    position: PropTypes.any,
  }

export default MapData
