DELETE 
FROM languages
WHERE id = ${id};

SELECT *
FROM languages 
WHERE user_id = ${user_id}
ORDER BY id ASC;