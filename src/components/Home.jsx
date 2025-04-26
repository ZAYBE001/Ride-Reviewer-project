import styled from 'styled-components';

const HomeContainer = styled.div`
  text-align: center;
  padding: 20px;
`;

const IntroText = styled.p`
  font-size: 1.2rem;
  line-height: 1.6;
  color: #555;
`;

function Home() {
  return (
    <HomeContainer>
      <h2>Welcome to the Ride Reviewer  App</h2>
      <IntroText>
        Browse car reviews from real users, add your own reviews, 
        and see statistics about the most popular cars.
      </IntroText>
      <img 
        src="https://images.unsplash.com/photo-1494976388531-d1058494cdd8?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80" 
        alt="Sports car" 
        style={{ maxWidth: '100%', borderRadius: '8px', marginTop: '20px' }}
      />
    </HomeContainer>
  );
}

export default Home;