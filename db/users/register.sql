INSERT INTO users (first_name,last_name,email,password,image_url)
VALUES (${first_name},${last_name},${email},${password},${image_url})
RETURNING first_name,last_name,email,image_url,id
 