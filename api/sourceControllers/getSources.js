import { db } from "../db.js";

export const getSources = (req, res) => {
    const path = req.body.path;

    const query = "SELECT * FROM resources WHERE slug = ? LIMIT 1";

    db.query(query, [path], (err, data) => {
        if(err){
            res.status(400).send('db error');
        }
        else if(data.length === 0){
            res.status(400).send({"errorId": 1}) // resources do not exist
        }
        else{
            const query = "SELECT * FROM sources WHERE `created_by` = ?";
            const resId = data[0].id;
            const resName = data[0].name;

            db.query(query, [resId], (err, data) => {
                if(err){
                    res.status(400).send('db error');
                }
                else if(data.length === 0){
                    res.status(400).send({"errorId": 2, "resName": resName}) // Resources exist, but there is no link
                }
                else{
                    let resultWithoutId = data.map(({body, type}) => ({body, type}));
                    let result = resultWithoutId.map((item, index) => ({...item, arrayId: index + 1}));
                    let finalResult = {"resName": resName, "sources": result};

                    res.status(200).send(finalResult);
                }
            })
        }
    })

    db.end();
}