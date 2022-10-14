const { json } = require("express");
const fs = require("fs").promises;
const path = require("path");
async function getJsonPlaceholder(file)
{
  let data;
  try
  {
    data = await fs.readFile(path.resolve(__dirname, (path.resolve(`data/${file}`))));
    data = Object.values(JSON.parse(data))[0];
  }
  catch(err)
  {
    console.log(err);
    return null;
  }
  return data
}

module.exports = getJsonPlaceholder;