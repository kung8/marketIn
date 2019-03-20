INSERT INTO contacts (phone, user_id)
values (${phone},${user_id})
RETURNING *;
