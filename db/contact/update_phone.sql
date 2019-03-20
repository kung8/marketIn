UPDATE contacts
SET phone = ${phone}
WHERE user_id = ${user_id}
RETURNING *;