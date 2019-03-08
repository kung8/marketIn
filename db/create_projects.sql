INSERT INTO projects (project,user_id)
VALUES (${project},${user_id});

SELECT u.id, project
FROM users u 
JOIN projects p ON p.user_id = u.id
WHERE u.id = ${user_id};