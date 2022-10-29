import mysql from "mysql";
import dotenv from "dotenv";

dotenv.config();

// local db
// export const db = mysql.createConnection({
//     host: "localhost", 
//     user: "root",
//     password: "",
//     database: "resources-in-one-link"
// })

export const db = mysql.createConnection({
    host: "sql.freedb.tech", 
    user: "freedb_res_ttoomas",
    password: process.env.DB_PASSWORD,
    database: "freedb_res_in_one_link"
})