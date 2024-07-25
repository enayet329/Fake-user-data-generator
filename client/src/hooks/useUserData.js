import { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import { introduceErrorInPhonenumber, introduceErrors } from '../hooks/errorUtils';

const useUserData = () => {
  const [users, setUsers] = useState([]);
  const [originalUsers, setOriginalUsers] = useState([]);
  const [region, setRegion] = useState('USA');
  const [errorRate, setErrorRate] = useState({ slider: 0, input: 0 });
  const [seed, setSeed] = useState(42);
  const [page, setPage] = useState(1);

  const fetchData = useCallback(async (newPage = page, newSeed = seed, newRegion = region) => {
    try {
      const response = await axios.get('https://fake-user-data-generator-8wwh.onrender.com/api/users', {
        params: {
          region: newRegion,
          errorRate: 0,
          seed: newSeed,
          page: newPage,
        },
      });
      const fetchedUsers = response.data.users.map((user, index) => ({
        ...user,
        index: (newPage - 1) * 10 + index + 1,
      }));

      setUsers(prevUsers => {
        const updatedUsers = [...prevUsers];
        const startIndex = (newPage - 1) * 10;
        updatedUsers.splice(startIndex, 10, ...fetchedUsers);
        return updatedUsers;
      });

      setOriginalUsers(prevUsers => {
        const updatedUsers = [...prevUsers];
        const startIndex = (newPage - 1) * 10;
        updatedUsers.splice(startIndex, 10, ...fetchedUsers);
        return updatedUsers;
      });
    } catch (error) {
      console.error('Error fetching data: ', error);
    }
  }, [page, seed, region]);

  useEffect(() => {
    for (let i = 1; i <= page; i++) {
      fetchData(i, seed, region);
    }
  }, [region, seed, fetchData, page]);

  useEffect(() => {
    setUsers(originalUsers.map((user) => ({
      ...user,
      name: introduceErrors(user.name, errorRate.input),
      address: introduceErrors(user.address, errorRate.input),
      phone: introduceErrorInPhonenumber(user.phone, errorRate.input),
    })));
  }, [errorRate.input, originalUsers]);

  const handleRegionChange = (e) => {
    const newRegion = e.target.value;
    const newSeed = Math.floor(Math.random() * 10000);
    setRegion(newRegion);
    setSeed(newSeed);
    setPage(1);
    fetchData(1, newSeed, newRegion);
  };

  const handleErrorRateChange = (newErrorRate) => {
    setErrorRate(newErrorRate);
  };

  const handleSeedChange = (newSeed) => {
    if (newSeed === undefined) {
      newSeed = Math.floor(Math.random() * 10000);
    }
    setSeed(newSeed);
    fetchData(page, newSeed, region);
  };

  const loadMoreUsers = useCallback(() => {
    const nextPage = page + 1;
    setPage(nextPage);
    fetchData(nextPage, seed, region);
  }, [page, seed, region, fetchData]);

  const downloadCSV = async () => {
    try {
      const response = await axios.get('https://fake-user-data-generator-8wwh.onrender.com/api/export', {
        params: {
          region,
          errorRate: errorRate.input,
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