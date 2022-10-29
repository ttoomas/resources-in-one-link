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
                res.status(400).send('You are not authorized');
            }
            else{
                const jwtSlug = decoded.name.toLowerCase().trim().replace(/[^\w\s-]/g, '').replace(/[\s_-]+/g, '-').replace(/^-+|-+$/g, '');
                
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
                                res.status(400).send('You are not authorized');
                            }
                            else{
                                getResources(res, data[0].id, data[0].short_url);
                            }
                        }
                    })
                }
            }
        })
    }
}

function getResources(res, resourcesId, resourcesShortUrl){
    const query = "SELECT * FROM `sources` WHERE `created_by` = ?";

    db.query(query, [resourcesId], (err, data) => {
        if(err){
            res.status(400).send('db error');
        }
        else{
            const result = data.map(({body, type, id}) => ({body, type, id}));
            let finalResult = {"resId": resourcesId, "resShortUrl": resourcesShortUrl, result};

            res.status(200).send(finalResult);
        }
    })
}