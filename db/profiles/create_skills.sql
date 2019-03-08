INSERT INTO skills (skill,user_id)
VALUES (${skill},${user_id});

SELECT u.id, skill
FROM users u 
JOIN skills s ON s.user_id = u.id
WHERE u.id = ${user_id};
