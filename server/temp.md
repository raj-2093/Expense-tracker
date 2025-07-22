
## Models

---

### User
- email
- password
- fullName
- userName

### Expense
- title
- subTitle
- expense (currency: string, amount: number)
- category - ref(category)
- author - ref(user)
- date

### Category
- title
- description
- author - ref(user)