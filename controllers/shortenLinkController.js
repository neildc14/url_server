const ShortenLink = require("../model/shortenLinkModel");
const generateRandomString = require("../helpers/generateRandomString");
const isValidURL = require("../helpers/urlValidator");

const getAllLinks = async (req, res) => {
  const user_id = req.user._id;
  const all_links = await ShortenLink.find({ user_id }).sort({ createdAt: 1 });
  res.status(200).json(all_links);
};

const getShortenLink = async (req, res) => {
  const { id } = req.params;
  const user_id = req.user?._id;

  try {
    const shorten_link = await ShortenLink.findOne({ shorten_link: id }).exec();
    const has_user = shorten_link.user_id;

    if (has_user === null && !user_id) {
      return res.status(400).json({ error: "Request is not authorized" });
    }
    res.redirect(shorten_link.original_link);
  } catch (error) {
    res.status(400).json({ error: "Link does not exist" });
  }
};

const createShortenLink = async (req, res) => {
  const { user_id, original_link } = req.body;
  const valid_url = isValidURL(original_link);

  if (!valid_url) {
    res.status(400).json({ error: "Please input valid URL" });
    return;
  }

  const randomString = generateRandomString();
  const shorten_link = randomString;

  try {
    const generated_shorten_link = await ShortenLink.create({
      user_id,
      original_link,
      shorten_link,
    });
    res.status(200).json(generated_shorten_link);
  } catch (error) {
    res.status(400).json({ error: "Failed to generate shortened link" });
  }
};

const deleteShortenLink = async (req, res) => {
  const { id } = req.params;

  try {
    const delete_shorten_link = await ShortenLink.findOneAndDelete({
      shorten_link: id,
    });
    res.status(200).json(delete_shorten_link);
  } catch (error) {
    res.status(400).json({ error: "Failed to delete shortened link" });
  }
};

const updateShortenLink = async (req, res) => {
  const { id } = req.params;

  try {
    const update_shorten_link = await ShortenLink.findOneAndUpdate(
      { shorten_link: id },
      { ...req.body }
    );
    res.status(201).json(update_shorten_link);
  } catch (error) {
    res.status(400).json({ error: "Failed to update shorten link" });
  }
};

module.exports = {
  getAllLinks,
  getShortenLink,
  createShortenLink,
  deleteShortenLink,
  updateShortenLink,
};
