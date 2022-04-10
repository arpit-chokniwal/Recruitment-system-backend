const User = require("../models/admin.model");


const authCheck = async (req, res, next) => {

  try {
    const user = await User.findOne({ email: req.body.email });
    
    if (!user) {
      return res.status(400).json({
        message: "User does not exist",
      });
    }

    const pass = await User.findOne({ password: req.body.password });
    
    if (!pass) {
      return res.status(400).json({
        message: "wrong credentials",
      });
    }
    
    next()
   
  } catch (e) {
    return res.status(500).send(e.message);
  }
};

module.exports = authCheck