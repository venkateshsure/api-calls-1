let express = require("express");

const app = express();

app.use(express.json());

const sqlite = require("sqlite");

const sqlite3 = require("sqlite3");

const path = require("path"); //when the path is export
const databasePath = path.join(__dirname, "cricketTeam.db"); //response.sendFile("./page.html", { root: __dirname });

const { open } = sqlite;
let db = null;
const dbServerWithNode = async () => {
  try {
    db = await open({
      filename: databasePath,
      driver: sqlite3.Database,
    });
    app.listen(3001, () => {
      console.log("hii");
    });
  } catch (e) {
    console.log(`The message ${e.message}`);
    process.exit(1); //what is there in e
  }
};

dbServerWithNode();

app.get("/players/", async (req, res) => {
  let query = `
        SELECT * FROM cricket_team;`;
  const dataBase = await db.all(query);
  res.send(dataBase);
});

//post api call
app.post("/players/", async (req, res) => {
  //const playerId = req.params;
  const dataBody = req.body;
  //console.log(body);
  let { playerName, jerseyNumber, role } = dataBody;
  let query = `
         INSERT INTO 
         cricket_team(player_name,jersey_number,role)
         values('${playerName}',${jerseyNumber},'${role}');`;
  let promiseObj = await db.run(query);
  //let playerId = promiseObj.lastID;
  res.send("Player Added to Team");
  //console.log(playerName);
  //res.send(dataBody);
});

//get api call

app.get("/players/:playerId/", async (req, res) => {
  const { playerId } = req.params;
  const query = `
           SELECT * FROM cricket_team
           WHERE player_id=${playerId};`;
  const dbResponse = await db.get(query);
  res.send(dbResponse);
});

//update api call

app.put("/players/:playerId/", async (req, res) => {
  const { playerId } = req.params;
  const dbBody = req.body;
  const { playerName, jerseyNumber, role } = dbBody;
  let query = `
          UPDATE cricket_team SET
          player_name='${player_name}',
          jersey_number=${jersey_number},
           role='${role}'
           WHERE player_id=${playerId};`;
  let dbPromise = await db.run(query);
  res.send("Player Details Updated");
});

//delete api call

app.delete("/players/:playerId/", async (req, res) => {
  const { playerId } = req.params;
  let query = `
        SELECT * FROM cricket_team
          WHERE player_id=${playerId};`;
  const dbRes = await db.run(query);
  res.send("Player Removed");
});

module.exports = app;
