INSERT INTO work (emp_Name,position,emp_Loc,hire_Date,end_Date,emp_Logo,user_id)
VALUES (${emp_Name},${position},${emp_Loc},${hire_Date},${end_Date},${emp_Logo}, ${user_id});


select u.id,w.id,emp_name,position,emp_loc,hire_Date,end_Date,emp_Logo
from users u 
JOIN work w ON w.user_id = u.id
WHERE u.id = ${user_id}
ORDER BY w.id DESC;