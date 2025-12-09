-- migrate:up
ALTER TABLE feedback_board.users
ADD COLUMN role VARCHAR(20) DEFAULT 'user';

-- migrate:down
ALTER TABLE feedback_board.users
DROP COLUMN role;
