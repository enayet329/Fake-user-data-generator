import { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import { introduceErrorInPhonenumber, introduceErrors } from './errorUtils';

const useUserData = () => {
  const [users, setUsers] = useState([]);
  const [originalUsers, setOriginalUsers] = useState([]);
  const [region, setRegion] = useState('USA');
  const [errorRate, setErrorRate] = useState({ slider: 0, input: 0 });
  const [seed, setSeed] = useState(42);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);

  const fetchData = useCallback(async (newPage = page, newSeed = seed, newRegion = region, isRegionChange = false) => {
    setLoading(true);
    try {
      const response = await axios.get('https://fake-user-data-generator-8wwh.onrender.com/api/users', {
        params: {
          region: newRegion,
          errorRate: 0,
          seed: newSeed,
          page: newPage,
        },
      });
      const fetchedUsers = response.data.users
        .filter(user => user != null)
        .map((user, index) => ({
          ...user,
          index: (newPage - 1) * 10 + index + 1,
          name: user.name || '',
          address: user.address || '',
          phone: user.phone || '',
        }));

      if (isRegionChange) {
        setUsers(fetchedUsers);
        setOriginalUsers(fetchedUsers);
      } else {
        setUsers(prevUsers => {
          const updatedUsers = [...prevUsers];
          const startIndex = (newPage - 1) * 10;
          fetchedUsers.forEach((user, index) => {
            updatedUsers[startIndex + index] = {
              ...user,
              index: startIndex + index + 1
            };
          });
          return updatedUsers;
        });
        setOriginalUsers(prevUsers => {
          const updatedUsers = [...prevUsers];
          const startIndex = (newPage - 1) * 10;
          fetchedUsers.forEach((user, index) => {
            updatedUsers[startIndex + index] = {
              ...user,
              index: startIndex + index + 1
            };
          });
          return updatedUsers;
        });
      }
    } catch (error) {
      console.error('Error fetching data: ', error);
    } finally {
      setLoading(false);
    }
  }, [page, seed, region]);

  useEffect(() => {
    for (let i = 1; i <= page; i++) {
      fetchData(i, seed, region);
    }
  }, [region, seed, fetchData, page]);

  useEffect(() => {
    if (originalUsers.length > 0) {
      setUsers(originalUsers.map((user) => {
        if (!user) return null;
        return {
          ...user,
          name: introduceErrors(user.name || '', errorRate.input),
          address: introduceErrors(user.address || '', errorRate.input),
          phone: introduceErrorInPhonenumber(user.phone || '', errorRate.input),
        };
      }).filter(Boolean));
    }
  }, [errorRate.input, originalUsers]);

  const handleRegionChange = (e) => {
    const newRegion = e.target.value;
    const newSeed = 42;
    setRegion(newRegion);
    setSeed(newSeed);
    setPage(1);
    fetchData(1, newSeed, newRegion, true);
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
    loading,
    handleRegionChange,
    handleErrorRateChange,
    handleSeedChange,
    loadMoreUsers,
    downloadCSV,
  };
};

export default useUserData;