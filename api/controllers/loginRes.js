import { db } from "../db.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

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
                const jwtToken = jwt.sign({
                    name: data[0].name,
                    uid: data[0].unique_id
                }, process.env.LOGIN_JWT_KEY, { expiresIn: '1800s' });

                res.cookie("access_token", jwtToken, {
                    httpOnly: true,
                    maxAge: 1800000
                })

                res.status(200).send({"slug": data[0].slug});
            }
        }
    })
}