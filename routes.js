const router = require("express").Router();
const videoController = require("./video.controller");

router.get("/:videoId", videoController.streamVideo);

module.exports = router;