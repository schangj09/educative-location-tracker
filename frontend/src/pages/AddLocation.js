import Autocomplete from '../components/Autocomplete';
import MapComponent from '../components/MapComponent';
import useAuth from '../hooks/useAuth';
import axios from 'axios';
import { toast } from "react-toastify";
import Cookies from 'js-cookie';
import serverURL from '../utils/urls';
import { useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import AppContext from '../utils/AppContext';

export default function AddLocation() {
  useAuth();
  return (
    <div className="text-black dark:text-white lg:p-10">
      Add Location Page
    </div>
  );
}
