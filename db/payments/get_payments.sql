SELECT first_name,last_name,service,amount,payments.id
FROM payments 
JOIN users ON users.id = payments.payer_id
-- JOIN users ON users.id = payments.paid_id
where paid_id = ${paid_id} 
-- or payer_id = ${payer_id}