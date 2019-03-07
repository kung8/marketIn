INSERT INTO projects (project,user_id)
VALUES (${project},${user_id});

SELECT u.id, project
FROM projects p 
JOIN users u ON u.id = p.user_id
ORDER BY u.id ASC;