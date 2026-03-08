const Policy = require("../models/Policy");

// Create Policy
exports.createPolicy = async (req, res) => {
  try {
    const policy = new Policy(req.body);
    const savedPolicy = await policy.save();
    res.status(201).json(savedPolicy);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Get All Policies
exports.getPolicies = async (req, res) => {
  try {
    const policies = await Policy.find();
    res.json(policies);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get Policy by ID
exports.getPolicyById = async (req, res) => {
  try {
    const policy = await Policy.findById(req.params.id);

    if (!policy) {
      return res.status(404).json({ message: "Policy not found" });
    }

    res.json(policy);
  } catch (error) {
    res.status(400).json({ message: "Invalid ID" });
  }
};

// Update Policy
exports.updatePolicy = async (req, res) => {
  try {
    const policy = await Policy.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    res.json(policy);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Delete Policy
exports.deletePolicy = async (req, res) => {
  try {
    await Policy.findByIdAndDelete(req.params.id);
    res.json({ message: "Policy deleted successfully" });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};