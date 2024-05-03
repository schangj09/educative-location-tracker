import { useState } from 'react';
import Cookies from 'js-cookie';
import axios from 'axios';
import { toast } from 'react-toastify';
import EditLocationModal from '../components/EditLocationModal';
import MyLocationsDetails from '../components/MyLocationsDetails';
import serverURL from '../utils/urls';

export default function MyLocations() {
  return (
    <div className="">
      <div className="text-black dark:text-white lg:p-10">
        My Locations Page
      </div>
    </div>
  );
}
