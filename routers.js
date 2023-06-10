const express = require('express');
const router = express.Router();

const SHOPPING_LIST = [];

router.get('/', (req, res) => {
  res.json(SHOPPING_LIST);
});

router.post('/', (req, res) => {
  const { name, price } = req.body;
  const newItem = { name, price };
  SHOPPING_LIST.push(newItem);
  res.json({ added: newItem });
});

router.get('/:name', (req, res) => {
  const { name } = req.params;
  const price = req.query.price;
  const item = { name, price };
  res.json(item);
});

router.patch('/:name', (req, res) => {
  const { name } = req.params;
  const { newName, newPrice } = req.body;

  const item = SHOPPING_LIST.find(item => item.name === name);

  if (item) {
    if (newName) {
      item.name = newName;
    }
    if (newPrice) {
      item.price = newPrice;
    }

    res.json({ updated: item });
  } else {
    res.status(404).json({ error: 'Item not found' });
  }
});

router.delete('/:name', (req, res) => {
  const { name } = req.params;

  const itemIndex = SHOPPING_LIST.findIndex(item => item.name === name);

  if (itemIndex !== -1) {
    SHOPPING_LIST.splice(itemIndex, 1);
    res.json({ message: 'Deleted' });
  } else {
    res.status(404).json({ error: 'Item not found' });
  }
});

module.exports = router;
