import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Attire = () => {
  const [attire, setAttire] = useState({ groom: [], bride: [] });

  useEffect(() => {
    const fetchAttire = async () => {
      try {
        const response = await axios.get('/api/attire'); // Adjust the endpoint based on your backend route
        setAttire(response.data);
      } catch (error) {
        console.error('Error fetching attire:', error);
      }
    };

    fetchAttire();
  }, []);

  return (
    <div>
      <h2>Groom's Attire</h2>
      <ul>
        {attire.groom.map(item => (
          <li key={item.id}>
            <a href={item.link}>{item.item}</a>
          </li>
        ))}
      </ul>

      <h2>Bride's Attire</h2>
      <ul>
        {attire.bride.map(item => (
          <li key={item.id}>
            <a href={item.link}>{item.item}</a>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Attire;
