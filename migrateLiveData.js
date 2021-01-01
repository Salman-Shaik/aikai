const liveData = require('./live_data.json');

const userData = liveData.values;

const insertCommand = (username,password,name,age,explicitFlag,favorites,watchlist,languages) => {
  return `INSERT INTO users VALUES(${username},${password},${name},${age},${explicitFlag},${favorites},${watchlist},${languages},FREE);`
}
const commands = userData.map(userD=> insertCommand(...userD));

commands.forEach(c=>{
  console.log("Command:");
  console.log(c);
});