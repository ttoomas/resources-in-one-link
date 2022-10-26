import { db } from "../db.js";

export const deleteSource = (req, res) => {
    const id = req.body.id;

    const query = "DELETE FROM sources WHERE id = ?";

    db.query(query, [id], (err, data) => {
        if(err){
            res.status(400).send('db error');
        }
        else{
            res.status(200).send('Source deleted successfully');
        }
    })
}