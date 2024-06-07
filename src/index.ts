import express, { Request, Response } from "express";
import https from "https";
import cheerio from "cheerio";
import cors from "cors";
import { IncomingMessage } from "http";

const app = express();
app.use(cors<Request>());

app.get("/:username", async (req: Request, res: Response) => {
  try {
    const username = req.params.username;

    let url = "";
    if (username[0] === "@") {
      url = `https://t.me/${username.slice(1)}`;
    } else {
      url = `https://t.me/${username}`;
    }

    const response = await new Promise<IncomingMessage>((resolve, reject) => {
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
    response.on("data", (chunk: Buffer) => {
      html += chunk.toString();
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

app.get("/", (req: Request, res: Response) => {
  res.status(404).send("Page not found");
});
