import { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import { introduceErrorInPhonenumber, introduceErrors } from './errorUtils';

const useUserData = () => {
  const [users, setUsers] = useState([]);
  const [originalUsers, setOriginalUsers] = useState([]);
  const [region, setRegion] = useState('USA');
  const [errorRate, setErrorRate] = useState(0);
  const [seed, setSeed] = useState(42);
  const [page, setPage] = useState(1);

  const fetchData = useCallback(async (newPage = 1, newSeed = seed, newRegion = region) => {
    try {
      const response = await axios.get('http://localhost:5000/api/users', {
        params: {
          region: newRegion,
          errorRate: 0,
          seed: newSeed,
          page: newPage,
        },
      });

      const fetchedUsers = response.data.users.map((user, index) => ({
        ...user,
        index: (newPage - 1) * 20 + index + 1,
      }));

      if (newPage === 1) {
        setUsers(fetchedUsers);
        setOriginalUsers(fetchedUsers);
      } else {
        setUsers((prevUsers) => [...prevUsers, ...fetchedUsers]);
        setOriginalUsers((prevUsers) => [...prevUsers, ...fetchedUsers]);
      }
    } catch (error) {
      console.error('Error fetching data: ', error);
    }
  }, []);

  useEffect(() => {
    fetchData(1, seed, region);
  }, [region, seed, fetchData]);

  useEffect(() => {
    setUsers(originalUsers.map((user) => ({
      ...user,
      name: introduceErrors(user.name, errorRate),
      address: introduceErrors(user.address, errorRate),
      phone: introduceErrorInPhonenumber(user.phone, errorRate),
    })));
  }, [errorRate, originalUsers]);

  const handleRegionChange = (e) => {
    const newRegion = e.target.value;
    const newSeed = Math.floor(Math.random() * 10000);
    setRegion(newRegion);
    setSeed(newSeed);
    setPage(1);
    fetchData(1, newSeed, newRegion);
  };

  const handleErrorRateChange = (e, newValue) => setErrorRate(newValue);
  const handleSeedChange = () => {
    const newSeed = Math.floor(Math.random() * 10000);
    setSeed(newSeed);
    setPage(1);
    fetchData(1, newSeed, region);
  };

  const loadMoreUsers = useCallback(() => {
    const nextPage = page + 1;
    setPage(nextPage);
    fetchData(nextPage, seed, region);
  }, [page, seed, region, fetchData]);

  const downloadCSV = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/export', {
        params: {
          region,
          errorRate,
          seed,
          page,
        },
        responseType: 'blob',
      });
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', 'users.csv');
      document.body.appendChild(link);
      link.click();
    } catch (error) {
      console.error('Error downloading CSV: ', error);
    }
  };

  return {
    users,
    region,
    errorRate,
    seed,
    handleRegionChange,
    handleErrorRateChange,
    handleSeedChange,
    loadMoreUsers,
    downloadCSV,
  };
};

export default useUserData;
