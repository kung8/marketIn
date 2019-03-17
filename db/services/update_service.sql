UPDATE services
SET service = ${service}, price = ${price}, image = ${image} 
WHERE user_id = ${user_id};

SELECT * 
FROM services 
WHERE user_id = ${user_id}
ORDER BY id ASC

/***must send in user_id, price, service,image***/