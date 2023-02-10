const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const appoinmentSchema = new Schema(
    {
      appoinmentId: {
        type: String,
        required: true,
      },
      description: {
        type: String,
        required: true,
      },
      tasks: {
        type: Array,
        required: true,
      },
      timings : {
        type: Array,
        required: true,
      },
      status: {
        type: String,
        default: "pending",
      }
    },
    {
      timestamps: true,
    }
  );
  
  const Appoinment = mongoose.model("appoinments", agentSchema);
  module.exports = Appoinments;