
const express = require('express');
const faker = require('faker');
const cors = require('cors');
const createCsvWriter = require('csv-writer').createObjectCsvWriter;

const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());

const supportedRegions = {
  USA: 'en_US',
  German: 'de',
  French: 'fr',
  Georgian: 'ge',
  Spanish: 'es',
  Italian: 'it',
};

function generateFakeUsers(region, errorRate, perPage, page, seed) {
  const locale = supportedRegions[region];
  if (!locale) throw new Error(`Unsupported region: ${region}`);
  
  faker.locale = locale;
  faker.seed(seed + page);
  
  const users = [];
  const startIndex = (page - 1) * perPage;

  for (let i = 0; i < perPage; i++) {
    let name = faker.name.findName();
    let address = faker.address.streetAddress();
    let phone = faker.phone.phoneNumber();

    users.push({
      index: startIndex + i + 1,
      id: `${region}-${page * perPage + i + 1}-${Math.floor(Math.random() * 1000)}`,
      name: name,
      address: address,
      phone: phone
    });
  }

  return users;
}

app.get('/api/users', (req, res) => {
  const { region = 'USA', errorRate = 0, seed, page = 1 } = req.query;
  const perPage = 10; 

  if (!supportedRegions[region]) {
    return res.status(400).send(`Unsupported region: ${region}`);
  }

  const actualSeed = seed ? Number(seed) : Math.floor(Math.random() * 1000000);

  try {
    const users = generateFakeUsers(region, Number(errorRate), perPage, Number(page), actualSeed);
    res.json({ users, seed: actualSeed });
  } catch (error) {
    res.status(400).send(error.message);
  }
});

app.get('/api/export', (req, res) => {
  const { region = 'USA', errorRate = 0, seed, page = 1 } = req.query;
  const perPage = 10;

  if (!supportedRegions[region]) {
    return res.status(400).send(`Unsupported region: ${region}`);
  }

  const actualSeed = seed ? Number(seed) : Math.floor(Math.random() * 1000000);

  const csvWriter = createCsvWriter({
    path: 'users.csv',
    header: [
      { id: 'index', title: 'Index' },
      { id: 'id', title: 'ID' },
      { id: 'name', title: 'Name' },
      { id: 'address', title: 'Address' },
      { id: 'phone', title: 'Phone' }
    ]
  });

  try {
    const users = generateFakeUsers(region, Number(errorRate), perPage, Number(page), actualSeed);
    
    csvWriter.writeRecords(users)
      .then(() => {
        res.download('users.csv', 'users.csv', (err) => {
          if (err) {
            console.error('Error downloading file: ', err);
            res.status(500).send('Error downloading file');
          }
        });
      });
  } catch (error) {
    res.status(400).send(error.message);
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});