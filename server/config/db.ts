import {neon} from "@neondatabase/serverless"
import dotenv from "dotenv";

dotenv.config();


const PGHOST = process.env.PGHOST
const PGDATABASE = process.env.PGDATABASE
const PGUSER = process.env.PGUSER
const PGPASSWORD = process.env.PGPASSWORD

if (!PGHOST || !PGDATABASE || !PGUSER || !PGPASSWORD) {
   throw new Error("Missing one or more required environment variables")
}

// creates a SQL connection using our env variables
export const sql = neon(
   `postgresql://${PGUSER}:${PGPASSWORD}@${PGHOST}/${PGDATABASE}?sslmode=require`
)
// this sql function we export is used as a tagged template literal, which allows us to write SQL queries safely