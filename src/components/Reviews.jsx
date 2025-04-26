import styled from 'styled-components';

const ReviewsContainer = styled.div`
  padding: 20px;
`;

const ReviewCard = styled.div`
  background-color: #f9f9f9;
  border-radius: 8px;
  padding: 20px;
  margin-bottom: 20px;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
  display: flex;
  gap: 25px;
  align-items: flex-start;

  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

const CarImageContainer = styled.div`
  width: 300px;
  height: 200px;
  flex-shrink: 0;
  border-radius: 5px;
  overflow: hidden;
  box-shadow: 0 2px 8px rgba(0,0,0,0.1);

  @media (max-width: 768px) {
    width: 100%;
    height: auto;
  }
`;

const CarImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.3s ease;

  &:hover {
    transform: scale(1.05);
  }
`;

const ReviewContent = styled.div`
  flex: 1;
`;

const CarTitle = styled.h3`
  color: #333;
  margin: 0 0 10px 0;
  font-size: 1.4rem;
`;

const Rating = styled.div`
  color: #ffc107;
  font-weight: bold;
  margin: 10px 0;
  font-size: 1.1rem;
`;

const ReviewText = styled.p`
  color: #555;
  line-height: 1.6;
  margin-bottom: 15px;
`;

const Reviewer = styled.div`
  font-style: italic;
  color: #666;
  margin-top: 15px;
  font-size: 0.9rem;
`;

const EmptyMessage = styled.p`
  text-align: center;
  color: #666;
  font-size: 1.1rem;
  margin-top: 40px;
`;

function Reviews({ reviews }) {
  return (
    <ReviewsContainer>
      <h2>Car Reviews</h2>
      {reviews.length === 0 ? (
        <EmptyMessage>No reviews yet. Be the first to add one!</EmptyMessage>
      ) : (
        reviews.map(review => (
          <ReviewCard key={review.id}>
            <CarImageContainer>
              <CarImage 
                src={review.imageUrl || 'https://via.placeholder.com/300x200?text=No+Image+Available'}
                alt={`${review.carMake} ${review.carModel}`}
                onError={(e) => {
                  e.target.src = 'https://via.placeholder.com/300x200?text=Image+Not+Available';
                }}
              />
            </CarImageContainer>
            <ReviewContent>
              <CarTitle>{review.carMake} {review.carModel}</CarTitle>
              <Rating>
                Rating: {'★'.repeat(review.rating)}{'☆'.repeat(5 - review.rating)}
                <span style={{ color: '#666', marginLeft: '10px' }}>({review.rating}/5)</span>
              </Rating>
              <ReviewText>{review.reviewText}</ReviewText>
              <Reviewer>- {review.reviewer}</Reviewer>
            </ReviewContent>
          </ReviewCard>
        ))
      )}
    </ReviewsContainer>
  );
}

export default Reviews;