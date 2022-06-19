import express from "express";

const router = express.Router();

router.put("/deposit", (req, res) => {
  //depositing money
  res.send("deposit");
});
router.put("/credit", (req, res) => {
  //depositing money
  res.send("credit");
});
router.put("/withdraw", (req, res) => {
  //depositing money
  res.send("withdraw");
});
router.put("/transfer", (req, res) => {
  //depositing money
  res.send("transfer");
});

export default router;
