import React from 'react';

const RenderDocuments = ({ documents }) => (
  documents.length > 0 ? (
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
  )
);

export default RenderDocuments;
