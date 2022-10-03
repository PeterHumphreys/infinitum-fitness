const { json } = require("express");
const fs = require("fs").promises;
const path = require("path");
async function getJsonPlaceholder(file)
{
  let data;
  try
  {
    data = await fs.readFile(path.resolve(__dirname, (path.resolve(`data/${file}`))));
  }
  catch(err)
  {
    console.log(err);
    return null;
  }
  return JSON.parse(data);
}

module.exports = getJsonPlaceholder;