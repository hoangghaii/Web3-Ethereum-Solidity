import dotenv from 'dotenv';
import express from 'express';
import Moralis from 'moralis';
import cors from 'cors';

const app = express();

const port = process.env.PORT || 5001;

dotenv.config();

app.use(cors());

app.use(express.json());

const MORALIS_API_KEY = process.env.MORALIS_API_KEY;

// Our endpoint
app.get('/getwalletbalance', async (req, res) => {
  try {
    const { query } = req;

    const response = await Moralis.EvmApi.balance.getNativeBalance({
      chain: '0xaa36a7', //sepolis chain id
      address: query.address,
    });

    return res.status(200).json(response);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});

Moralis.start({
  apiKey: MORALIS_API_KEY,
}).then(() => {
  app.listen(port, () => {
    console.log('Listening for API Calls');
  });
});
