import { db } from "../db.js";

export const updateSource = (req, res) => {
    const id = req.body.sourceId;
    const content = req.body.sourceContent;
    
    const query = "UPDATE sources SET `body` = ? WHERE id = ?";
    const values = [
        content,
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