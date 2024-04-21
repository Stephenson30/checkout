import React from "react";
import { PDFDownloadLink, Document, Page, Text, View, StyleSheet, Image, Font } from '@react-pdf/renderer';

const Invoice = () => (
  <Document>
    <Page size= {[200, 300]} style={styles.body}>
      {/* Logo */}
      {/* <Image style={styles.logo} src="/path/to/your/logo.png" /> */}

      {/* Business Information */}
      <View style={styles.businessInfo}>
        <Text style={styles.businessName}>Your Business Name</Text>
        <Text style={styles.address}>123 Street Name, City, Country</Text>
        <Text style={styles.phone}>Phone: +1234567890</Text>
      </View>

      {/* Invoice Title */}
      <Text style={styles.title}>Invoice</Text>

      {/* Item Details */}
      <View style={styles.itemContainer}>
        <Text style={styles.itemName}>Item Name</Text>
        <Text style={styles.itemQuantity}>Quantity</Text>
        <Text style={styles.itemPrice}>Price</Text>
      </View>

      {/* Example Item */}
      <View style={styles.itemContainer}>
        <Text style={styles.itemName}>Product 1</Text>
        <Text style={styles.itemQuantity}>2</Text>
        <Text style={styles.itemPrice}>$20.00</Text>
      </View>

      {/* Additional Information */}
      <Text style={styles.additionalInfo}>
        Additional information can be added here.
      </Text>
    </Page>
  </Document>
);

const AppBtn = () => (
  <div>
    {/* <PDFDownloadLink document={<Invoice />} fileName="invoice.pdf">
      {({ blob, url, loading, error }) =>
        loading ? "Loading document..." : "Download now!"
      }
    </PDFDownloadLink> */}
  </div>
);

const styles = StyleSheet.create({
    page: {
      flexDirection: 'row',
      backgroundColor: '#E4E4E4',
    },
    body: {
      padding: 5 ,
      flexGrow: 1,
    },
    logo: {
      marginBottom: 20,
      width: 50,
      height: 50,
    },
    businessInfo: {
      marginBottom: 20,
      textAlign: 'center',
    },
    businessName: {
      fontSize: 10,
      fontWeight: 'bold',
    },
    address: {
      fontSize: 8,
    },
    phone: {
      fontSize: 8,
    },
    title: {
      fontSize: 14,
      marginBottom: 10,
      textAlign: 'center',
    },
    itemContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginBottom: 3,
    },
    itemName: {
      flex: 2,
      fontSize: 8,
    },
    itemQuantity: {
      flex: 1,
      fontSize: 8,
      textAlign: 'center',
    },
    itemPrice: {
      flex: 1,
      fontSize: 8,
      textAlign: 'right',
    },
    additionalInfo: {
      fontSize: 8,
    },
  });

  

export {Invoice, AppBtn,};
