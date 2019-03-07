INSERT INTO languages (language, user_id)
VALUES (${language},${user_id});

SELECT u.id, language
FROM languages l 
JOIN users u ON u.id = l.user_id
ORDER BY u.id ASC;

