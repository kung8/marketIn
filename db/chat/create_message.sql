INSERT INTO messages (room_id,message,user_id,time,date,image_url)
VALUES (${room_id},${message},${user_id},${time},${date},${image_url});

SELECT * 
FROM messages
WHERE room_id = ${room_id}