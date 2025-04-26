import styled from 'styled-components';
import { useEffect, useState } from 'react';
import axios from 'axios';

const LeaderboardContainer = styled.div`
  padding: 20px;
  max-width: 800px;
  margin: 0 auto;
`;

const Title = styled.h2`
  text-align: center;
  color: #333;
  margin-bottom: 30px;
`;

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  box-shadow: 0 2px 10px rgba(0,0,0,0.1);
  background-color: white;
  border-radius: 8px;
  overflow: hidden;
`;

const TableHeader = styled.thead`
  background-color: #333;
  color: white;
`;

const TableRow = styled.tr`
  &:nth-child(even) {
    background-color: #f8f8f8;
  }
  &:hover {
    background-color: #f0f0f0;
  }
`;

const TableCell = styled.td`
  padding: 15px;
  text-align: left;
  border-bottom: 1px solid #e0e0e0;
`;

const HeaderCell = styled.th`
  padding: 15px;
  text-align: left;
`;

const RankCell = styled(TableCell)`
  font-weight: bold;
  color: #333;
  width: 60px;
  text-align: center;
`;

const UserCell = styled(TableCell)`
  display: flex;
  align-items: center;
  gap: 12px;
`;

const Avatar = styled.div`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background-color: ${props => props.color || '#4CAF50'};
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: bold;
  font-size: 1.1rem;
`;

const TrophyIcon = styled.span`
  font-size: 1.2rem;
  margin-right: 8px;
`;

const ReviewCount = styled.span`
  font-weight: bold;
  color: #333;
`;

const LoadingMessage = styled.div`
  text-align: center;
  padding: 40px;
  color: #666;
`;

const RankBadge = styled.div`
  width: 30px;
  height: 30px;
  border-radius: 50%;
  background-color: ${props => {
    if (props.rank === 1) return '#FFD700';
    if (props.rank === 2) return '#C0C0C0';
    if (props.rank === 3) return '#CD7F32';
    return '#f0f0f0';
  }};
  color: ${props => props.rank <= 3 ? 'white' : '#333'};
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto;
  font-weight: bold;
`;

function Leaderboard() {
  const [rankedUsers, setRankedUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchAndRankUsers = async () => {
      try {
        // Fetch users and their reviews
        const usersResponse = await axios.get('http://localhost:3001/users');
        const reviewsResponse = await axios.get('http://localhost:3001/reviews');
        
        // Calculate review counts
        const reviewCounts = reviewsResponse.data.reduce((acc, review) => {
          acc[review.userId] = (acc[review.userId] || 0) + 1;
          return acc;
        }, {});

        // Merge user data with review counts
        const usersWithCounts = usersResponse.data.map(user => ({
          ...user,
          reviewCount: reviewCounts[user.id] || 0
        }));

        // Sort users by review count (descending)
        const sortedUsers = [...usersWithCounts].sort((a, b) => b.reviewCount - a.reviewCount);

        // Assign ranks (handling ties)
        let currentRank = 1;
        const ranked = sortedUsers.map((user, index) => {
          // If same count as previous user, keep the same rank
          if (index > 0 && user.reviewCount === sortedUsers[index - 1].reviewCount) {
            return { ...user, rank: currentRank };
          }
          currentRank = index + 1;
          return { ...user, rank: currentRank };
        });

        setRankedUsers(ranked);
      } catch (error) {
        console.error('Error fetching leaderboard data:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchAndRankUsers();
  }, []);

  if (isLoading) {
    return (
      <LeaderboardContainer>
        <LoadingMessage>Loading leaderboard...</LoadingMessage>
      </LeaderboardContainer>
    );
  }

  return (
    <LeaderboardContainer>
      <Title>Top Reviewers</Title>
      <Table>
        <TableHeader>
          <TableRow>
            <HeaderCell>Rank</HeaderCell>
            <HeaderCell>User</HeaderCell>
            <HeaderCell>Reviews</HeaderCell>
          </TableRow>
        </TableHeader>
        <tbody>
          {rankedUsers.map((user) => (
            <TableRow key={user.id}>
              <RankCell>
                <RankBadge rank={user.rank}>
                  {user.rank}
                </RankBadge>
              </RankCell>
              <UserCell>
                <Avatar color={user.avatarColor}>
                  {user.name.charAt(0).toUpperCase()}
                </Avatar>
                <div>
                  <div>{user.name}</div>
                  <div style={{ fontSize: '0.8rem', color: '#666' }}>@{user.username}</div>
                </div>
              </UserCell>
              <TableCell>
                <ReviewCount>{user.reviewCount}</ReviewCount>
              </TableCell>
            </TableRow>
          ))}
        </tbody>
      </Table>
    </LeaderboardContainer>
  );
}

export default Leaderboard;