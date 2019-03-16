UPDATE projects
SET project = ${project}
WHERE id = ${id};


SELECT * 
FROM projects
WHERE user_id = ${user_id}
ORDER BY id ASC