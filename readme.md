# Expense Tracker

Welcome to **Expense Tracker**, a simple and intuitive web application built with the MERN stack (MongoDB, Express.js, React, Node.js) to help you manage your daily expenses effortlessly. Keep track of your spending, organize expenses by categories, and gain insights into your monthly spending habits through interactive charts.

## Features

- **Manage Expenses**: Easily create, read, update, and delete (CRUD) your daily expenses.
- **Organize Categories**: Add, edit, or remove categories to group your expenses as needed.
- **Monthly Analytics**: Visualize your spending with category-wise charts to understand where your money goes each month.

## Getting Started

Follow these steps to set up and run the Expense Tracker on your local machine.

### Prerequisites

- Node.js (v14 or higher)
- MongoDB (local or cloud instance, e.g., MongoDB Atlas)
- npm or yarn

### Installation

1. **Clone the repository**:

   ```bash
   git clone https://github.com/your-username/expense-tracker.git
   cd expense-tracker
   ```

2. **Set up the backend**:

   - Navigate to the `backend` folder:
     ```bash
     cd backend
     ```
   - Install dependencies:
     ```bash
     npm install
     ```
   - Create a `.env` file in the `backend` folder and add:

```env
PORT=
CORS_ORIGIN=
ACCESS_TOKEN_SECRET=
ACCESS_TOKEN_EXPIRY=
REFRESH_TOKEN_SECRET=
REFRESH_TOKEN_EXPIRY=
MONGODB_URI=
```

3. **Set up the frontend**:

   - Navigate to the `frontend` folder:
     ```bash
     cd ../frontend
     ```
   - Install dependencies:
     ```bash
     npm install
     ```

4. **Set up concurrently in root folder**:
- In the root folder execute `npm run install`
- Execute `npm run dev` to start both react and express server (this setup is using [concurrently](https://www.npmjs.com/package/concurrently) npm package)

5. **Access the app**:
   - Open your browser and go to `http://localhost:3000` to start using the Expense Tracker.

## Usage

- **Add Expenses**: Go to the "Add Expense" page, select a category, enter the amount, and save.
- **Manage Categories**: Use the "Categories" section to create or edit expense categories.
- **View Analytics**: Check the "Analytics" page to see a chart breaking down your monthly expenses by category.

## Tech Stack

- **Frontend**: React, Chart.js (for analytics visualization)
- **Backend**: Node.js, Express.js
- **Database**: MongoDB
- **Styling**: CSS or a UI library like Bootstrap/Material-UI (customize as needed)
- **Environment**: Managed with `.env` for configuration

## Contributing

Contributions are welcome! If you'd like to improve the Expense Tracker, please follow these steps:

1. Fork the repository.
2. Create a new branch (`git checkout -b feature/your-feature`).
3. Make your changes and commit (`git commit -m "Add your feature"`).
4. Push to the branch (`git push origin feature/your-feature`).
5. Open a pull request.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

## Acknowledgements

- Built with ❤️ using the MERN stack.
- Thanks to the open-source community for tools like Chart.js and MongoDB.

Happy tracking! 🚀
