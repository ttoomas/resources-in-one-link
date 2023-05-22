import { db } from "../db.js";
import bcrypt from "bcrypt";
import { v4 as uuidv4 } from "uuid";
import jwt from "jsonwebtoken";
import fetch from "node-fetch";

export const createRes = (req, res) => {
    const name = req.body.resName;
    const slug = name.toLowerCase().trim().replace(/[^\w\s-]/g, '').replace(/[\s_-]+/g, '-').replace(/^-+|-+$/g, '');
    const frontendUrl = process.env.FRONTEND_URL;

    const query = "SELECT * FROM resources WHERE name = ? OR slug = ?";
    const values = [
        name,
        slug
    ]

    db.query(query, values, async (err, data) => {
        if(err){
            res.status(400).send('db error');
        }
        else if(data.length){
            res.status(400).send('Resources with that name already exists');
        }
        else{
            const salt = bcrypt.genSaltSync(10);
            const hashPass = bcrypt.hashSync(req.body.resPassword, salt);
            const uid = uuidv4();

            const finalUrl = `${frontendUrl}/resources/${slug}`;
            const shortUrlReq = await (await fetch(`https://api.shrtco.de/v2/shorten?url=${finalUrl}`)).json();
            const shortUrl = shortUrlReq.result.short_link;

            const query = "INSERT INTO resources(`name`, `password`, `unique_id`, `slug`, `short_url`) VALUES (?)";
            const values = [
                name,
                hashPass,
                uid,
                slug,
                shortUrl
            ];
            
            const jwtToken = jwt.sign({
                name: name,
                uid: uid
            }, process.env.LOGIN_JWT_KEY, { expiresIn: '1800s'});

            db.query(query, [values], (err, data) => {
                if(err){
                    res.status(400).send('db error');
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

    db.end();
}