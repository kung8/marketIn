DELETE 
FROM services 
WHERE id = ${id};

SELECT * 
FROM services
WHERE user_id = ${user_id}
ORDER BY id ASC;

/***must send in an id and user_id***/