import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { token } from '../../store';

const useFetchAssociate = () => {
  const userToken = useSelector(token);
  const [data, setdata] = useState(null);
  const [loading, setloading] = useState(true);
  const [error, seterror] = useState('');

  useEffect(() => {
    const BASE_URL = 'http://localhost:9092/pru-associate';
    const fetchData = async () => {
      const response = await axios.get(
        BASE_URL+'/get-all-associates', {
          headers: { Authorization: 'Bearer ' + userToken },
        });
      const { data, error } = response;
      seterror(error);
      setdata(data);
      setloading(false);
    };
    fetchData();
  }, []);

  return { data, loading, error };
};

export {useFetchAssociate};
