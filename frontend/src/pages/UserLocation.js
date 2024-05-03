import { useEffect, useState, useCallback } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';
import {
  MapContainer, Marker, Popup, TileLayer,
} from 'react-leaflet';
import Leaflet from 'leaflet';
import useAuth from '../hooks/useAuth';
import serverURL from '../utils/urls';
import Loader from '../components/Loader';

export default function UserLocation() {

  return (
    <div className="p-3 h-screen lg:p-10 py-10 dark:text-white border mt-10">
      User Location Page
    </div>
  );
}
