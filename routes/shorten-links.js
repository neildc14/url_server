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

router.get("/:id", getShortenLink);

router.post("/", createShortenLink);

router.use(requireAuth);

//protected rotues
router.get("/", getAllLinks);

router.patch("/:id", updateShortenLink);

router.delete("/:id", deleteShortenLink);

module.exports = router;
