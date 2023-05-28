const mongoose = require("mongoose");

const PirateSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    imageUrl: { type: String, required: true },
    treasureChests: { type: Number, required: true },
    catchPhrase: { type: String, required: true },
    crewPosition: { type: String, required: true },
    pegLeg: { type: Boolean, required: true },
    eyePatch: { type: Boolean, required: true },
    hookHand: { type: Boolean, required: true },
  },
  { timestamps: true }
);

module.exports.Pirate = mongoose.model("Pirate", PirateSchema);
