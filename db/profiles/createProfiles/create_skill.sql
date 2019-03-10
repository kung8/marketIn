INSERT INTO skills (skill,user_id)
VALUES (${skill},${user_id});

SELECT u.id, s.id, skill
FROM users u 
JOIN skills s ON s.user_id = u.id
WHERE u.id = ${user_id}
ORDER BY s.id DESC;
