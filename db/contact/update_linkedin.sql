UPDATE contacts
SET linkedin = ${linkedin}
WHERE user_id = ${user_id}
RETURNING *;