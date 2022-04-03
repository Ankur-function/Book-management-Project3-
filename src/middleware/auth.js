const jwt = require("jsonwebtoken");
const bookModel = require("../model/bookModel");


const authenticate = function (req, res, next) {
    let token = req.headers["x-api-key"];
    if (!token) return res.send({ status: false, msg: "token must be present" });

    let decodedtoken = jwt.verify(token, "Book-Management");
    if (!decodedtoken) return res.send({ status: false, msg: "invalid token" })
    next()
}


const authorisation = async function (req, res, next) {
    const data = req.params.bookId

    const findBook = await bookModel.findById(data)
    if (!findBook) return res.status(400).send("Book Id is not valid")

    const userid = findBook.userid
    let token = req.headers["x-api-key"];
    if (!token) return res.status(400).send({ status: false, msg: "token must be present" })

    let decodedtoken = jwt.verify(token, "Book-Management")
    let userlogin = decodedtoken.userid

    if (userid != userlogin) { return res.status(400).send({ status: false, msg: "user not allowed to modify another user book" }) }

    next()

}




module.exports.authenticate = authenticate
module.exports.authorisation = authorisation