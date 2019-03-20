INSERT INTO contacts (linkedin, user_id)
values (${linkedin},${user_id})
RETURNING *;
