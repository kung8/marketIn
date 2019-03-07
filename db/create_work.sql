INSERT INTO work (emp_Name,position,emp_Loc,hire_Date,end_Date,emp_Logo,user_id)
VALUES (${emp_Name},${position},${emp_Loc},${hire_Date},${end_Date},${emp_Logo}, ${user_id});

SELECT u.id
FROM work w 
JOIN users u ON u.id = w.user_id
ORDER BY u.id ASC;