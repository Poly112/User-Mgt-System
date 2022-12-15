var express = require("express");
const Controllers = require("../controllers/controllers");
var router = express.Router();

/* GET home page. */
router.route("/").get(Controllers.get_home).post(Controllers.find);
router
    .route("/addUser")
    .get(Controllers.get_addUser)
    .post(Controllers.post_addUser);

router
    .route("/edit/:uuid")
    .get(Controllers.get_edit)
    .post(Controllers.post_edit);
router.route("/delete/:uuid").get(Controllers.delete);
router.route("/user/:uuid").get(Controllers.get_user);

module.exports = router;
