import axios from "axios";
import { FaCircleInfo, FaLocationDot } from "react-icons/fa6";
import { useState } from "react";
import serverURL from "../utils/urls";

export default function Autocomplete() {
  // state variables
  const [locations, setLocations] = useState([]); // array to store autocomplete suggestions
  const [locationInput, setLocationInput] = useState(""); // user input for location search
  const [inputTimer, setInputTimer] = useState(null); // timer for input debounce
  const [autocompleteError, setAutocompleteError] = useState(""); // error message for autocomplete

  const autocomplete = async (searchKey) => {
    if (searchKey) {
      try {
        const { data: data } = await axios.get(`${serverURL}/autocomplete/${searchKey}`);
        setLocations(data.data);
      } catch (error) {
        setLocations([]);
        setAutocompleteError(`Failed to get autocomplete: ${error.message}`);
      }
    } else {
      setLocations([]);
    }
  }

  // Handle input change
  const handleInputChange = (e) => {
    setLocationInput(e.target.value);
    clearTimeout(inputTimer);
    setInputTimer(setTimeout(() => { autocomplete(e.target.value) }, 300));
  };

  return (
    <div className="flex flex-col space-y-5">
      <div className="relative h-12 w-full">
        <FaLocationDot className="absolute right-3 top-4 text-green-500" />
        <input
          type="text"
          value={locationInput}
          autoFocus
          onChange={handleInputChange}
          placeholder="Type in location"
          className="w-full text-slate-500 p-2 rounded-md outline outline-green-200 outline-4 transition-all duration-500 bg-white dark:bg-black dark:text-white"
        />
      </div>
      <div className="  rounded-b-xl   max-h-[400px] ">
        {autocompleteError ? (
          <div className="text-red-500 flex items-center justify-center shadow-2xl p-3 rounded-md">
            <FaCircleInfo size={30} />
            <span className="ml-2">{autocompleteError}</span>
          </div>
        ) : locations.length > 0 ? (
          <div className="dark:text-white rounded-b-xl   max-h-[400px] bg-white dark:bg-black pb-10 relative">
            <ul className="py-3 bg-white dark:bg-black overflow-y-scroll max-h-[300px] relative">
              {
                locations.map((location) => (
                  <li
                    key={location.latitude}
                    className=" inset-1 flex items-center justify-between my-3  py-2 px-3 w-full h-20 hover:bg-gray-100 dark:hover:bg-green-500"
                  >
                    <div className="flex flex-col">
                      <div className="flex items-center">
                        <FaLocationDot className="text-green-500" />
                        <span className="ml-1 text-sm">
                          {location.city ? `${location.city}, ` : " "}{" "}
                          {location.country}
                        </span>
                      </div>
                      <span className="text-xs">
                        {location.formattedAddress.slice(0, 50)}
                        ...
                      </span>
                    </div>
                    <div className="w-fit">
                      <button
                        type="button"
                        className="primary-button  border-black dark:border-white"
                      >
                        Add
                      </button>
                    </div>
                  </li>
                ))
              }
            </ul>
          </div>
        ) : (
          <div>No locations found</div>
        )}
      </div>
    </div>
  );
}
