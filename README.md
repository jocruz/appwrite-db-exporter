# 📚 Appwrite Data to CSV - README

Welcome to the Appwrite Data to CSV project! This README will guide you through the structure and functionality of key components in this project. We utilize Chakra UI for improved UX/UI across our components.

To start the project using Yarn Package Manager, run the following commands:

```bash
yarn
yarn install
yarn start
```

## 🚀 Project Structure

### 📂 `pages/Login.jsx`

#### Description
The `Login` component manages user authentication and document display. It handles user input for email and password and conditionally renders user-specific documents or a login form based on authentication status.

#### Key Features
- **State Management**: Uses `useState` for managing email, password, and document states.
- **Form Handling**: Manages login form submission with credential validation and error handling.
- **Dynamic Rendering**: Conditionally renders user documents or login form based on the user's authentication status.

#### Example Code
```jsx
const handleSubmit = async (event) => {
  event.preventDefault();
  try {
    await handleLogin(email, password);
    console.log("Login successful!");
  } catch (error) {
    console.error("Login failed:", error.message);
  }
};

const renderDocuments = () => (
  documents.length > 0 ? (
    <ul>
      {documents.map((doc, index) => (
        <li key={index}>{/* Document details here */}</li>
      ))}
    </ul>
  ) : (
    <p>No documents available.</p>
  )
);
```

### 📂 `contexts/UserContext.jsx`

#### Description
Manages user session, authentication state, and document retrieval through a centralized context provider.

#### Key Features
- **Session Initialization**: Automatically initializes user session on component mount.
- **Authentication Management**: Provides methods for user login and logout.
- **Document Management**: Handles fetching of documents upon user authentication.

### 📂 `components/contexts/DocumentList.jsx`

## Detailed Explanations

### Papaparse
[Papa Parse](https://www.papaparse.com/) is a powerful, in-browser CSV parser for JavaScript. It's designed to handle large files and provide a wide array of configurations to control how data is parsed and handled. We use Papa Parse in our project to handle the conversion of JSON data to a CSV format efficiently. This library helps in parsing CSV data and converting JSON data into CSV files directly in the browser without any server-side processing.

### Blob
A `Blob` (Binary Large OBject) represents immutable raw binary data, and they can be read as text or binary data, or converted into a `ReadableStream` so their methods can be used for processing. In our project, we use a `Blob` to create a CSV file. When we convert document data to a CSV format string, we wrap this string in a `Blob` to set the file's MIME type as `text/csv`, which denotes that the file format is CSV.

### link.href and document.body.appendChild
The `link.href` attribute is used to set the URL of the link, which in this case is the URL of the Blob representing the CSV file. `URL.createObjectURL(blob)` generates a URL that the browser can use to represent the `Blob` object as a link target.

```jsx
const link = document.createElement('a');
link.href = URL.createObjectURL(blob);
link.setAttribute('download', 'documents.csv');
```

#### Description
The `DocumentList` component displays a list of documents fetched from the Appwrite database. It includes functionality to export the displayed data to a CSV file, enhancing data portability.

#### Key Features
- **Document Display**: Lists all documents with details such as Name, ID, Tenant, Database ID, and Collection ID.
- **CSV Export**: Includes a button that allows users to export the document data to a CSV file. Utilizes custom functions to handle CSV formatting and download.

#### Example Code
```jsx
const downloadCSV = () => {
  const csvString = convertToCSV(documents.map(doc => ({
    Name: doc.Name || "No name provided",
    ID: doc.$id || "No ID",
    Tenant: doc.$tenant || "No Tenant",
    DatabaseID: doc.$databaseId || "No Database ID",
    CollectionID: doc.$collectionId || "No Collection ID",
  })));
  const blob = new Blob([csvString], { type: 'text/csv;charset=utf-8;' });
  const link = document.createElement('a');
  link.href = URL.createObjectURL(blob);
  link.setAttribute('download', 'documents.csv');
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};
```

### UI/UX Enhancements with Chakra UI
We have integrated Chakra UI into our project to provide a responsive and accessible user experience. Components like `LoginForm` and `DocumentList` are styled with Chakra UI to ensure consistency and visual appeal across the application.

#### Example Usage
```jsx
<Button colorScheme='blue' onClick={downloadCSV}>
  Export to CSV
</Button>
```

## 🛠 Technologies Used
- **Chakra UI**: For styling and building a consistent and accessible user interface.
- **Appwrite SDK**: For backend interactions like user authentication and data retrieval.

Thank you for exploring our Appwrite Data to CSV project!
