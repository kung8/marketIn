INSERT INTO education (sch_name,major,ed_level,sch_loc,grad_date,sch_logo, user_id)
VALUES (${sch_name},${major},${ed_level},${sch_loc},${grad_date},${sch_logo},${user_id});

SELECT u.id,sch_name,major,ed_level,sch_loc,grad_date,sch_logo 
FROM users u
JOIN education e ON e.user_id = u.id
WHERE u.id = ${user_id}; 




-- SELECT u.id AS user_id, e.id AS sch_id, sch_name,major,ed_level,sch_loc,grad_date,sch_logo 
-- FROM education e 
-- JOIN users u ON u.id = e.user_id
-- ORDER BY u.id ASC;  