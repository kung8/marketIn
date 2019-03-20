INSERT INTO contacts (linkedin, user_id)
VALUES (${linkedin}, ${user_id})
RETURNING *;