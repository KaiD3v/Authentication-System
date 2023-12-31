const jwt = require("jsonwebtoken");

async function validate(req, res, next) {
  const { authorization } = req.headers;

  try {
    if (!authorization) {
      throw new Error("Token não autorizado!");
    }

    const token = authorization.split("  ")[1];

    const decoded = await jwt.verify(token, "PRIVATEKEY");

    req.user = decoded.user;

    next();
  } catch (err) {
    console.error(`Erro de autenticação: ${err}`);
    return res.status(401).json({ message: "Unauthorized" });
  }
}

module.exports = validate;3