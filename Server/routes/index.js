const Router = require("express")
const router = new Router()
const medicationRouter = require("./medicationRouter")
const elasticSearchRouter = require("./elasticSearchRouter")

router.use("/medication", medicationRouter)
router.use("/", elasticSearchRouter)

module.exports = router