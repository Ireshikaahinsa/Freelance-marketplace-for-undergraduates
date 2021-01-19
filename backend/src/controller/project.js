const Project = require("../models/project");
const shortid = require("shortid");
const slugify = require("slugify");

exports.createProject = (req, res) => {
  //  res.status(200).json({ file: req.files, body: req.body});

  const { name, price, description, category, quantity, createdBy } = req.body;

  let projectPictures = [];

  if (req.files.length > 0) {
    projectPictures = req.files.map((file) => {
      return { img: file.filename };
    });
  }

  const project = new Project({
    name: name,
    slug: slugify(name),
    price,
    quantity,
    description,
    projectPictures,
    category,
    createdBy: req.user._id,
  });

  project.save((error, project) => {
    if (error) return res.status(400).json({ error });
    if (project) {
      res.status(201).json({ project });
    }
  });
};
