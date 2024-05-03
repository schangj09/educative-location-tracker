import { useState, useContext, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';
import Cookies from 'js-cookie';
import serverURL from '../utils/urls';
import AppContext from '../utils/AppContext';
import ButtonLoader from '../components/ButtonLoader';

export default function Signin() {
  // Access global state and functions using useContext
  const {
    isLoggedIn, setIsLoggedIn, setAuthUser,
  } = useContext(AppContext);
  // Navigation hook
  const navigate = useNavigate();

  // State variables
  const [userDetails, setUserDetails] = useState({
    username: '',
    password: '',
  });
  const [signinError, setSigninError] = useState('');
  const [inputError, setInputError] = useState('');
  const [loading, setLoading] = useState(false);

  // Handle input change
  const handleInputChange = (name, value) => {
    setInputError('');
    setUserDetails((prev) => ({ ...prev, [name]: value }));
  };

  // Handle signin submission
  const handleSignin = async (e) => {
    setLoading(true);
    e.preventDefault();
    setInputError('');
    const { username, password } = userDetails;

    // Validation checks
    if (!username.trim()) {
      setInputError('Please enter a username');
      setLoading(false);
      return;
    }
    if (!password.trim() || password.length <= 6) {
      setInputError('Please enter a password with more than 6 characters');
      setLoading(false);
      return;
    }

    // Final validation check
    if (!username.trim() || !password.trim()) {
      setInputError('Please fill in required fields');
      setLoading(false);
      return;
    }

    try {
      // Make signin request
      const { data: { data } } = await axios.post(`${serverURL}/auth/signin`, {
        username,
        password,
      });

      // Set cookies for authentication and user data
      const expirationTime = new Date(new Date().getTime() + 60 * 60 * 1000); // 1hr
      Cookies.set('authToken', data.token, { expires: expirationTime, sameSite: "None", secure: true });
      Cookies.set('user', data.user.username, { expires: expirationTime, sameSite: "None", secure: true });

      // Display success message, reset state, and navigate to profile
      toast.success('Login successful!');
      navigate('/profile');
      setAuthUser(data.user);
      setIsLoggedIn(true);
      setLoading(false);
    } catch (error) {
      // Handle signin error, display error message
      const responseError = error?.response?.data?.message;
      toast.error(responseError || error.message);
      setSigninError(responseError);
      setLoading(false);
    }
  };

  // Redirect to profile page if already logged in
  useEffect(() => {
    if (isLoggedIn) {
      navigate('/profile');
    }
  }, [isLoggedIn, navigate]);

  return (
    <div className="pt-5  dark:text-white ">
      <h1 className="text-center font-bold text-3xl my-5">Signin</h1>
      <div className="flex justify-center items-center">
        <form onSubmit={handleSignin} className="w-full mx-5 lg:mx-0 sm:w-[300px] flex flex-col space-y-5 ">
          {signinError && (
            <p className="text-center text-red-500">{signinError}</p>
          )}

          {inputError && (
            <p className="text-red-500">
              {inputError}
            </p>
          )}
          <div className="flex flex-col">
            <label className="">Username</label>
            <input
              onChange={(e) => { handleInputChange('username', e.target.value); }}
              type="text"
              className="border-border_color border p-2 rounded text-slate-400"
            />
          </div>
          <div className="flex flex-col">
            <label className="">Password</label>
            <input
              onChange={(e) => { handleInputChange('password', e.target.value); }}
              type="password"
              className="border-border_color border p-2 rounded text-slate-400"
            />
          </div>
          {
            loading
              ? <ButtonLoader />
              : <button type="submit" className="bg-green-500 w-full text-white p-2 border-[1px] border-border_color rounded hover:border-green-500  hover:shadow transition-all duration-200">Login</button>

          }
          <div className="text-center text-sm text-slate-400">
            Don't have an account?
            <Link to="/signup" className="text-black dark:text-white font-extrabold">Signup</Link>
          </div>
        </form>
      </div>
    </div>
  );
}
