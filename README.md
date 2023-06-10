# Express Shopping List

This is a simple JSON API application built using Express.js to store a shopping list. The application uses an array to store shopping items, where each item is a JavaScript object with the keys `name` and `price`. Please note that the shopping list will be cleared each time the server restarts, as it is stored in memory.

## Installation

1. Clone the repository to your local machine:

   ```
   git clone https://github.com/your-username/express-shopping-list.git
   ```

2. Navigate to the project directory:

   ```
   cd express-shopping-list
   ```

3. Install the dependencies by running the following command:

   ```
   npm install
   ```

## Usage

To start the Express server and run the application, use the following command:

```
npm start
```

The server will start on `http://localhost:3000`.

## Routes

The application provides the following routes:

- **GET /items**: Returns a list of shopping items.

  Example response:
  ```json
  [
    {"name": "popsicle", "price": 1.45},
    {"name": "cheerios", "price": 3.40}
  ]
  ```

- **POST /items**: Adds a new item to the shopping list.

  Example request body:
  ```json
  {"name": "popsicle", "price": 1.45}
  ```

  Example response:
  ```json
  {"added": {"name": "popsicle", "price": 1.45}}
  ```

- **GET /items/:name**: Retrieves a single item's name and price.

  Example response:
  ```json
  {"name": "popsicle", "price": 1.45}
  ```

- **PATCH /items/:name**: Modifies a single item's name and/or price.

  Example request body:
  ```json
  {"name": "new popsicle", "price": 2.45}
  ```

  Example response:
  ```json
  {"updated": {"name": "new popsicle", "price": 2.45}}
  ```

- **DELETE /items/:name**: Deletes a specific item from the shopping list.

  Example response:
  ```json
  {"message": "Deleted"}
  ```

Please note that `:name` in the routes should be replaced with the actual name of the item.

## License

This project is licensed under the [MIT License](LICENSE).
