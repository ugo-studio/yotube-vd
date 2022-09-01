const express = require("express");
const app = express();
const ytdl = require("ytdl-core");

app.use(express.json());

app.set("view engine", "ejs");

app.get("/", (req, res) => {
  return res.render("index");
});

app.get("/download", async (req, res) => {
  const v_id = req.query.url.split("v=")[1];
  const info = await ytdl.getInfo(req.query.url);
  return res.render("download", {
    url: "https://www.youtube.com/embed/" + v_id,
    info: info.formats.sort((a, b) => {
      return a.mimeType < b.mimeType;
    }),
  });
});

// OUR ROUTES WILL GO HERE
app.listen(3000, () => {
  console.log("Server is running on http://localhost:3000");
});
