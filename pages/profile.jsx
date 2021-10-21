import styled from 'styled-components';
import MainLayout from '../components/layouts/MainLayout';

const StyledMainLayout = styled(MainLayout)`
  h1 {
    margin: 3rem auto;
    text-align: center;
  }
`;

const Profile = () => {
  return (
    <StyledMainLayout>
      <h1>Profile</h1>
    </StyledMainLayout>
  );
};

export default Profile;
