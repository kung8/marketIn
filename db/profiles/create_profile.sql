INSERT INTO education (sch_Name,major,ed_Level,sch_Loc,grad_Date,sch_Logo)
VALUES (${sch_Name},${major},${ed_Level},${sch_Loc},${grad_Date},${sch_Logo})
RETURNING *;

INSERT INTO work (emp_Name,position,emp_Loc,hire_Date,end_Date,emp_Logo)
VALUES (${emp_Name},${position},${emp_Loc},${hire_Date},${end_Date},${emp_Logo});
RETURNING *;

INSERT INTO skills (skill)
VALUES (${skill});

INSERT INTO languages (language)
VALUES (${language});

INSERT INTO projects (project)
VALUES (${project});

-- SELECT u.id, e.id, schName
-- FROM education e 
-- JOIN users u ON u.id = e.user_id
-- ORDER BY u.id ASC; 

-- SELECT u.id
-- FROM work w 
-- JOIN users u ON u.id = w.user_id
-- ORDER BY u.id ASC;

SELECT u.id, skill
FROM skills s 
JOIN users u ON u.id = s.user_id
ORDER BY u.id ASC;

SELECT u.id, language
FROM languages l 
JOIN users u ON u.id = l.user_id
ORDER BY u.id ASC;

SELECT u.id, project
FROM projects p 
JOIN users u ON u.id = p.user_id
ORDER BY u.id ASC;