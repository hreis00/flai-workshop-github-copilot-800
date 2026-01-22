import React, { useState, useEffect } from 'react';

function Workouts() {
  const [workouts, setWorkouts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const apiUrl = `https://${process.env.REACT_APP_CODESPACE_NAME}-8000.app.github.dev/api/workouts/`;

  useEffect(() => {
    console.log('Workouts Component - Fetching from API endpoint:', apiUrl);
    
    fetch(apiUrl)
      .then(response => {
        console.log('Workouts Component - Response status:', response.status);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
      })
      .then(data => {
        console.log('Workouts Component - Raw data received:', data);
        // Handle both paginated (.results) and plain array responses
        const workoutsData = data.results || data;
        console.log('Workouts Component - Processed workouts data:', workoutsData);
        setWorkouts(Array.isArray(workoutsData) ? workoutsData : []);
        setLoading(false);
      })
      .catch(error => {
        console.error('Workouts Component - Error fetching workouts:', error);
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
          <i className="bi bi-lightning-fill me-2 text-warning"></i>
          Workout Suggestions
        </h2>
        <p className="text-muted mb-4">Personalized workout recommendations to achieve your fitness goals</p>
        <div className="row">
          {workouts.length > 0 ? (
            workouts.map(workout => (
              <div key={workout.id} className="col-md-6 col-lg-4 mb-4">
                <div className="card h-100">
                  <div className="card-body">
                    <h5 className="card-title">
                      <i className="bi bi-lightning-charge-fill me-2 text-warning"></i>
                      {workout.name}
                    </h5>
                    <p className="card-text text-muted">{workout.description}</p>
                  </div>
                  <ul className="list-group list-group-flush">
                    <li className="list-group-item d-flex justify-content-between align-items-center">
                      <span>
                        <i className="bi bi-activity me-2 text-info"></i>
                        <strong>Activity Type</strong>
                      </span>
                      <span className="badge bg-info text-dark">
                        {workout.activity_type}
                      </span>
                    </li>
                    <li className="list-group-item d-flex justify-content-between align-items-center">
                      <span>
                        <i className="bi bi-clock-fill me-2 text-primary"></i>
                        <strong>Duration</strong>
                      </span>
                      <span className="badge bg-primary">
                        {workout.duration} min
                      </span>
                    </li>
                    <li className="list-group-item d-flex justify-content-between align-items-center">
                      <span>
                        <i className="bi bi-speedometer me-2 text-danger"></i>
                        <strong>Difficulty</strong>
                      </span>
                      <span className={`badge ${
                        workout.difficulty === 'Beginner' ? 'bg-success' :
                        workout.difficulty === 'Intermediate' ? 'bg-warning text-dark' :
                        'bg-danger'
                      }`}>
                        {workout.difficulty || 'N/A'}
                      </span>
                    </li>
                    <li className="list-group-item d-flex justify-content-between align-items-center">
                      <span>
                        <i className="bi bi-fire me-2 text-warning"></i>
                        <strong>Est. Calories</strong>
                      </span>
                      <span className="badge bg-warning text-dark">
                        {workout.calories_per_session || 0} kcal
                      </span>
                    </li>
                  </ul>
                  <div className="card-body">
                    <button className="btn btn-primary w-100">
                      <i className="bi bi-play-fill me-2"></i>
                      Start Workout
                    </button>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="col-12">
              <div className="alert alert-info text-center" role="alert">
                <i className="bi bi-info-circle fs-1 d-block mb-3"></i>
                <h5>No workout suggestions found</h5>
                <p className="mb-0">Check back later for personalized recommendations!</p>
              </div>
            </div>
          )}
        </div>
        {workouts.length > 0 && (
          <div className="mt-3 text-muted text-center">
            <small>Total workouts: <strong>{workouts.length}</strong></small>
          </div>
        )}
      </div>
    </div>
  );
}

export default Workouts;
