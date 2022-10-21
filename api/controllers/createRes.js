import { db } from "../db.js";
import bcrypt from "bcrypt";

export const createRes = (req, res) => {
    const name = req.body.resName;

    const query = "SELECT * FROM resources WHERE name = ?";

    db.query(query, name, (err, data) => {
        if(err){
            res.status(400).send('db error');
        }
        else if(data.length){
            res.status(400).send('Resources with that name already exists');
        }
        else{
            const salt = bcrypt.genSaltSync(10);
            const hashPass = bcrypt.hashSync(req.body.resPassword, salt);

            const query = "INSERT INTO resources(`name`, `password`) VALUES (?)";
            const values = [
                name,
                hashPass
            ]

            db.query(query, [values], (err, data) => {
                if(err){
                    res.status(400).send('db error');
                    console.log(err);
                }
                else{
                    res.status(200).send('User added successfully');
                }
            })
        }
    })
}