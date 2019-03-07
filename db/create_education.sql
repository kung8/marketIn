INSERT INTO education (sch_Name,major,ed_Level,sch_Loc,grad_Date,sch_Logo, user_id)
VALUES (${sch_Name},${major},${ed_Level},${sch_Loc},${grad_Date},${sch_Logo,${user_id})

SELECT u.id, e.id, sch_Name,major,ed_Level,sch_Loc,grad_Date,sch_Logo 
FROM education e 
JOIN users u ON u.id = e.user_id
ORDER BY u.id ASC;  