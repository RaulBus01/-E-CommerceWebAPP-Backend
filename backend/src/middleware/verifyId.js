const verifyId = (req, res, next) => {
  
    if((req.body.hasOwnProperty("id") && req.body.id.length !== 24 ) ||
    (req.params.hasOwnProperty("id") && req.params.id.length !== 24 )) {
        return res.status(400).json("Invalid id");
    }
    next();
}

module.exports = verifyId;
