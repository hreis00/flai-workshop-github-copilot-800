import React, { useState, useEffect } from 'react';

function Leaderboard() {
  const [leaderboard, setLeaderboard] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const apiUrl = `https://${process.env.REACT_APP_CODESPACE_NAME}-8000.app.github.dev/api/leaderboard/`;

  useEffect(() => {
    console.log('Leaderboard Component - Fetching from API endpoint:', apiUrl);
    
    fetch(apiUrl)
      .then(response => {
        console.log('Leaderboard Component - Response status:', response.status);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
      })
      .then(data => {
        console.log('Leaderboard Component - Raw data received:', data);
        // Handle both paginated (.results) and plain array responses
        const leaderboardData = data.results || data;
        console.log('Leaderboard Component - Processed leaderboard data:', leaderboardData);
        setLeaderboard(Array.isArray(leaderboardData) ? leaderboardData : []);
        setLoading(false);
      })
      .catch(error => {
        console.error('Leaderboard Component - Error fetching leaderboard:', error);
        setError(error.message);
        setLoading(false);
      });
  }, [apiUrl]);

  if (loading) {
    return (
      <div className="container mt-5">
        <div className="loading-spinner">
          <div className="spinner-border" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mt-5">
        <div className="alert alert-danger" role="alert">
          <i className="bi bi-exclamation-triangle-fill me-2"></i>
          <strong>Error:</strong> {error}
        </div>
      </div>
    );
  }

  return (
    <div className="container mt-4">
      <div className="content-wrapper">
        <h2>
          <i className="bi bi-trophy-fill me-2 text-warning"></i>
          Leaderboard
        </h2>
        <p className="text-muted mb-4">Top performers and their achievements</p>
        <div className="table-responsive">
          <table className="table table-hover table-striped align-middle">
            <thead>
              <tr>
                <th scope="col">Rank</th>
                <th scope="col">User</th>
                <th scope="col">Team</th>
                <th scope="col">Total Calories</th>
                <th scope="col">Activities</th>
                <th scope="col">Duration (min)</th>
              </tr>
            </thead>
            <tbody>
              {leaderboard.length > 0 ? (
                leaderboard.map((entry, index) => (
                  <tr key={entry.id || index}>
                    <td>
                      {index === 0 && <span className="badge bg-warning text-dark fs-5">🥇 {index + 1}</span>}
                      {index === 1 && <span className="badge bg-secondary fs-5">🥈 {index + 1}</span>}
                      {index === 2 && <span className="badge bg-danger fs-5">🥉 {index + 1}</span>}
                      {index > 2 && <span className="badge bg-primary">{index + 1}</span>}
                    </td>
                    <td><strong>{entry.user || 'Unknown'}</strong></td>
                    <td>
                      {entry.team ? (
                        <span className="badge bg-info text-dark">{entry.team}</span>
                      ) : (
                        <span className="text-muted">No Team</span>
                      )}
                    </td>
                    <td>
                      <span className="badge bg-success fs-6">
                        {entry.total_calories || 0} kcal
                      </span>
                    </td>
                    <td>
                      <span className="badge bg-info text-dark">
                        {entry.total_activities || 0}
                      </span>
                    </td>
                    <td>{entry.total_duration || 0}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="6" className="text-center text-muted py-4">
                    <i className="bi bi-inbox fs-1 d-block mb-2"></i>
                    No leaderboard data found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
        <div className="mt-3 text-muted">
          <small>Total participants: <strong>{leaderboard.length}</strong></small>
        </div>
      </div>
    </div>
  );
}

export default Leaderboard;
