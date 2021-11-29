import * as cheerio from 'cheerio';

const handler = async (req, res) => {
  const { address } = req.query;
  const blockscan = 'https://blockscan.com/address/';
  const cardanoscan = 'https://cardanoscan.io/address/';
  const roninchain = 'https://explorer.roninchain.com/address/';

  const response = await fetch(`${blockscan}${address}`);
  const raw = await response;
  const text = await response.text();
  const $ = cheerio.load(text);

  const number_of_addresses_found = $('div.mb-0').text();
  const links = $('a.search-result-list')
    .toArray()
    .map((result) => result.attribs.href);

  res.status(200).json({ number_of_addresses_found, links });
};

export default handler;
