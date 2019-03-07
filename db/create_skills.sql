INSERT INTO skills (skill,user_id)
VALUES (${skill},${user_id});

SELECT u.id, skill
FROM skills s 
JOIN users u ON u.id = s.user_id
ORDER BY u.id ASC;

