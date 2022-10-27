import { db } from "../db.js";

export const updateSource = (req, res) => {
    const id = req.body.sourceId;
    const content = req.body.sourceContent;
    const type = req.body.sourceType;
    const resId = req.body.resId;

    const query = "SELECT * FROM sources WHERE body = ? AND `created_by` = ? LIMIT 1";
    const values = [
        content,
        resId
    ];

    db.query(query, values, (err, data) => {
        if(err){
            res.status(400).send('db error');
        }
        else if(data.length){
            res.status(400).send("Source already exists");
        }
        else{
            res.status(200);
            const query = "UPDATE sources SET `body` = ?, `type` = ? WHERE id = ?";
            const values = [
                content,
                type,
                id
            ]
        
            db.query(query, values, (err, data) => {
                if(err){
                    res.status(400).send('db error');
                }
                else{
                    res.status(200).send('updates');
                }
            })
        }
    })   
}