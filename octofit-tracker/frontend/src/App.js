import React from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import './App.css';
import Activities from './components/Activities';
import Leaderboard from './components/Leaderboard';
import Teams from './components/Teams';
import Users from './components/Users';
import Workouts from './components/Workouts';
import logo from './octofitapp-small.png';

function App() {
  return (
    <div className="App">
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark sticky-top">
        <div className="container-fluid">
          <Link className="navbar-brand" to="/">
            <img src={logo} alt="OctoFit Logo" />
            OctoFit Tracker
          </Link>
          <button 
            className="navbar-toggler" 
            type="button" 
            data-bs-toggle="collapse" 
            data-bs-target="#navbarNav" 
            aria-controls="navbarNav" 
            aria-expanded="false" 
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav ms-auto">
              <li className="nav-item">
                <Link className="nav-link" to="/users">
                  <i className="bi bi-people-fill me-1"></i>
                  Users
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/activities">
                  <i className="bi bi-activity me-1"></i>
                  Activities
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/teams">
                  <i className="bi bi-people me-1"></i>
                  Teams
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/leaderboard">
                  <i className="bi bi-trophy-fill me-1"></i>
                  Leaderboard
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/workouts">
                  <i className="bi bi-lightning-fill me-1"></i>
                  Workouts
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>

      <div className="container-fluid">
        <Routes>
          <Route path="/" element={
            <div className="container mt-5">
              <div className="hero-section text-center">
                <h1 className="display-3">
                  <i className="bi bi-heart-pulse-fill text-danger me-3"></i>
                  Welcome to OctoFit Tracker
                </h1>
                <p className="lead">Track your fitness activities, compete with teams, and achieve your goals!</p>
                <hr className="my-4" />
                <p className="mb-4">Use the navigation menu above to explore different sections.</p>
              </div>
              
              <div className="row mt-5 mb-5">
                <div className="col-md-4 mb-4">
                  <Link to="/users" className="text-decoration-none">
                    <div className="card h-100 text-center">
                      <div className="card-body d-flex flex-column align-items-center justify-content-center py-5">
                        <i className="bi bi-people-fill text-primary" style={{fontSize: '4rem'}}></i>
                        <h3 className="card-title mt-3 mb-2">Users</h3>
                        <p className="card-text text-muted">Manage and view all registered users</p>
                      </div>
                    </div>
                  </Link>
                </div>
                
                <div className="col-md-4 mb-4">
                  <Link to="/activities" className="text-decoration-none">
                    <div className="card h-100 text-center">
                      <div className="card-body d-flex flex-column align-items-center justify-content-center py-5">
                        <i className="bi bi-activity text-primary" style={{fontSize: '4rem'}}></i>
                        <h3 className="card-title mt-3 mb-2">Activities</h3>
                        <p className="card-text text-muted">Track and monitor fitness activities</p>
                      </div>
                    </div>
                  </Link>
                </div>
                
                <div className="col-md-4 mb-4">
                  <Link to="/leaderboard" className="text-decoration-none">
                    <div className="card h-100 text-center">
                      <div className="card-body d-flex flex-column align-items-center justify-content-center py-5">
                        <i className="bi bi-trophy-fill text-warning" style={{fontSize: '4rem'}}></i>
                        <h3 className="card-title mt-3 mb-2">Leaderboard</h3>
                        <p className="card-text text-muted">View top performers and rankings</p>
                      </div>
                    </div>
                  </Link>
                </div>
              </div>
            </div>
          } />
          <Route path="/users" element={<Users />} />
          <Route path="/activities" element={<Activities />} />
          <Route path="/teams" element={<Teams />} />
          <Route path="/leaderboard" element={<Leaderboard />} />
          <Route path="/workouts" element={<Workouts />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
