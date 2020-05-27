const sql = require("./db.js");

// constructor
const Auth = function(auth) {
  this.email = auth.email;
  this.api_key = auth.api_key;
  this.access_level = auth.access_level;
};

Auth.create = (newAuth, result) => {
  sql.query("INSERT INTO apikeys SET ?", newAuth, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    console.log("created auth: ", { id: res.insertId, ...newAuth });
    result(null, { id: res.insertId, ...newAuth });
  });
};

Auth.findOne = (authId, result) => {
  sql.query(`SELECT * FROM apikeys WHERE id = ${authId}`, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    if (res.length) {
      console.log("found auth: ", res[0]);
      result(null, res[0]);
      return;
    }

    // not found Auth with the id
    result({ kind: "not_found" }, null);
  });
};

Auth.validateApiKey = (key, result) => {
  sql.query(`SELECT * FROM apikeys WHERE api_key = '${key}' AND hit_count <= daily_limit`, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    if (res.length) {
      result(null, res);
      return;
    }

    // not found Auth with the id
    result({ kind: "not_found" }, null);
  });
};

Auth.findAll = result => {
  sql.query("SELECT question, answer FROM apikeys", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    if (res.length) {
      console.log("Select ALL ");
      result(null, res);
      return;
    }

    // not found Auth with the id
    result({ kind: "not_found" }, null);
  });
};

Auth.update = (authId, auth, result) => {
  sql.query(
    "UPDATE apikeys SET question = ?, answer = ? WHERE id = ?",
    [auth.question, auth.answer, authId],
    (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }

      if (res.affectedRows == 0) {
        // not found Auth with the id
        result({ kind: "not_found" }, null);
        return;
      }

      console.log("updated auth: ", { id: authId, ...auth });
      result(null, { id: authId, ...auth });
    }
  );
};

Auth.remove = (id, result) => {
  sql.query("DELETE FROM apikeys WHERE id = ?", id, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    if (res.affectedRows == 0) {
      // not found Auth with the id
      result({ kind: "not_found" }, null);
      return;
    }

    console.log("deleted auth with id: ", id);
    result(null, res);
  });
};

Auth.hasLevelOne = (key, result) => {
  sql.query(`SELECT 1 FROM apikeys WHERE api_key = ${key} AND access_level >= 1 LIMIT 1`, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    if (res.length) {
      console.log("found auth: ", res);
      result(null, res);
      return;
    }

    // not found Auth with the key
    result({ kind: "not_found" }, null);
  });
};

Auth.hasLevelTwo = (key, result) => {
  sql.query(`SELECT 1 FROM apikeys WHERE api_key = '${key}' AND access_level >= 2 LIMIT 1`, (err, res) => {
    console.log(`res: ${res}`)
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    if (res) {
      console.log("found auth: ", res);
      result(null, res);
      return;
    }
  });
};

Auth.checkApiUsage = (key, result) => {
  sql.query(`SELECT * FROM apikeys WHERE api_key = '${key}' LIMIT 1`, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }
    console.log("holy")
    if (!res.length) {
      result({kind: 'not_found'}, null);
      return;
    }

    if (res[0].hit_count >= res[0].daily_limit) {
      result({kind: 'limit_reached'}, null);
      return;
    }

    let now = Math.floor(Date.now() / (1000*86400))
    let lastHit = Math.floor(new Date(res[0].last_hit) / (1000*86400))
    if (now-lastHit > 0) {
      // reset counter and set it to 0
      res[0].hit_count = 0
    }

    // increment hit_count
    res[0].hit_count++
    //update hit_count and last_hit
    sql.query(`UPDATE apikeys SET hit_count = '${res[0].hit_count}' WHERE api_key = '${key}' LIMIT 1`, (err) => {
      console.log("double holy")
      if (err) {
        console.log("error: ", err);
        result(err);
        return;
      }
      
      callback(null)
    })

  });
};

module.exports = Auth;
