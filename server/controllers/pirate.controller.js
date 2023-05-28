const { Pirate } = require("../models/pirate.model");

module.exports.createPirate = (request, response) => {
  const {
    name,
    imageUrl,
    treasureChests,
    catchPhrase,
    crewPosition,
    pegLeg,
    eyePatch,
    hookHand,
  } = request.body;
  console.log(request.body);
  Pirate.create({
    name,
    imageUrl,
    treasureChests,
    catchPhrase,
    crewPosition,
    pegLeg,
    eyePatch,
    hookHand,
  })
    .then((pirate) => response.json(pirate))
    .catch((err) => response.status(400).json(err));
};

module.exports.getAllPirate = (request, response) => {

  Pirate.find({}).sort({
    name: "asc",
  });
    .then((pirates) => response.json(pirates))
    .catch((err) => response.json(err));
};

module.exports.getPirate = (request, response) => {
  Pirate.findOne({ _id: request.params.id })
    .then((pirate) => response.json(pirate))
    .catch((err) => response.json(err));
};

module.exports.updatePirate = (request, response) => {
  console.log(request.body);
  Pirate.findOneAndUpdate({ _id: request.params.id }, request.body, {
    new: true,
  })
    .then((updatedPirate) => response.json(updatedPirate))
    .catch((err) => response.json(err));
};

module.exports.deletePirate = (request, response) => {
  Pirate.deleteOne({ _id: request.params.id })
    .then((deleteConfirmation) => response.json(deleteConfirmation))
    .catch((err) => response.json(err));
};
