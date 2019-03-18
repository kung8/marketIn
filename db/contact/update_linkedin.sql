UPDATE contacts
SET linkedin = ${linkedin}
WHERE id = ${id}
RETURNING *;