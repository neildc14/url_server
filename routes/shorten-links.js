const express = require("express");
const router = express.Router();
const {
  getAllLinks,
  getShortenLink,
  createShortenLink,
  deleteShortenLink,
  updateShortenLink,
} = require("../controllers/shortenLinkController");
const requireAuth = require("../middleware/requireAuth");

router.get("/li/:id", getShortenLink);

router.post("/li/", createShortenLink);

router.use(requireAuth);

//protected rotues
router.get("/li/", getAllLinks);

router.patch("/li/:id", updateShortenLink);

router.delete("/li/:id", deleteShortenLink);

module.exports = router;
