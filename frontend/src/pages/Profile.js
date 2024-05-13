import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { toast } from 'react-toastify';
import { BsArrowUpRight } from 'react-icons/bs';
import useAuth from '../hooks/useAuth';

export default function Profile() {
  const { isLoggedIn, authUser } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isLoggedIn) {
      navigate('/signin');
    }
  }, [isLoggedIn, navigate]);

  if (!isLoggedIn) {
    return null;
  }

  return (
    <div className="pt-5 bg-white dark:bg-black dark:text-white">
      <div className=" p-10">

        <div>
          <div className="flex justify-center my-3">
            <img className="w-14 h-14 rounded-full" src={authUser.profileBanner} alt="profile" />
          </div>
          <div className="flex justify-center">
            <div className="mx-3 flex flex-col w-full  sm:w-[300px]  space-y-4">
              <div className="flex flex-col">
                <label className="">Username</label>
                <input value={authUser.username} disabled type="text" className="border-border_color border p-2 rounded text-slate-400" />
              </div>

              <div className="flex flex-col">
                <label>Gender</label>
                <select disabled className=" h-12 border border-border_color rounded-md text-slate-400">
                  <option value="male">Male</option>
                </select>
              </div>

              <div className="flex flex-col">
                <label className="">Current Location</label>
                <p className=" p-2 border rounded text-slate-400">
                  {authUser?.currentLocation?.name}
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="flex justify-center items-center space-x-5 w-full mt-20 dark:text-white">
          <Link to="/my-friends" className="primary-button w-full flex justify-between items-center sm:w-[150px] shadow-md rounded-md border border-green-500  p-5 text-sm">
            <span>Friends: </span>
            <span className="text-green-500">
              {/* Number of friends here */}
            </span>
            <BsArrowUpRight className="text-green-500" />
          </Link>
          <Link to="/my-locations" className="primary-button w-full flex justify-between items-center sm:w-[150px] border rounded-md border-green-500 p-5 text-sm">
            Locations:
            <span className="text-green-500">
              {/* Number of locations here */}
            </span>
            <BsArrowUpRight className="text-green-500" />
          </Link>
        </div>
        <div className="flex justify-center items-center my-7 h-fit">
          <button type="button" className='p-5 border border-green-500'>
            <span>share location</span>
          </button>
        </div>
      </div>
    </div>
  );
}
