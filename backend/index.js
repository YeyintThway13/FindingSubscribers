const express = require("express");
const puppeteer = require("puppeteer");
const cors = require("cors");

const app = express();
app.use(cors());

const getFollowers = async (urls) => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();

  const results = [];

  for (url of urls) {
    await page.goto(url);

    const [el] = await page.$x('//*[@id="subscriber-count"]');
    const txt = await el.getProperty("textContent");
    const rawtxt = await txt.jsonValue();

    const [el1] = await page.$x('//*[@id="text-container"]');
    const name = await el1.getProperty("textContent");
    const rawName = await name.jsonValue();
    const finalName = rawName.trim();

    const [el2] = await page.$x('//*[@id="img"]');
    const src = await el2.getProperty("src");
    const rawSrc = await src.jsonValue();

    results.push({ name: finalName, subscribers: rawtxt, image: rawSrc });
  }
  await browser.close();
  return results;
};

app.get("/", async (req, res) => {
  try {
    const results = await getFollowers([
      "https://www.youtube.com/c/bellapoarch",
      "https://www.youtube.com/user/leolego",
      "https://www.youtube.com/channel/UC6ktP3PLU5sAJxN9Rb0TALg",
    ]);
    res.send(results);
  } catch (e) {
    res.send(e);
  }
});

app.listen(process.env.PORT || 4000, () => {
  console.log("App is running on port 4000");
});
