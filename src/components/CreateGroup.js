import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useUser, useAuth } from '@clerk/clerk-react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './CreateGroup.css';
import { LoadScript } from '@react-google-maps/api';
import CustomStandaloneSearchBox from './CustomStandaloneSearchBox';

const generatePrefillUrl = (formData, user) => {
  const baseUrl = "https://docs.google.com/forms/d/e/1FAIpQLScEew6Q8NBm_qJ_9WGQVd2SNRtxo6CBu9yKRP4ZhCDa6lUsrA/formResponse";
  const queryParams = [];

  // Replace 'entry.xxxxxx' with your actual field IDs
  queryParams.push("entry.1208754046=" + encodeURIComponent(formData.groupType));
  queryParams.push("entry.1742655915=" + encodeURIComponent(formData.startPoint));
  queryParams.push("entry.1461435378=" + encodeURIComponent(formData.destination));
  queryParams.push("entry.1865919170=" + encodeURIComponent(formData.startTime));
  queryParams.push("entry.1453905832=" + encodeURIComponent(formData.date));
  queryParams.push("entry.873629313=" + encodeURIComponent(formData.seats));
  queryParams.push("entry.370014976=" + encodeURIComponent(formData.uberType));
  queryParams.push("entry.1900053036=" + encodeURIComponent(user?.fullName));

  // Join all parameters into the full URL
  const prefillUrl = `${baseUrl}?${queryParams.join('&')}&submit=Submit`;
  return prefillUrl;
};

const CreateGroup = ({ setPopupMessage }) => {
  const { user } = useUser();
  const { isSignedIn } = useAuth();
  const [formData, setFormData] = useState({
    groupType: '',
    startPoint: '',
    destination: '',
    startTime: '',
    date: '',
    seats: '',
    uberType: '',
    owner: ''
  });
  const navigate = useNavigate();

  useEffect(() => {
    if (isSignedIn) {
      if (user) {
        setFormData((prevFormData) => ({
          ...prevFormData,
          owner: `entry.1900053036=${encodeURIComponent(user.fullName)}`
        }));
      }
    } else {
      navigate('/unirides/login');
    }
  }, [user, isSignedIn, navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value
    }));
  };

  const handleStartPointChanged = (place) => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      startPoint: place.formatted_address
    }));
  };

  const handleDestinationChanged = (place) => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      destination: place.formatted_address
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formUrl = generatePrefillUrl(formData, user);

    try {
      await fetch(formUrl, {
        method: 'POST',
        mode: 'no-cors'
      });
      setPopupMessage('Group created successfully!');
      navigate('/');
    } catch (error) {
      console.error('Error submitting form:', error);
    }
  };

  const api_key = process.env.REACT_APP_GOOGLE_MAPS_API_KEY;

  return (
    <div className="container mt-5">
      <LoadScript googleMapsApiKey={api_key} libraries={['places']}>
        <form onSubmit={handleSubmit} className="create_group__form">
          <div className="create_group__group">
            <div>
              <label htmlFor="groupType" className="create_group__label">Group Type</label>
              <select name="groupType" className="create_group__input" id="groupType" value={formData.groupType} onChange={handleChange} required>
                <option value="">Select Group Type</option>
                <option value="groceries">GROCERIES</option>
                <option value="airport">AIRPORT</option>
                <option value="metro">METRO/BART</option>
                <option value="home">HOME</option>
                <option value="on_campus">ON CAMPUS</option>
                <option value="other">OTHER</option>
              </select>
            </div>

            <div>
              <label htmlFor="startPoint" className="create_group__label">Start Point</label>
              <CustomStandaloneSearchBox
                onPlacesChanged={handleStartPointChanged}
                placeholder="Enter Start Point"
                className="create_group__input"
              />
            </div>

            <div>
              <label htmlFor="destination" className="create_group__label">Destination</label>
              <CustomStandaloneSearchBox
                onPlacesChanged={handleDestinationChanged}
                placeholder="Enter Destination"
                className="create_group__input"
              />
            </div>

            <div>
              <label htmlFor="startTime" className="create_group__label">Start Time</label>
              <input type="time" name="startTime" placeholder="Enter Start Time" id="startTime" className="create_group__input" value={formData.startTime} onChange={handleChange} required />
            </div>

            <div>
              <label htmlFor="date" className="create_group__label">Date</label>
              <input type="date" name="date" placeholder="Enter Date" id="date" className="create_group__input" value={formData.date} onChange={handleChange} required />
            </div>

            <div>
              <label htmlFor="time" className="create_group__label">Time</label>
              <input type="time" name="time" placeholder="Enter Time" id="time" className="create_group__input" value={formData.time} onChange={handleChange} required />
            </div>

            <div>
              <label htmlFor="seats" className="create_group__label">Seats</label>
              <input type="number" name="seats" placeholder="Enter Seats" id="seats" className="create_group__input" value={formData.seats} onChange={handleChange} required />
            </div>

            <div>
              <label htmlFor="uberType" className="create_group__label">Uber Type</label>
              <select name="uberType" className="create_group__input" id="uberType" value={formData.uberType} onChange={handleChange} required>
                <option value="">Select Uber Type</option>
                <option value="Uber X">Uber Regular</option>
                <option value="Uber Xl">Uber Xl</option>
              </select>
            </div>
          </div>

          <div>
            <p className="create_group__signup">
              Want to join a Group? <a id="join-link" onClick={() => navigate('/join-group')}>Join</a>
            </p>

            <button type="submit" className="create_group__button">Create</button>
          </div>
        </form>
      </LoadScript>
    </div>
  );
};

export default CreateGroup;
