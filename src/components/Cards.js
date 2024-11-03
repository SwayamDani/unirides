import React, { useEffect, useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@clerk/clerk-react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';
import './Cards.css';

const Cards = () => {
  const { isSignedIn } = useAuth();
  const [data, setData] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true); // Add loading state
  const [selectedGroup, setSelectedGroup] = useState(null);
  const cardWrapperRef = useRef(null);
  const navigate = useNavigate(); 

  useEffect(() => {
    const fetchData = async () => {
      try {
        console.log('Fetching data...');
        const response = await fetch('https://script.google.com/macros/s/AKfycby2zqIjBIP81Wj-WhUCy-sqpKg7QW3fcUfTFNsQCkoVBItDOeLsvzwHroqxjm0QX159/exec');
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const result = await response.json();
        console.log('Data fetched:', result);
        setData(result);
      } catch (err) {
        console.error('Error fetching data:', err);
        setError(err.message);
      } finally {
        setLoading(false); // Set loading to false after fetch is complete
      }
    };

    if (isSignedIn) {
      fetchData();
    } else {
      // Redirect to the external sign-in URL if signed out
      navigate ('/unirides/login');
    }
  }, [isSignedIn, navigate]);

  const handleCardClick = (item) => {
    setSelectedGroup(item);
  };

  const closeModal = () => {
    setSelectedGroup(null);
  };

  const scrollLeft = () => {
    cardWrapperRef.current.scrollBy({ left: -600, behavior: 'smooth' });
  };

  const scrollRight = () => {
    cardWrapperRef.current.scrollBy({ left: 600, behavior: 'smooth' });
  };

  if (loading) {
    return (
      <div className='loading'>
        <FontAwesomeIcon icon={faSpinner} spin size="3x" />
      </div>
    );
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="cards" id="cards">
      <div className="card__group">
        <button id="scroll-left" className="scroll-button" onClick={scrollLeft}>
          &lt;
        </button>
        <div className="card-wrapper" ref={cardWrapperRef}>
          {data.map((item, index) => (
            <div
              key={index}
              className="card text-white bg-transparent"
              style={{ minWidth: '600px', boxShadow: '5px 5px 10px black' }}
              onClick={() => handleCardClick(item)}
            >
              <div className="card-header">{item.destination || 'Unknown Destination'}</div>
              <div className="card-body">
                <p>Owner: {item.owner || 'Unknown'}</p>
                <p>Start Point: {item.startPoint || 'Unknown'}</p>
                <p>Date: {item.date ? new Date(item.date).toLocaleDateString() : 'Unknown'}</p>
                <p>Time: {item.startTime || 'Unknown'}</p>
              </div>
            </div>
          ))}
        </div>
        <button id="scroll-right" className="scroll-button" onClick={scrollRight}>
          &gt;
        </button>
      </div>

      {selectedGroup && (
        <div id="join_group" className="modal" onClick={closeModal}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header" id="modal-header">
              {selectedGroup.destination || 'Unknown Destination'}
            </div>
            <div className="modal-body" id="modal-body">
              <p>Seats Available: {selectedGroup.seats || 'Unknown'}</p>
              <button id="join-group" disabled={selectedGroup.seats <= 0}>
                Join Group
              </button>
            </div>
            <div className="modal-footer">
              <button id="close-modal-button" onClick={closeModal}>Close</button>
              {/* <span id="close-modal-symbol" onClick={closeModal}>&times;</span> */}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cards;