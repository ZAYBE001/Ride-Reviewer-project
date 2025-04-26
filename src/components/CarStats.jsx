import styled from 'styled-components';

const StatsContainer = styled.div`
  padding: 20px;
`;

const StatsCard = styled.div`
  background-color: #f0f8ff;
  border-radius: 8px;
  padding: 15px;
  margin-bottom: 15px;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
`;

function CarStats({ reviews }) {

  const averageRating = reviews.length > 0 
    ? (reviews.reduce((sum, review) => sum + parseInt(review.rating), 0) / reviews.length).toFixed(1)
    : 0;

  
  const makeCounts = reviews.reduce((counts, review) => {
    counts[review.carMake] = (counts[review.carMake] || 0) + 1;
    return counts;
  }, {});

  
  const topRated = reviews.length > 0 
    ? reviews.reduce((top, current) => 
        parseInt(current.rating) > parseInt(top.rating) ? current : top)
    : null;

  return (
    <StatsContainer>
      <h2>Car Statistics</h2>
      
      <StatsCard>
        <h3>Total Reviews</h3>
        <p>{reviews.length}</p>
      </StatsCard>
      
      <StatsCard>
        <h3>Average Rating</h3>
        <p>{averageRating} ★</p>
      </StatsCard>
      
      {reviews.length > 0 && (
        <>
          <StatsCard>
            <h3>Most Reviewed Makes</h3>
            <ul>
              {Object.entries(makeCounts)
                .sort((a, b) => b[1] - a[1])
                .map(([make, count]) => (
                  <li key={make}>{make}: {count} review(s)</li>
                ))}
            </ul>
          </StatsCard>
          
          <StatsCard>
            <h3>Top Rated Car</h3>
            <p>{topRated.carMake} {topRated.carModel} ({topRated.rating} ★)</p>
            <p>Reviewed by: {topRated.reviewer}</p>
          </StatsCard>
        </>
      )}
    </StatsContainer>
  );
}

export default CarStats;