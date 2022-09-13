import axios from 'axios';
import React, { useState, useEffect } from 'react';

const useFetchAssociate = async () => {
  const [data, setdata] = useState(null);
  const [loading, setloading] = useState(true);
  const [error, seterror] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get(
        'http://localhost:9092/pru-associate/get-all-associates'
      );
      const { data, error, loading } = response;
      seterror(data.error);
      setdata(data);
      setloading(false);
    };
    fetchData();
  }, []);

  return { data, loading, error };
};

export default useFetchAssociate;
