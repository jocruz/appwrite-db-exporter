import React from 'react';
import { Button } from '@chakra-ui/react'; // Import Button from Chakra UI

const DocumentList = ({ documents }) => {
  // Function to convert JSON data to CSV format
  const convertToCSV = (objArray) => {
    const array = typeof objArray !== 'object' ? JSON.parse(objArray) : objArray;
    let str = `${Object.keys(array[0]).map(value => `"${value}"`).join(",")}\r\n`;

    return array.reduce((str, next) => {
      str += `${Object.values(next).map(value => `"${value}"`).join(",")}\r\n`;
      return str;
    }, str);
  };

  // Function to trigger CSV file download
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

  return (
    <>
      {documents.length > 0 ? (
        <ul>
          {documents.map((doc, index) => (
            <li key={index}>
              <p>Name: {doc.Name || "No name provided"}</p>
              <p>ID: {doc.$id || "No ID"}</p>
              <p>Tenant: {doc.$tenant || "No Tenant"}</p>
              <p>Database ID: {doc.$databaseId || "No Database ID"}</p>
              <p>Collection ID: {doc.$collectionId || "No Collection ID"}</p>
            </li>
          ))}
        </ul>
      ) : (
        <p>No documents available.</p>
      )}
      <Button colorScheme='blue' onClick={downloadCSV} mt={4}>
        Export to CSV
      </Button>
    </>
  );
};

export default DocumentList;
