import React, { useState, useEffect } from 'react';

function Teams() {
  const [teams, setTeams] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const apiUrl = `https://${process.env.REACT_APP_CODESPACE_NAME}-8000.app.github.dev/api/teams/`;

  useEffect(() => {
    console.log('Teams Component - Fetching from API endpoint:', apiUrl);
    
    fetch(apiUrl)
      .then(response => {
        console.log('Teams Component - Response status:', response.status);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
      })
      .then(data => {
        console.log('Teams Component - Raw data received:', data);
        // Handle both paginated (.results) and plain array responses
        const teamsData = data.results || data;
        console.log('Teams Component - Processed teams data:', teamsData);
        setTeams(Array.isArray(teamsData) ? teamsData : []);
        setLoading(false);
      })
      .catch(error => {
        console.error('Teams Component - Error fetching teams:', error);
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
    <div className="container mt-4 mb-5">
      <div className="content-wrapper">
        <h2>
          <i className="bi bi-people me-2"></i>
          Teams
        </h2>
        <p className="text-muted mb-4">Explore and join fitness teams</p>
        <div className="row">
          {teams.length > 0 ? (
            teams.map(team => (
              <div key={team.id} className="col-md-6 col-lg-4 mb-4">
                <div className="card h-100">
                  <div className="card-body">
                    <h5 className="card-title">
                      <i className="bi bi-flag-fill me-2 text-primary"></i>
                      {team.name}
                    </h5>
                    <p className="card-text text-muted">{team.description}</p>
                  </div>
                  <ul className="list-group list-group-flush">
                    <li className="list-group-item d-flex justify-content-between align-items-center">
                      <span>
                        <i className="bi bi-people-fill me-2 text-primary"></i>
                        <strong>Members</strong>
                      </span>
                      <span className="badge bg-primary rounded-pill">
                        {team.member_count || 0}
                      </span>
                    </li>
                    <li className="list-group-item">
                      <i className="bi bi-calendar-event me-2 text-success"></i>
                      <strong>Created:</strong> {team.created_at ? new Date(team.created_at).toLocaleDateString() : 'N/A'}
                    </li>
                  </ul>
                  <div className="card-body">
                    <button className="btn btn-primary w-100">
                      <i className="bi bi-box-arrow-in-right me-2"></i>
                      Join Team
                    </button>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="col-12">
              <div className="alert alert-info text-center" role="alert">
                <i className="bi bi-info-circle fs-1 d-block mb-3"></i>
                <h5>No teams found</h5>
                <p className="mb-0">Be the first to create a team!</p>
              </div>
            </div>
          )}
        </div>
        {teams.length > 0 && (
          <div className="mt-3 text-muted text-center">
            <small>Total teams: <strong>{teams.length}</strong></small>
          </div>
        )}
      </div>
    </div>
  );
}

export default Teams;
