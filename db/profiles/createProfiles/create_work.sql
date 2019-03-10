INSERT INTO work (emp_name,position,emp_loc,hire_date,end_date,emp_logo,user_id)
VALUES (${emp_name},${position},${emp_loc},${hire_date},${end_date},${emp_logo}, ${user_id});


select u.id,w.id,emp_name,position,emp_loc,hire_date,end_date,emp_logo
from users u 
JOIN work w ON w.user_id = u.id
WHERE u.id = ${user_id}
ORDER BY w.id DESC;