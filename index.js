const express = require("express");
const https = require("https");
const cheerio = require("cheerio");

const app = express();

app.get("/:username", async (req, res) => {
  try {
    const username = req.params.username;
    // Make a GET request to the channel's URL

    let url = "";
    if (req.params.username[0] == "@") {
      url = `https://t.me/${req.params.username.slice(1)}`;
    } else {
      url = `https://t.me/${req.params.username}`;
    }
    const response = await new Promise((resolve, reject) => {
      https
        .get(url, (response) => {
          resolve(response);
        })
        .on("error", (error) => {
          reject(error);
        });
    });

    // Read the response data as a string
    let html = "";
    response.on("data", (chunk) => {
      html += chunk;
    });

    // Process the HTML when all data is received
    response.on("end", () => {
      // Load the HTML into Cheerio
      const $ = cheerio.load(html);

      // Find the profile photo element
      const profilePhotoElement = $("img.tgme_page_photo_image");
      const name = $("div.tgme_page_title").text();

      // Extract the src attribute (URL) of the profile photo
      const profilePhotoUrl = profilePhotoElement.attr("src");

      // Prepare the JSON response
      const responseData = {
        username,
        name,
        profilePhotoUrl,
      };

      // Send the JSON response
      res.json(responseData);
    });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ error: "An error occurred" });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

app.get("/", (req, res) => {
  res.status(404).send("Page not found"); 
});
