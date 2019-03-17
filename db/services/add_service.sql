INSERT INTO services (user_id,service,price,image)
VALUES (${user_id},${service},${price},${image});

SELECT * 
FROM services
WHERE user_id = ${user_id}
ORDER BY id ASC;