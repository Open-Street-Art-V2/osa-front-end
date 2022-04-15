import React from 'react';
import { Page, Text, View, Document, StyleSheet } from '@react-pdf/renderer';

// Create styles
const styles = StyleSheet.create({
  page: {
    flexDirection: 'row',
    backgroundColor: '#E4E4E4'
  },
  section: {
    margin: 10,
    padding: 10,
    flexGrow: 1
  }
});

// Create Document Component
const MyDocument = () => (
  <Document>
    <Page size="A4" style={styles.page}>
    <h1>Open Street Art</h1>
    <h2>Liste des oeuvres de la ville</h2>
    <div>
        <ul>
            <li>Auteur</li>
            <li>Description</li>
            <li>Longitude </li>
            <li>Latitude</li>
            <li>Date de création </li>
            <li>Heure de création</li>
        </ul>
    </div>
    </Page>
  </Document>
);