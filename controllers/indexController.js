const getRoot = async (req, res,) => {
  req.session.visited = (req.session.visited || 0) + 1;
  console.log(req.session.visited)
  res.render("index");
}

module.exports = {getRoot}