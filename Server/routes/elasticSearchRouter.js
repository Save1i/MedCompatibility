const Router = require("express")
const router = new Router()
const elasticController = require("../controllers/elasticsearchContoller")

router.get("/_search", elasticController.postSearch)

module.exports = router