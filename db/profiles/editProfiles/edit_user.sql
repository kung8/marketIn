UPDATE users 
SET first_name = ${first_name},last_name = ${last_name},email = ${email}, image_url= ${image_url}
WHERE id = ${id} 
returning first_name,last_name,email,image_url,id;