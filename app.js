const express = require("express");
const app = express();
const axios = require("axios");

app.get("/api/rates/", async (req, res) => {
  const { base, currency } = req.query;
  try {
    const data = await axios({
      url: encodeURI(
        `https://api.exchangeratesapi.io/latest?base=${base}&symbols=${currency}`
      ),
      method: "get",
    });

    return res.status(200).send({
      status_code: 200,
      data: data.data,
    });
  } catch (err) {
    return res.status(400).send({
      status_code: 400,
      detail: err.message,
      message: "Invalid request",
    });
  }
});

app.listen(process.env.PORT || 3000, () => {
  console.log("server has started");
});
