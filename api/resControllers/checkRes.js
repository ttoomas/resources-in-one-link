import jwt from "jsonwebtoken";
import { db } from "../db.js";

export const checkRes = (req, res) => {
    const currentSlug = req.body.currentSlug;
    const jwtToken = req.cookies.access_token;
    
    if(!jwtToken){
        res.status(400).send('There is no token');
    }
    else{
        jwt.verify(jwtToken, process.env.LOGIN_JWT_KEY, (err, decoded) => {
            if(err){
                console.log('Wrong token');
            }
            else{
                const jwtSlug = decoded.name.normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/\s/g, '').toLowerCase();
                
                if(currentSlug !== jwtSlug){
                    res.status(400).send('Slugs are not same');
                }
                else{
                    const query = "SELECT * FROM resources WHERE `slug` = ? LIMIT 1";

                    db.query(query, [currentSlug], (err, data) => {
                        if(err){
                            res.status(400).send('db error');
                        }
                        else{
                            if(data[0].name !== decoded.name || data[0].unique_id !== decoded.uid){
                                console.log("there is some error");
                            }
                            else{
                                getResources(res, data[0].id);
                            }
                        }
                    })
                }
            }
        })
    }
}

function getResources(res, resourcesId){
    const query = "SELECT * FROM `sources` WHERE `created_by` = ?";

    db.query(query, [resourcesId], (err, data) => {
        if(err){
            console.log(err);
        }
        else{
            const result = data.map(({body, type}) => ({body, type}));
            let finalResult = {"resId": resourcesId, result};

            res.status(200).send(finalResult);
        }
    })
}