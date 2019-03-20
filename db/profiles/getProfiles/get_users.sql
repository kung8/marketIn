SELECT id, first_name, last_name
FROM users
-- JOIN education e ON e.user_id = u.id
-- JOIN work w ON w.user_id = u.id
-- JOIN skills sk ON sk.user_id = u.id
-- JOIN languages l ON l.user_id = u.id
-- JOIN projects p ON p.user_id = u.id
-- JOIN contacts c ON c.user_id = u.id
-- JOIN services s ON s.user_id = u.id
WHERE first_name ilike ${search} OR last_name ilike ${search} 

-- OR email ilike ${search} OR sch_name ilike ${search} OR ed_level ilike ${search} OR sch_loc ilike ${search} OR emp_name ilike ${search} OR position ilike ${search} OR language ilike ${search} OR project ilike ${search} OR skill ilike ${search} OR service ilike ${search})