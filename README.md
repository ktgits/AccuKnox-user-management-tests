# AccuKnox-user-management-tests

Automated end-to-end tests for OrangeHRM User Management module using Playwright and JavaScript.

---

## 🛠 Tech Stack

| Tool | Version |
|---|---|
| Playwright | 1.58.2 |
| Node.js | v20.14.1 |
| Language | JavaScript |

---

## 📁 Project Structure
```
AccuKnox-user-management-tests/
├── pages/
│   ├── LoginPage.js
│   ├── AdminPage.js
│   └── UserFormPage.js
├── tests/
│   └── Orange-HRM.test.js
├── .env
├── .gitignore
├── playwright.config.js
├── package.json
└── README.md
```

---

## ⚙️ Project Setup Steps

### 1. Clone the Repository
```bash
git clone https://github.com/ktgits/AccuKnox-user-management-tests.git
cd AccuKnox-user-management-tests
```

### 2. Install Node.js

Download and install Node.js LTS from https://nodejs.org/en

Verify:
```bash
node --version
npm --version
```

### 3. Install Dependencies
```bash
npm install
```

### 4. Install Playwright Browsers
```bash
npx playwright install
```

### 5. Create `.env` File

Create a `.env` file in the root folder and add:
```
BASE_URL=https://opensource-demo.orangehrmlive.com
ADMIN_USERNAME=Admin
ADMIN_PASSWORD=admin123
EMPLOYEE_NAME=Ranga Akunuri
NEW_USER_PASSWORD=Test@123
```

> ⚠️ `.env` is in `.gitignore` and will never be pushed to GitHub

---

## ▶️ How to Run Tests

### Run all tests on all browsers
```bash
npm test
```

### Run on Chromium only
```bash
npm run test:chromium
```

### Run on Firefox only
```bash
npm run test:firefox
```

### Run on WebKit only
```bash
npm run test:webkit
```

### Run with browser visible
```bash
npm run test:headed
```

### View HTML report
```bash
npm run test:report
```

---

## 🧪 Test Cases Covered

| Test Step | Description |
|---|---|
| TC_OHR_001 | Login with valid credentials |
| TC_OHR_002 | Navigate to Admin Module |
| TC_OHR_003 | Add a new user |
| TC_OHR_004 | Search for newly created user |
| TC_OHR_005 | Edit user details |
| TC_OHR_006 | Validate updated user details |
| TC_OHR_007 | Delete the user |

---

## 📝 Notes

- Tests run in **headless mode** by default
- All 3 browsers run in **parallel** for faster execution
- Screenshots and videos captured automatically on failure

---

## 🌐 Test Website

https://opensource-demo.orangehrmlive.com