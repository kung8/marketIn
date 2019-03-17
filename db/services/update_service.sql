UPDATE services
SET service = ${service}, price = ${price}, image = ${image} 
WHERE id = ${id};

SELECT * 
FROM services 
WHERE user_id = ${user_id}
ORDER BY id ASC;