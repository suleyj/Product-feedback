CREATE TABLE feedback (
	feedbackid serial PRIMARY KEY,
	title VARCHAR ( 70 ) UNIQUE NOT NULL,
	category VARCHAR ( 50 ) NOT NULL,
	details VARCHAR ( 350 ) UNIQUE NOT NULL,
	upvotes INT DEFAULT 0 
);

CREATE TABLE users(
    user_id uuid PRIMARY KEY DEFAULT
    uuid_generate_v4(),
    user_name VARCHAR(255) NOT NULL,
    full_name VARCHAR(255) NOT NULL,
    user_password VARCHAR(255) NOT NULL,
    profile_pic bytea(MAX) NOT NULL
)

INSERT INTO feedback(title, category, details, upvotes)
VALUES ('Add tags for solutions', 'Enhancement', 'Easier to search for solutions based on a specific stack.', 10);

INSERT INTO feedback(title, category, details, upvotes)
VALUES ('Add a dark theme option', 'Feature', 'It would help people with light sensitivities and who prefer dark mode.', 5);

INSERT INTO feedback(title, category, details, upvotes)
VALUES ('Q&A within the challenge hubs', 'Feature', 'Challenge-specific Q&A would make for easy reference.', 16);

INSERT INTO feedback(title, category, details, upvotes)
VALUES ('Allow image/video upload ', 'Enhancement', 'Images and screencasts can enhance comments on solutions.', 20 );

INSERT INTO feedback(title, category, details, upvotes)
VALUES ('Ability to follow others', 'Feature', 'Stay updated on comments and solutions other people post.', 7 );

INSERT INTO feedback(title, category, details, upvotes)
VALUES ('Preview images not loading', 'Bug', 'Challenge preview images are missing when you apply a filter.', 4 );

