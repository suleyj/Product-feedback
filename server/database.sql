--Create the User Table
CREATE TABLE User (
  user_id SERIAL PRIMARY KEY,
  fullname VARCHAR(255) NOT NULL,
  username VARCHAR(255) NOT NULL,
  password VARCHAR(350) NOT NULL,
  image_name varchar  NOT NULL,
  created_at TIMESTAMP DEFAULT NOW()
);

-- Create the Feedback table
CREATE TABLE  Feedback(
  feedback_id SERIAL PRIMARY KEY,
  user_id INTEGER REFERENCES User(user_id) ON DELETE CASCADE,
  title VARCHAR ( 70 ) UNIQUE NOT NULL,
  category VARCHAR ( 50 ) NOT NULL,
  details VARCHAR ( 350 ) UNIQUE NOT NULL,
  created_at TIMESTAMP DEFAULT NOW()
);

-- Create the Like table
CREATE TABLE Upvote (
  upvote_id SERIAL PRIMARY KEY,
  user_id INTEGER REFERENCES User(user_id) ON DELETE CASCADE,
  feedback_id INTEGER REFERENCES Feedback(feedback_id) ON DELETE CASCADE,
  created_at TIMESTAMP DEFAULT NOW(),
  CONSTRAINT unique_like_user_post UNIQUE (user_id, post_id)
);

-- Create the Comment table
CREATE TABLE Comment (
  comment_id SERIAL PRIMARY KEY,
  user_id INTEGER REFERENCES User(user_id) ON DELETE CASCADE,
  feedback_id INTEGER REFERENCES Feedback(post_id) ON DELETE CASCADE,
  comment_text VARCHAR(255),
  created_at TIMESTAMP DEFAULT NOW()
);

INSERT INTO feedback(title, category, details)
VALUES ('Add tags for solutions', 'Enhancement', 'Easier to search for solutions based on a specific stack.');

INSERT INTO feedback(title, category, details)
VALUES ('Add a dark theme option', 'Feature', 'It would help people with light sensitivities and who prefer dark mode.');

INSERT INTO feedback(title, category, details)
VALUES ('Q&A within the challenge hubs', 'Feature', 'Challenge-specific Q&A would make for easy reference.');

INSERT INTO feedback(title, category, details)
VALUES ('Allow image/video upload ', 'Enhancement', 'Images and screencasts can enhance comments on solutions.');

INSERT INTO feedback(title, category, details)
VALUES ('Ability to follow others', 'Feature', 'Stay updated on comments and solutions other people post.');

INSERT INTO feedback(title, category, details)
VALUES ('Preview images not loading', 'Bug', 'Challenge preview images are missing when you apply a filter.');

