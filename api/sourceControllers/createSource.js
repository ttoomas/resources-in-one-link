import { db } from "../db.js";

export const createSource = (req, res) => {
    const sourceName = req.body.sourceName;
    const sourceType = req.body.sourceType;
    const resourcesId = req.body.resourcesId;

    const query = "SELECT * FROM sources WHERE `body` = ? AND `created_by` = ? LIMIT 1";

    db.query(query, [sourceName, resourcesId], (err, data) => {
        if(err){
            res.status(400).send("db error");
        }
        else{
            if(data.length){;
                res.status(400).send("This source already exists here");
            }
            else{
                const query = "INSERT INTO sources(`body`, `type`, `created_by`) VALUES(?)";
                const values = [
                    sourceName,
                    sourceType,
                    resourcesId
                ];
            
                db.query(query, [values], (err, data) => {
                    if(err){
                        res.status(400).send('db error');
                    }
                    else{
                        let sourceId = data.insertId.toString();
                        res.status(200).send(sourceId);
                    }
                })
            }
        }
    })

}