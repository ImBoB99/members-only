const {getAllMessages} = require("../db/queries/userQueries")

const getRoot = async (req, res,) => {
  const messages = await getAllMessages()
  console.log(messages)
  res.render("index", {messages: messages});
}

module.exports = {getRoot}