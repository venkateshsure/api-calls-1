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
  res.send(dataBody);
});
