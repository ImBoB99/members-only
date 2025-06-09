const {getAllMessages} = require("../db/queries/userQueries")
const {deleteMessageById} = require('../db/queries/userQueries')

const getRoot = async (req, res) => {
  const messages = await getAllMessages()
  console.log(messages)
  res.render("index", {messages: messages});
}

const deleteMessage = async (req, res) => {
  console.log("Delete message")
  const {id} = req.body

  try {
    await deleteMessageById(id)
    res.status(200).json({ message: "Message deleted" });

  } catch (error) {
    console.error(error)
  }
}

module.exports = {getRoot, deleteMessage}