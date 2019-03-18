SELECT u.id as user_id, phone, email, linkedin, first_name, last_name  
FROM users u
JOIN contacts c on c.user_id = u.id
WHERE u.id = ${id}