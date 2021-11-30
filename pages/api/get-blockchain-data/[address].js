const puppeteer = require('puppeteer');

const handler = async (req, res) => {
  const { address } = req.query;
  const cardanoscan = 'https://cardanoscan.io/address/';
  const roninchain = 'https://explorer.roninchain.com/address/';

  // if (address.contains('addr')) scrapedData = getCardanoUrls(address);

  res.status(200).json(await getBlockscanData(address));
};

const getCardanoUrls = async (address) => {};

const getBlockscanData = async (address) => {
  const blockscan = 'https://blockscan.com/address/';

  // fetch the page
  const browser = await puppeteer.launch({ headless: true });
  const tokenInfo = [];

  try {
    const [page] = await browser.pages();
    await page.setUserAgent(
      'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/78.0.3904.108 Safari/537.36',
    ); // some pages block headless agents so set this manually

    await page.goto(`${blockscan}${address}`);
    await page.waitForSelector('a.search-result-list', { timeout: 5000 });

    // scrape blockchain list
    const links = await page.$$eval('a.search-result-list', (els) => {
      return els.map((el) => el.getAttribute('href'));
    });

    // scrape each blockchain
    // TODO: run multiple pages in parallel to increase performance
    for (const i in links) {
      const link = links[i].replace('/address/', '/tokenholdings?a=');
      await page.goto(link, { waitUntil: 'networkidle0' });
      await page.waitForSelector('#HoldingsUSD', { timeout: 10000 });
      await page.waitForSelector('#HoldingsETH', { timeout: 10000 });

      const symbol = link.match('eth')
        ? 'ETH'
        : link.match('bsc')
        ? 'BSC'
        : link.match('polygon')
        ? 'MATIC'
        : link.match('snowtrace')
        ? 'AVAX'
        : link.match('ada')
        ? 'ADA'
        : '';
      const name = `${await (await page.title()).split(' ')[0]} - ${address}`;

      tokenInfo.push({
        name,
        symbol,
        holdingsUSD: await page.$eval('#HoldingsUSD', (el) => el.textContent),
        holdingsToken: await page.$eval('#HoldingsETH', (el) => el.textContent),
        url: links[i],
      });
    }
  } catch (e) {
    console.error(e);
  } finally {
    await browser.close(); // make sure the browsers are always closed
  }

  return tokenInfo;
};

export default handler;
