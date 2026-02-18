-- Foresee Prediction Platform Schema (PostgreSQL)

CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Users Table
CREATE TABLE users (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    username VARCHAR(50) UNIQUE NOT NULL,
    phone VARCHAR(20) UNIQUE NOT NULL,
    reputation INTEGER DEFAULT 0,
    accuracy_score DECIMAL(5,2) DEFAULT 0,
    streak INTEGER DEFAULT 0,
    tier VARCHAR(20) DEFAULT 'Novice',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    last_active TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Predictions Table (The questions)
CREATE TABLE predictions (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    question TEXT NOT NULL,
    description TEXT,
    category VARCHAR(30) NOT NULL,
    status VARCHAR(20) DEFAULT 'active', -- active, resolved, cancelled
    outcome BOOLEAN,
    expires_at TIMESTAMP WITH TIME ZONE NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    resolved_at TIMESTAMP WITH TIME ZONE,
    crowd_probability DECIMAL(5,2) DEFAULT 50.0
);

-- Votes Table (User predictions)
CREATE TABLE votes (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES users(id),
    prediction_id UUID REFERENCES predictions(id),
    probability DECIMAL(5,2) NOT NULL,
    projected_reward INTEGER,
    actual_reward INTEGER,
    is_correct BOOLEAN,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    UNIQUE(user_id, prediction_id)
);

-- Create Indexes for performance
CREATE INDEX idx_votes_user ON votes(user_id);
CREATE INDEX idx_predictions_active ON predictions(status) WHERE status = 'active';
CREATE INDEX idx_users_reputation ON users(reputation DESC);