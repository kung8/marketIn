UPDATE education
SET sch_name=${sch_name}, major=${major}, ed_level = ${ed_level},sch_loc = ${sch_loc},grad_date = ${grad_date},sch_logo = ${sch_logo}
WHERE id = ${id}
returning *