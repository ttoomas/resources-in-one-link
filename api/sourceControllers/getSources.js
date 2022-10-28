import { db } from "../db.js";

export const getSources = (req, res) => {
    const path = req.body.path;

    const query = "SELECT * FROM sources WHERE `created_by` IN (SELECT id FROM resources WHERE slug = ?)";

    db.query(query, [path], (err, data) => {
        if(err){
            res.status(400).send('db error');
        }
        else{
            if(data.length === 0){
                res.status(400).send('there is no sources');
            }
            else{
                let resultWithoutId = data.map(({body, type}) => ({body, type}));
                let result = resultWithoutId.map((item, index) => ({...item, arrayId: index + 1}));

                res.status(200).send(result);
            }
        }
    })
}