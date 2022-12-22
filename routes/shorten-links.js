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


router.post("/li/", createShortenLink);

router.get("/li/:id", getShortenLink);

//protected routes
router.get("/li/", requireAuth, getAllLinks);

router.patch("/li/:id", requireAuth, updateShortenLink);

router.delete("/li/:id", requireAuth, deleteShortenLink);

module.exports = router;
