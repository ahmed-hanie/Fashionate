const adminAccess = async (req, res, next) => {
  try {
    const roles = req.user.roles;
    let isAdmin = false;
    for (let i = 0; i < roles.length; i++) {
      if (roles[i].name === "admin") {
        isAdmin = true;
        break;
      }
    }
    if (isAdmin) {
      next();
    } else {
      res.status(401).json({ message: "Unauthorized" });
    }
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: "Something went wrong" });
  }
};

module.exports = adminAccess;
