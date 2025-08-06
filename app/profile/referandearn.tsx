import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Share,
  Alert,
  Image
} from 'react-native';
// import * as Clipboard from 'expo-clipboard';
import * as Linking from 'expo-linking';
import { MaterialIcons } from '@expo/vector-icons';
import { router } from 'expo-router';

const generateReferralCode = () => {
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  let code = '';
  for (let i = 0; i < 6; i++) {
    code += characters.charAt(Math.floor(Math.random() * characters.length));
  }
  return code;
};

const ReferralScreen = () => {
  const [referralCode, setReferralCode] = useState('');
  const [referralLink, setReferralLink] = useState('');

  useEffect(() => {
    const code = generateReferralCode();
    setReferralCode(code);
    const link = Linking.createURL(`signup?ref=${code}`);
    setReferralLink(link);
  }, []);

  const shareReferral = async () => {
    const newCode = generateReferralCode();
    const newLink = Linking.createURL(`signup?ref=${newCode}`);
    setReferralCode(newCode);
    setReferralLink(newLink);

    try {
      await Share.share({
        message: `Join me on this awesome app! Use my referral link: ${newLink}`,
      });
    } catch (error) {
      Alert.alert('Error', 'Could not share referral link');
    }
  };

  return (
    <View style={styles.screen}>
      <View style={styles.header}>
      <MaterialIcons name="arrow-back" size={24} color="#fff" style={styles.MaterialIcons} onPress={()=>router.back()} />
        <Text style={styles.headerTitle1}>Refer & Earn</Text>
        <Image
          source={require('../../assets/images/Profile/refer&earn.png')} style={styles.image}/>
        <Text style={styles.headerTitle}>
          Invite your friends and earn up to 1500rs/ friend
        </Text>
        <Text style={styles.subHeader}>
          You can now refer friends to other stores
        </Text>
      </View>

      <View style={styles.earningsContainer}>
        <View style={styles.card}>
          <Text style={styles.cardLabel}>Life time earnings</Text>
          <Text style={styles.cardValue}>₹ 0</Text>
        </View>
        <View style={styles.card}>
          <Text style={styles.cardLabel}>Referrals</Text>
          <Text style={styles.cardValue}>0</Text>
        </View>
      </View>

      <View style={styles.howItWorks}>
        <Text style={styles.howTitle}>How refer & earn works?</Text>
        <View style={styles.stepRow}>
          <Text style={styles.stepNumber}>1</Text>
          <Text style={styles.stepText}>Enter your friends details</Text>
        </View>
        <View style={styles.stepRow}>
          <Text style={styles.stepNumber}>2</Text>
          <Text style={styles.stepText}>Complete the target</Text>
        </View>
        <View style={styles.stepRow}>
          <Text style={styles.stepNumber}>3</Text>
          <Text style={styles.stepText}>Enjoy the bonus</Text>
        </View>
      </View>

      <View style={styles.footer}>
        <Text style={styles.footerLabel}>Your referral code</Text>
        <View style={styles.referralRow}>
          <Text style={styles.referralCode}>{referralCode}</Text>
          <TouchableOpacity style={styles.referButton} onPress={shareReferral}>
            <Image source={require('../../assets/images/Profile/share.png')} style={styles.copyBox} />
            <Text style={styles.referButtonText}>Refer</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: '#D8F0F0',
    padding: 16,
  },
  header: {
    backgroundColor: '#12bc95',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    padding: 60,
    marginHorizontal: -16,
    marginTop: -20,
  },
  headerTitle: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    marginTop: -100,
    marginLeft: 60
  },
  subHeader: {
    color: '#D5EAD9',
    fontSize: 12,
    marginLeft: 60
  },
  earningsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 16,
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    flex: 1,
    alignItems: 'center',
    marginHorizontal: 4,
  },
  cardLabel: {
    fontSize: 14,
    color: '#555',
  },
  cardValue: {
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 8,
  },
  howItWorks: {
    marginTop: 20,
    backgroundColor: '#CDEBEB',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#B0D9D9',
    padding: 28,
  },
  howTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 12,
  },
  stepRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  stepNumber: {
    width: 24,
    height: 24,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#009688',
    color: '#009688',
    textAlign: 'center',
    textAlignVertical: 'center',
    marginRight: 10,
  },
  stepText: {
    fontSize: 14,
    color: '#555',
  },
  footer: {
    marginTop: 140,
    paddingTop: 10,
    borderTopWidth: 1,
    borderColor: '#A0C4C4',
  },
  footerLabel: {
    fontSize: 14,
    color: '#000',
  },
  referralRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 8,
  },
  referralCode: {
    fontSize: 20,
    fontWeight: 'bold',
    marginRight: 8,
  },
  copyBox: {
    width: 20,
    height: 20,
    borderRadius: 4,
    marginRight: 12,
    marginLeft: -10,
  },
  referButton: {
    backgroundColor: '#00796B',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 12,
  },
  referButtonText: {
    color: '#fff',
    fontSize: 16,
    marginTop : -20,
    marginLeft: 20
  },
  image: {
    width: '50%',
    height: 170,
    marginLeft: -60,
    marginBottom: -60,
    marginTop: 15

  },
  MaterialIcons: {
    marginLeft: -35,
    marginTop: -35,

  },
  headerTitle1: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: -25
  }
});

export default ReferralScreen;