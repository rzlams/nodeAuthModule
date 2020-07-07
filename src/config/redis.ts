var redis = require("redis");
var client = redis.createClient();

client.on("connect", function () {
  console.log("Redis client connected");
});

client.on("error", function (err) {
  console.log("Something went wrong " + err);
  console.log("Revisa si tienes el servidor de Redis activado");
});

//funciones para agregar, actualizar o remover los refresh tokens de redis
function addRefreshTokenToList(refreshToken, username, accessToken, exp) {
  client.HMSET(refreshToken, {
    username: username,
    accessToken: accessToken,
  });

  client.expire(refreshToken, exp);
}

function updateRefreshTokenfromList(refreshToken, accessToken) {
  client.hset(refreshToken, "accessToken", accessToken, redis.print);
}

function removeRefreshTokenfromList(refreshToken) {
  client.del(refreshToken, redis.print);
}
