const router = require('express').Router();
let Agents = require('../models/agents.model');



// CREATE
// UPDATE
// DELETE
// GET
// GET ALL


// Handles incoming HTTP GET requests on the /players URL path
router.route('/').get((req, res) => {
  Agents.find().populate('role')
    .then(agents => res.json(agents))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/getById').get((req, res) => {
  Agents.findOne({ _id: req.query._id }).populate('role')
    .then(player => res.json(agents))
    .catch(err => res.status(400).json('Error: ' + err));
});

module.exports = router;