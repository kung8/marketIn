INSERT INTO languages (language, user_id)
VALUES (${language},${user_id});

SELECT u.id AS user_id, l.id, language
FROM users u 
JOIN languages l ON l.user_id = u.id
WHERE u.id = ${user_id}
ORDER BY l.id ASC