DELETE 
FROM skills
WHERE id = ${id};

SELECT *
FROM skills 
WHERE user_id = ${user_id}
ORDER BY id ASC;