import { db } from "../db.js";
import bcrypt from "bcrypt";

export const loginRes = (req, res) => {
    const name = req.body.resName;
    const password = req.body.resPassword;

    const query = "SELECT * FROM resources WHERE name = ? LIMIT 1";

    db.query(query, [name], (err, data) => {
        if(err){
            res.status(400).send({"resPassword": "Db error"});
        }
        else if(data.length === 0){
            res.status(400).send({"resName": "There is no Resources with that name"});
        }
        else{
            const isPasswordCorrect = bcrypt.compareSync(password, data[0].password);

            if(!isPasswordCorrect){
                res.status(400).send({"resPassword": "Wrong password"});
            }
            else{
                res.status(200).send("Correct credentials");
            }
        }
    })
}