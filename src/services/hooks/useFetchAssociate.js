import axios from 'axios';
import { useState, useEffect } from 'react';

const useFetchAssociate = () => {
  const [data, setdata] = useState(null);
  const [loading, setloading] = useState(true);
  const [error, seterror] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get(
        'http://localhost:9092/pru-associate/get-all-associates'
      );
      const { data, error } = response;
      console.log('api response', response)
      seterror(error);
      setdata(data);
      setloading(false);
    };
    fetchData();
  }, []);

  return { data, loading, error };
};

export {useFetchAssociate};
