INSERT INTO contacts (phone, user_id)
VALUES (${phone},${user_id})
RETURNING *;