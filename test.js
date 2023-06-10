const request = require('supertest');
const app = require('./app');

describe('Shopping List API', () => {
  let shoppingList = [];

  beforeEach(() => {
    // Reset the shopping list before each test
    shoppingList = [];
  });

  describe('GET /items', () => {
    it('should return an empty array when no items are added', async () => {
      const response = await request(app).get('/items');
      expect(response.status).toBe(200);
      expect(response.body).toEqual([]);
    });

    it('should return the added items', async () => {
      shoppingList = [{ name: 'popsicle', price: 1.45 }, { name: 'cheerios', price: 3.40 }];

      const response = await request(app).get('/items');
      expect(response.status).toBe(200);
      expect(response.body).toEqual(shoppingList);
    });
  });

  describe('POST /items', () => {
    it('should add a new item to the shopping list', async () => {
      const newItem = { name: 'ice cream', price: 2.50 };

      const response = await request(app).post('/items').send(newItem);
      expect(response.status).toBe(200);
      expect(response.body).toEqual({ added: newItem });

      expect(shoppingList).toHaveLength(1);
      expect(shoppingList[0]).toEqual(newItem);
    });
  });

  describe('GET /items/:name', () => {
    it('should return the item with the specified name and price', async () => {
      const item = { name: 'popsicle', price: 1.45 };
      shoppingList = [item];

      const response = await request(app).get('/items/popsicle');
      expect(response.status).toBe(200);
      expect(response.body).toEqual(item);
    });
  });

  describe('PATCH /items/:name', () => {
    it('should update the item with the specified name', async () => {
      const item = { name: 'popsicle', price: 1.45 };
      shoppingList = [item];

      const updatedItem = { newName: 'new popsicle', newPrice: 2.45 };

      const response = await request(app).patch('/items/popsicle').send(updatedItem);
      expect(response.status).toBe(200);
      expect(response.body).toEqual({ updated: { ...item, ...updatedItem } });

      expect(shoppingList).toHaveLength(1);
      expect(shoppingList[0]).toEqual({ ...item, ...updatedItem });
    });
  });

  describe('DELETE /items/:name', () => {
    it('should delete the item with the specified name', async () => {
      const item = { name: 'popsicle', price: 1.45 };
      shoppingList = [item];

      const response = await request(app).delete('/items/popsicle');
      expect(response.status).toBe(200);
      expect(response.body).toEqual({ message: 'Deleted' });

      expect(shoppingList).toHaveLength(0);
    });

    it('should return an error if the item to delete is not found', async () => {
      const response = await request(app).delete('/items/nonexistent');
      expect(response.status).toBe(404);
      expect(response.body).toEqual({ error: 'Item not found' });
    });
  });
});
