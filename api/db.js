import mysql from "mysql";

export const db = mysql.createConnection({
    host: "localhost", 
    user: "root",
    password: "",
    database: "resources-in-on-link"
})