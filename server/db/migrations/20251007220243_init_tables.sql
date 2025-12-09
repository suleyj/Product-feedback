-- migrate:up
CREATE SCHEMA feedback_board;

CREATE TABLE feedback_board.users (
  id SERIAL PRIMARY KEY,
  fullname VARCHAR(255) NOT NULL,
  username VARCHAR(255) NOT NULL,
  password VARCHAR(350) NOT NULL,
  created_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE feedback_board.feedback (
  id SERIAL PRIMARY KEY,
  user_id INTEGER REFERENCES feedback_board.users(id) ON DELETE CASCADE,
  status VARCHAR(50) NOT NULL,
  title VARCHAR(70) NOT NULL,
  category VARCHAR(50) NOT NULL,
  details VARCHAR(350) NOT NULL,
  created_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE feedback_board.upvotes (
  id SERIAL PRIMARY KEY,
  user_id INTEGER REFERENCES feedback_board.users(id) ON DELETE CASCADE,
  feedback_id INTEGER REFERENCES feedback_board.feedback(id) ON DELETE CASCADE,
  created_at TIMESTAMP DEFAULT NOW(),
  CONSTRAINT unique_like_user_feedback UNIQUE (user_id, feedback_id)
);

CREATE TABLE feedback_board.comments (
  id SERIAL PRIMARY KEY,
  user_id INTEGER REFERENCES feedback_board.users(id) ON DELETE CASCADE,
  feedback_id INTEGER REFERENCES feedback_board.feedback(id) ON DELETE CASCADE,
  comment_text VARCHAR(255),
  created_at TIMESTAMP DEFAULT NOW()
);


-- migrate:down
DROP SCHEMA feedback_board CASCADE;
