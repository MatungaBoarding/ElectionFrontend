import React from 'react';
import { Page, Text, View, Document, StyleSheet, Image, pdf } from '@react-pdf/renderer';

const styles = StyleSheet.create({
    page: {
      backgroundColor: '#ffffff',
      padding: 0,
    },
    wrapper: {
      border: '1pt solid black',
      margin: 20,
      padding: 20,
      height: '95%',
      position: 'relative'
    },
    header: {
      alignItems: 'center',
      marginBottom: 40
    },
    title: {
      fontSize: 20,
      fontFamily: 'Helvetica-Bold',
      marginTop: 20,
      textAlign: 'center'
    },
    logo: {
      width: 80,
      height: 80
    },
    content: {
      alignItems: 'center'
    },
    imageContainer: {
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
      gap: 50,
      marginBottom: 40
    },
    photo: {
      width: 180,
      height: 180
    },
    qrCode: {
      width: 180,
      height: 180
    },
    text: {
      fontSize: 18,
      marginBottom: 12,
      textAlign: 'center',
      textTransform: 'uppercase'
    },
    footer: {
      position: 'absolute',
      bottom: 25,
      left: 0,
      right: 0,
      textAlign: 'center',
      fontSize: 10,
      color: '#666666'
    },
    signatureLine: {
      marginTop: 14,
    },
    ackText: {
      marginTop: 40,
      fontSize: 12
    },
    signatureText: {
      marginTop: 10,
      fontSize: 12
    }
  });
  
  const MyDocument = ({ data }) => (
    <Document>
      <Page size="A4" style={styles.page}>
        <View style={styles.wrapper}>
          <View style={styles.header}>
            <Image style={styles.logo} src={data.logoUrl} />
            <Text style={styles.title}>MATUNGA BOARDING ELECTION 2025</Text>
          </View>
          
          <View style={styles.content}>
            <View style={styles.imageContainer}>
              <Image style={styles.photo} src={data.photoUrl} />
              <Image style={styles.qrCode} src={data.qrCodeUrl} />
            </View>
            <Text style={styles.text}>{data.name}</Text>
            <Text style={styles.text}>{data.position}</Text>
            <Text style={styles.text}>{data.id}</Text>
            <Text style={styles.text}>{data.time}</Text>
          </View>

          {/* <View style={styles.wrapper}> */}
            <Text style={styles.ackText}>
              I, {data.name} agree and understand that surrender of this slip will entitle me to get the ballot paper from {data.location} centre. I also acknowledge that once a slip is issued to me, process is irreversible and I will not be entitled for duplicate slip either at {data.location} or any other centre
            </Text>
            <View style={styles.signatureLine}>
              <Text>______________________________</Text>
            </View>
            <View style={styles.signatureText}>
              <Text>{data.name}</Text>
            </View>
          </View>
  
          <Text style={styles.footer}>Created by: {data.agentName}  ----------  Location: {data.location} ---------- Table Id: {data.tableId}</Text>
        {/* </View> */}
      </Page>        
    </Document>
  );

// For programmatic PDF generation (e.g., from a button click)
export const generatePDF = async (data) => {
    try {
        // Create the PDF blob
        const blob = await pdf(<MyDocument data={data} />).toBlob();
        
        // Create a URL for the blob
        const url = URL.createObjectURL(blob);
        
        // Create a temporary link and trigger download
        const link = document.createElement('a');
        link.href = url;
        link.download = 'AAAAA.pdf';
        document.body.appendChild(link);
        link.click();
        
        // Clean up
        document.body.removeChild(link);
        URL.revokeObjectURL(url);
    } catch (error) {
        console.error('Error generating PDF:', error);
    }
};

// export default PDFGenerator;
