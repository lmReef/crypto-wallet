import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import MainLayout from '../components/layouts/MainLayout';

const StyledMainLayout = styled(MainLayout)`
  text-align: center;

  h1 {
    margin: 3rem auto;
    text-align: center;
  }
`;

const Profile = () => {
  const [urls, setUrls] = useState([]);

  const getBlockscanUrls = async () => {
    const data = await fetch(
      '/api/get-blockscan-urls/0x0235C9D8413b4807602468Ed363dfAa8A1c5Cde2',
    ).then((res) => res.json());
    console.log(data.number_of_addresses_found);
    setUrls(data.links);
    return data.links;
  };

  useEffect(() => {
    getBlockscanUrls();
  }, []);

  return (
    <StyledMainLayout>
      <h1>Profile</h1>
      {urls?.map((url, index) => {
        return <p key={index}>{url}</p>;
      })}
    </StyledMainLayout>
  );
};

export default Profile;
