import React from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import { Icon } from 'leaflet';

const USERNAME = "thanhtuancsk20";
const STYLE_ID = "clgfhviyf001v01qtabbzghph";
const ACCESS_TOKEN = "pk.eyJ1IjoidGhhbmh0dWFuY3NrMjAiLCJhIjoiY2xyZGRnZHYxMGZqazJqbzNiY3pjNTdzdiJ9.lCNHVLuQsMyIx41kAZGE7g";

const iconPerson = new Icon({
  iconUrl: 'https://firebasestorage.googleapis.com/v0/b/bhx-clone-5db5a.appspot.com/o/marker.png?alt=media&token=861d37da-9d43-49cb-ab48-da360cdbc6b1',
  iconRetinaUrl: 'https://firebasestorage.googleapis.com/v0/b/bhx-clone-5db5a.appspot.com/o/marker.png?alt=media&token=861d37da-9d43-49cb-ab48-da360cdbc6b1',
  iconSize: [20, 30],
});

function Map(props) {
  let data = props.data;
  const zoom = 14;

  return (
    <MapContainer center={data} scrollWheelZoom={false} style={{ minHeight: '75vh', minWidth: '75vw' }} zoom={zoom}>
    <TileLayer
      attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
      url={`https://api.mapbox.com/styles/v1/${USERNAME}/${STYLE_ID}/tiles/256/{z}/{x}/{y}@2x?access_token=${ACCESS_TOKEN}`}
    />
    <Marker position={data} icon={iconPerson}>
    </Marker>
  </MapContainer>
  );
}

export default Map;
