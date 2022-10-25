import { db } from "../db.js";
import bcrypt from "bcrypt";
import { v4 as uuidv4 } from "uuid";
import jwt from "jsonwebtoken";

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
            const slug = name.normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/\s/g, '').toLowerCase();
            const uid = uuidv4();

            const query = "INSERT INTO resources(`name`, `password`, `unique_id`, `slug`) VALUES (?)";
            const values = [
                name,
                hashPass,
                uid,
                slug
            ];
            
            const jwtToken = jwt.sign({
                name: name,
                uid: uid
            }, process.env.LOGIN_JWT_KEY, { expiresIn: '1800s'});

            db.query(query, [values], (err, data) => {
                if(err){
                    res.status(400).send('db error');
                    console.log(err);
                }
                else{
                    res.cookie("access_token", jwtToken, {
                        httpOnly: true,
                        maxAge: 1800000
                    })

                    res.status(200).send({'name': name, 'slug': slug});
                }
            })
        }
    })
}