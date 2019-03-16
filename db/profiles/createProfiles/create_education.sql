INSERT INTO education (sch_name,major,ed_level,sch_loc,grad_date,sch_logo, user_id)
VALUES (${sch_name},${major},${ed_level},${sch_loc},${grad_date},${sch_logo},${user_id});

SELECT u.id AS user_id,e.id,sch_name,major,ed_level,sch_loc,grad_date,sch_logo 
FROM users u
JOIN education e ON e.user_id = u.id
WHERE u.id = ${user_id}
ORDER BY e.id ASC