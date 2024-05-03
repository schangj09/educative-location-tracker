import {
  MapContainer, Marker, Popup, TileLayer, Polygon
} from 'react-leaflet';
import Leaflet from 'leaflet';
import { useEffect, useState } from 'react';
import {
  FaFileCsv, FaTrash, FaEdit,
} from 'react-icons/fa';
import Cookies from 'js-cookie';
import axios from 'axios';
import { toast } from 'react-toastify';
import { Link } from 'react-router-dom';
import serverURL from '../utils/urls';
import getCsvData from '../utils/csv';
import useAuth from '../hooks/useAuth';
import DownloadMap from '../utils/downloadmap';

export default function MyLocationsDetails() {
  // get authenticated user from custom hook effect
  const { authUser } = useAuth();

  // create state variables
  const [locations, setLocations] = useState([]);
  
  return <div>MyLocationsMap</div>;
}
