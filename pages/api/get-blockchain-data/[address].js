const puppeteer = require('puppeteer');

const blockscan_apis = [
  {
    name: 'Etherium Network',
    symbol: 'ETH',
    baseUrl: 'https://api.etherscan.io/api?',
    key: 'HEQUT6Y352EHCBX3AV1KTHEXVFKZVPQXE4',
  },
  {
    name: 'Binance Smart Chain',
    symbol: 'BNB',
    baseUrl: 'https://api.bscscan.com/api?',
    key: 'BJJJAAD2DU3I18JRPHAR68CGA1ITNKTNV9',
  },
  {
    name: 'Polygon Network',
    symbol: 'MATIC',
    baseUrl: 'https://api.polygonscan.com/api?',
    key: '8Y7C7SA8WKAPDVXJBUMF287MIA7TB4ZM9Y',
  },
  {
    name: 'Avalanche Network',
    symbol: 'AVAX',
    baseUrl: 'https://api.snowtrace.io/api?',
    key: 'GJI118JPVMB69EH7H916H76GZYS3WYCABF',
  },
  {
    name: 'Fantom Network',
    symbol: 'FTM',
    baseUrl: 'https://api.ftmscan.com/api?',
    key: '4RVBDP2KPUHJK4T9M8K1EQFPU41PANAHWB',
  },
  {
    name: 'Heco Chain',
    symbol: 'HT',
    baseUrl: 'https://api.hecoinfo.com/api?',
    key: 'HK5NZF388QBAARJHRAHSF59HP5AA9XVRV1',
  },
  {
    name: 'Hoo Smart Chain',
    symbol: 'HOO',
    baseUrl: 'https://api.hooscan.com/api?',
    key: '8VZWTE1Q32D3FDURSE3JKW7W7T8WYTTRUX',
  },
];

const wei = 1000000000000000000;

// TODO: maybe call this on every page so it starts loading as soon as you hit the site
const handler = async (req, res) => {
  const { address } = req.query;
  const cardanoscan = 'https://cardanoscan.io/address/';
  const roninchain = 'https://explorer.roninchain.com/address/';
  let data = {};

  data =
    (await getBlockchainData(address)) ||
    // (await scrapeBlockscanData(address)) ||
    {};

  res.setHeader('Cache-Control', 'public, max-age=900, immutable'); // cache the response for 15 minutes
  res.setHeader('X-Cache', 'HIT');
  res.status(200).json(data);
};

const getBlockchainData = async (address) => {
  const tokenInfo = [];

  // blockscan apis
  for (const chain of blockscan_apis) {
    const { name, symbol, baseUrl, key } = chain;
    const url = `${baseUrl}module=account&action=balance&address=${address}&tag=latest&apiKey=${key}`;
    const data = await fetch(url).then((res) => {
      return res.json();
    });

    if (data) {
      const { status, message } = data;
      const result = parseInt(data.result, 10);

      if (status === '1' && result > 0)
        tokenInfo.push({
          name,
          symbol,
          holdingsUSD: 1,
          holdingsToken: result / wei,
          data,
        });
    }
  }

  return tokenInfo.length > 0 ? tokenInfo : false;
};

const scrapeBlockscanData = async (address) => {
  console.log('No APIs found, scrapping...');
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
      await page.waitForSelector('#HoldingsUSD', { timeout: 5000 });
      await page.waitForSelector('#HoldingsETH', { timeout: 5000 });

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

  return tokenInfo.length > 0 ? tokenInfo : false;
};

export default handler;
