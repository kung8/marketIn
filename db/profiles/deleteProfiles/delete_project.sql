DELETE 
FROM projects
WHERE id = ${id};

SELECT *
FROM projects 
WHERE user_id = ${user_id};