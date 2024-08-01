const verifyId = (req, res, next) => {
  
    const id = req.params.id || req.body.id;
    if(!id || id.length != 24){
        return res.status(400).json("Invalid id");
    }
    next();
}

module.exports = verifyId;
