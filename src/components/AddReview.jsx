import { useState } from 'react';
import axios from 'axios';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';

const FormContainer = styled.div`
  max-width: 700px;
  margin: 0 auto;
  padding: 25px;
  background-color: #f5f5f5;
  border-radius: 10px;
  box-shadow: 0 2px 10px rgba(0,0,0,0.05);
`;

const FormTitle = styled.h2`
  text-align: center;
  color: #333;
  margin-bottom: 25px;
`;

const FormGroup = styled.div`
  margin-bottom: 20px;
`;

const Label = styled.label`
  display: block;
  margin-bottom: 8px;
  font-weight: bold;
  color: #444;
`;

const Input = styled.input`
  width: 100%;
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 5px;
  font-size: 1rem;
  transition: border-color 0.3s;

  &:focus {
    border-color: #4CAF50;
    outline: none;
  }
`;

const TextArea = styled.textarea`
  width: 100%;
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 5px;
  min-height: 120px;
  font-size: 1rem;
  font-family: inherit;
  transition: border-color 0.3s;

  &:focus {
    border-color: #4CAF50;
    outline: none;
  }
`;

const Select = styled.select`
  width: 100%;
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 5px;
  font-size: 1rem;
  transition: border-color 0.3s;

  &:focus {
    border-color: #4CAF50;
    outline: none;
  }
`;

const Button = styled.button`
  background-color: #4CAF50;
  color: white;
  padding: 12px 20px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 1rem;
  font-weight: bold;
  width: 100%;
  transition: background-color 0.3s;

  &:hover {
    background-color: #45a049;
  }

  &:disabled {
    background-color: #cccccc;
    cursor: not-allowed;
  }
`;

const ErrorMessage = styled.p`
  color: #d32f2f;
  margin-top: 10px;
  text-align: center;
`;

const ImagePreview = styled.div`
  margin-top: 15px;
  border: 1px dashed #ddd;
  padding: 10px;
  border-radius: 5px;
  text-align: center;
`;

const PreviewImage = styled.img`
  max-width: 100%;
  max-height: 200px;
  border-radius: 5px;
  margin-top: 10px;
`;

function AddReview({ addReview, user, updateReviewCount }) {
  const [formData, setFormData] = useState({
    carMake: '',
    carModel: '',
    reviewText: '',
    rating: 3,
    reviewer: user.name,
    imageUrl: ''
  });
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const validateImageUrl = (url) => {
    if (!url) return false;
    try {
      new URL(url);
      return true;
    } catch (e) {
      return false;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError('');

    if (!validateImageUrl(formData.imageUrl)) {
      setError('Please enter a valid image URL');
      setIsSubmitting(false);
      return;
    }

    try {
      // Submit the review
      const reviewWithUser = {
        ...formData,
        reviewer: user.name
      };
      
      const response = await axios.post('http://localhost:3001/reviews', reviewWithUser);
      addReview(response.data);
      
      // Update user's review count
      await updateReviewCount(user.id);

      // Reset form
      setFormData({
        carMake: '',
        carModel: '',
        reviewText: '',
        rating: 3,
        reviewer: user.name,
        imageUrl: ''
      });
      
      navigate('/reviews');
    } catch (error) {
      console.error('Error adding review:', error);
      setError('Failed to add review. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <FormContainer>
      <FormTitle>Add a Car Review</FormTitle>
      {error && <ErrorMessage>{error}</ErrorMessage>}
      <form onSubmit={handleSubmit}>
        <FormGroup>
          <Label>Car Make:</Label>
          <Input
            type="text"
            name="carMake"
            value={formData.carMake}
            onChange={handleChange}
            required
            placeholder="e.g., Toyota"
          />
        </FormGroup>
        
        <FormGroup>
          <Label>Car Model:</Label>
          <Input
            type="text"
            name="carModel"
            value={formData.carModel}
            onChange={handleChange}
            required
            placeholder="e.g., Camry"
          />
        </FormGroup>
        
        <FormGroup>
          <Label>Review:</Label>
          <TextArea
            name="reviewText"
            value={formData.reviewText}
            onChange={handleChange}
            required
            placeholder="Share your experience with this car..."
          />
        </FormGroup>
        
        <FormGroup>
          <Label>Rating:</Label>
          <Select
            name="rating"
            value={formData.rating}
            onChange={handleChange}
          >
            <option value="1">1 Star</option>
            <option value="2">2 Stars</option>
            <option value="3">3 Stars</option>
            <option value="4">4 Stars</option>
            <option value="5">5 Stars</option>
          </Select>
        </FormGroup>
        
        <FormGroup>
          <Label>Car Image URL:</Label>
          <Input
            type="text"
            name="imageUrl"
            value={formData.imageUrl}
            onChange={handleChange}
            required
            placeholder="https://example.com/car-image.jpg"
          />
          {formData.imageUrl && (
            <ImagePreview>
              <Label>Image Preview:</Label>
              <PreviewImage 
                src={formData.imageUrl} 
                alt="Preview" 
                onError={(e) => {
                  e.target.src = 'https://via.placeholder.com/300x200?text=Invalid+Image+URL';
                }}
              />
            </ImagePreview>
          )}
        </FormGroup>
        
        <Button type="submit" disabled={isSubmitting}>
          {isSubmitting ? 'Submitting...' : 'Submit Review'}
        </Button>
      </form>
    </FormContainer>
  );
}

export default AddReview;