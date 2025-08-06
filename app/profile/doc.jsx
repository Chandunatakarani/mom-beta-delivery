
import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Help from '../../components/help/Help';

const DocumentsScreen = ({ navigation }) => {
  return (
    <ScrollView style={styles.container}>
      
   
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={24} color="black" />
        </TouchableOpacity>
        <Text style={styles.headerText}>Documents</Text>
        <Help />
      </View>

   
      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Documents</Text>
          <TouchableOpacity>
            <Text style={styles.changeText}>Change</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.card}>
          <Image source={require('../../assets/images/aadhar.png')} style={styles.icon1} />
          <View style={styles.cardContent}>
            <Text style={styles.cardTitle}>420039984738</Text>
            <Text style={styles.cardSubtitle}>Aadhar Card</Text>
          </View>
          <Image source={require('../../assets/images/download.png')} />
        </View>

        <View style={styles.card}>
          <Image source={require('../../assets/images/pan.png')} style={styles.icon3} />
          <View style={styles.cardContent}>
            <Text style={styles.cardTitle}>CCITY44QN</Text>
            <Text style={styles.cardSubtitle}>PAN Card</Text>
          </View>
          <Image source={require('../../assets/images/download.png')} style={styles.icon4} />
        </View>

        <View style={styles.card}>
          <Image source={require('../../assets/images/license.png')} style={styles.icon5} />
          <View style={styles.cardContent}>
            <Text style={styles.cardTitle}>GITY23784WE1234SD</Text>
            <Text style={styles.cardSubtitle}>Driving License</Text>
          </View>
          <Image source={require('../../assets/images/download.png')} style={styles.icon6} />
        </View>
      </View>

    
      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Bank Account Details</Text>
          <TouchableOpacity>
            <Text style={styles.changeText}>Change</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.cardColumn}>
          <View style={styles.bankRow}>
            <Image source={require('../../assets/images/profile.png')} />
            <View style={styles.cardContent}>
              <Text style={styles.cardTitle}>SINGHPURAM VEJAT</Text>
              <Text style={styles.cardSubtitle}>Account Holder</Text>
            </View>
          </View>
          <View style={styles.separator} />
          <View style={styles.bankRow}>
            <Image source={require('../../assets/images/accountno.png')} style={styles.icon8} />
            <View style={styles.cardContent}>
              <Text style={styles.cardTitle}>0923987236937</Text>
              <Text style={styles.cardSubtitle}>Account Number</Text>
            </View>
          </View>
          <View style={styles.separator} />
          <View style={styles.bankRow}>
            <Image source={require('../../assets/images/bankname.png')} style={styles.icon9} />
            <View style={styles.cardContent}>
              <Text style={styles.cardTitle}>-</Text>
              <Text style={styles.cardSubtitle}>Bank Name</Text>
            </View>
          </View>r
          <View style={styles.separator} />
          <View style={styles.bankRow}>
            <Image source={require('../../assets/images/pan.png')} style={styles.icon10} />
            <View style={styles.cardContent}>
              <Text style={styles.cardTitle}>UCBA22042</Text>
              <Text style={styles.cardSubtitle}>IFSC Code</Text>
            </View>
          </View>
        </View>
      </View>
    </ScrollView>
  );
};

export default DocumentsScreen;

const styles = StyleSheet.create({
  container: {
    flex:1,
    backgroundColor: '#e6f2ef',
    paddingHorizontal: 16,
    paddingTop: 40,
  },
  header: {
    flexDirection:'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 20,
    alignSelf:'flex-start',
  },
  headerText: {
    fontSize: 20,
    fontWeight: 'bold',
    marginLeft:'10',
  },
  section: {
    marginBottom: 30,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  changeText: {
    color: '#00796B',
    fontWeight: 'bold',
  },
  card: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 14,
    alignItems: 'center',
    marginBottom: 12,
    elevation: 2,
  },
  cardColumn: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 10,
    elevation: 2,
  },
  bankRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
  },
  separator: {
    height: 1,
    backgroundColor: '#ccc',
    marginHorizontal: 10,
  },
  cardContent: {
    flex: 1,
    marginLeft: 10,
  },
  cardTitle: {
    fontWeight: 'bold',
    fontSize: 15,
  },
  cardSubtitle: {
    fontSize: 13,
    color: '#666',
  },
 
});