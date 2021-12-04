const puppeteer = require('puppeteer');
const scrollPageToBottom = require('puppeteer-autoscroll-down');

// TODO: maybe call this on every page so it starts loading as soon as you hit the site
const handler = async (req, res) => {
  const data = await scrapeCoinPrices();

  res.setHeader('Cache-Control', `public, max-age=1800, immutable`); // cache the response for 30 minutes
  res.setHeader('X-Cache', 'HIT');
  res.status(200).json(data);
};

const scrapeCoinPrices = async () => {
  const url = 'https://coinmarketcap.com/';

  // fetch the page
  const browser = await puppeteer.launch({ headless: true });
  const coinInfo = [];

  try {
    const [page] = await browser.pages();
    await page.setUserAgent(
      'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/78.0.3904.108 Safari/537.36',
    ); // some pages block headless agents so set this manually

    await page.goto(url);

    await page.waitForXPath(
      '/html/body/div/div/div[1]/div[2]/div/div[1]/div[5]/table/tbody/tr[100]',
      { timeout: 10000 },
    );

    await scrollPageToBottom(page, 250, 5);

    const rows = await page.evaluate(() =>
      Array.from(document.querySelectorAll('tbody tr'), (el) => {
        return {
          name: el.querySelector('td:nth-child(3) p:first-child')?.textContent,
          symbol: el.querySelector('.coin-item-symbol')?.textContent,
          price: el.querySelector('td:nth-child(4)')?.textContent,
          ranking: el.querySelector('td:nth-child(2)')?.textContent,
        };
      }),
    );

    coinInfo.push(rows);
  } catch (e) {
    console.error(e);
  } finally {
    await browser.close(); // make sure the browsers are always closed
  }

  return coinInfo?.length > 0 ? coinInfo : false;
};

export default handler;
