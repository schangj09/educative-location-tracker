import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import { useEffect, useState } from "react";
import { FaUserCheck, FaLocationDot } from "react-icons/fa6";
import { CiUser } from "react-icons/ci";
import axios from "axios";
import Cookies from "js-cookie";
import { Link } from "react-router-dom";
import Leaflet from "leaflet";
import { toast } from "react-toastify";
import { FaFileCsv } from "react-icons/fa";
import serverURL from "../utils/urls";
import useAuth from "../hooks/useAuth";
import getCsvData from "../utils/csv";
import DownloadMap from "../utils/downloadmap";

export default function MyFriendsMap() {
  return <div>MyFriendsMap</div>;
}
