import express from "express"
import { createClient } from "redis";



const port = 3000;
const hostname = 'localhost';
const redis_client = createClient();

//Below is a function to help us connect with the redis client.
const redis_connection = async () => {
    redis_client.on("error", err => console.log("Redis client error", err));
    await redis_client.connect();
    //This will enable us to know if we connected successfuly or an error might have occured
    console.log("All went well connected to redis client enjoy!!!");
}
// Below is a simple way on how you can store data using redis
const redis_dataStore = async () => {
    await redis_client.set('total', 3002);
    //The set keyword is used to set data in a certain format in this case string
    const get_data = await redis_client.get('total');
    //The get_data function in our case enables us to get any data from redis storage use the .get() and then specify the type of data in our case key which has a value = value
    //You can try different data values.
    console.log(JSON.stringify(get_data));
}

const redis_storeAdvanced = async () => {
    await redis_client.hSet('user-session:2000', {
        name: "Timothy",
        nick_name: "Rensy",
        age: 20
    });

    const user_sessions = await redis_client.hGetAll('user-session:2000');
    console.log(JSON.stringify(user_sessions, null, 2));
}

//We invoke our async functions below
(async ( )=> {
    await redis_connection();
    await redis_dataStore();
    await redis_storeAdvanced();
})();

const app = express();

app.get("/", (req, res) => {
    res.send("Hello am up and running");
});


app.listen(port, () => console.log(`server running at -->  http://${hostname}:${port}`));