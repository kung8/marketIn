UPDATE work
SET emp_name = ${emp_name}, emp_loc = ${emp_loc}, emp_logo = ${emp_logo}, hire_date = ${hire_date}, end_date = ${end_date}, position = ${position}
WHERE id = ${id};

SELECT * 
FROM work
WHERE user_id = ${user_id};
-- ORDER BY user_id DESC   