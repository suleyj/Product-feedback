-- migrate:up
INSERT INTO feedback_board.feedback (status, title, category, details)
VALUES ('Suggestion', 'Add a dark theme option', 'Feature', 'It would help people with light sensitivities and who prefer dark mode.');

INSERT INTO feedback_board.feedback (status, title, category, details)
VALUES ('Suggestion', 'Q&A within the challenge hubs', 'Feature', 'Challenge-specific Q&A would make for easy reference.');

INSERT INTO feedback_board.feedback (status, title, category, details)
VALUES ('Suggestion', 'Allow image/video upload to feedback', 'Enhancement', 'Images and screencasts can enhance comments on solutions.');

INSERT INTO feedback_board.feedback (status, title, category, details)
VALUES ('Suggestion', 'Ability to follow others', 'Feature', 'Stay updated on comments and solutions other people post.');

INSERT INTO feedback_board.feedback (status, title, category, details)
VALUES ('Suggestion', 'Preview images not loading', 'Bug', 'Challenge preview images are missing when you apply a filter.');

-- migrate:down
DELETE FROM feedback_board.feedback;
