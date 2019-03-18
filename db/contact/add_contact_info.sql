INSERT INTO contacts (phone, linkedin, user_id)
values (${phone},${linkedin},${user_id})
RETURNING *;
