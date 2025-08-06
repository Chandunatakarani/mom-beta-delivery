import userDeliveryAuth from '../../context/authContext';
import {  MaterialIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import * as Notifications from 'expo-notifications';
import { useRouter } from 'expo-router';
import React, { useEffect, useRef, useState } from 'react';
import {
  Alert,
  Linking,
  StyleSheet,
  Switch,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function SettingsScreen() {
  const navigation = useNavigation();
  const router = useRouter();


  const [notificationsEnabled, setNotificationsEnabled] = useState(false);
  const [remindersEnabled, setRemindersEnabled] = useState(false);
  const [darkTheme, setDarkTheme] = useState(false);

  const hasCheckedPermissions = useRef(false);
  const{DeleteDeliveryBoy,deliveryBoyDetails,token}=userDeliveryAuth();
  // console.log(deliveryBoyDetails._id);
  // console.log(token);

  
  

  useEffect(() => {
    if (!hasCheckedPermissions.current) {
      checkNotificationPermissions();
      hasCheckedPermissions.current = true;
    }
  }, []);

  const checkNotificationPermissions = async () => {
    const { status: existingStatus } = await Notifications.getPermissionsAsync();
    const isGranted = existingStatus === 'granted';
    if (notificationsEnabled !== isGranted) {
      setNotificationsEnabled(isGranted);
    }
  };

  const requestNotificationPermission = async (enable: boolean) => {
    setNotificationsEnabled(enable);

    Alert.alert(
      enable ? 'Enable Notifications' : 'Disable Notifications',
      `To ${enable ? 'receive' : 'stop'} notifications, please ${
        enable ? 'enable' : 'disable'
      } them manually in your device settings.`,
      [
        { text: 'Cancel', style: 'cancel' },
        { text: 'Open Settings', onPress: () => Linking.openSettings() },
      ]
    );
  };

  const handleNotificationsToggle = (newValue: boolean) => {
    requestNotificationPermission(newValue);
  };
  async function  deletefun(){
       await  DeleteDeliveryBoy(deliveryBoyDetails._id,token)
   Alert.alert('DeleteAccount', 'You have been deleted  successfully.');
  }

  const handleDelete = async () => {
    // await DeleteAccount();
    Alert.alert('Deleting Account','Are you sure you want to delete the account',
      [{
        text:"Cancel",
        style:"cancel"
      },{
      text:'Ok',
      onPress:()=>deletefun(),
      }
    ]
    )
  };

  const handleBack = () => {
    if (navigation.canGoBack()) {
      navigation.goBack();
    } else {
      router.back();
    }
  };

  return (
    <SafeAreaView style={styles.screen}>
      <View style={[styles.container, { backgroundColor: darkTheme ? '#1e1e1e' : '#fff' }]}>
        <View style={styles.headerRow}>
        <MaterialIcons name="arrow-back" size={30} color="#00A99D" style={styles.MaterialIcons} onPress={()=>router.back()} />

          <Text style={styles.header}>Settings</Text>
        </View>

        <View style={styles.settingItem}>
          <Text style={[styles.label, { color: darkTheme ? '#fff' : '#000' }]}>
            Enable Notifications
          </Text>
          <Switch
            value={notificationsEnabled}
            onValueChange={handleNotificationsToggle}
            thumbColor={notificationsEnabled ? '#ffffff' : '#ffffff'}
            trackColor={{ false: '#ccc', true: '#00856F' }}
          />
        </View>

        <View style={styles.settingItem}>
          <Text style={[styles.label, { color: darkTheme ? '#fff' : '#000' }]}>
            Daily Reminders
          </Text>
          <Switch
            value={remindersEnabled}
            onValueChange={setRemindersEnabled}
            thumbColor={remindersEnabled ? '#ffffff' : '#ffffff'}
            trackColor={{ false: '#ccc', true: '#00856F' }}
          />
        </View>

        <TouchableOpacity style={styles.DeleteButton} onPress={handleDelete}>
          <Text style={styles.DeleteText}>Delete Account</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    // marginHorizontal: 3,
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    marginVertical: 10,
    gap: 10,
    alignItems:'flex-start',
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#00A99D',

  },
  
  settingItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: 15,
    marginHorizontal: 12,
  },
  label: {
    fontSize: 16,
    fontWeight: '500',
  },
  DeleteButton: {
    backgroundColor: '#FF6666',
    marginHorizontal: 20,
    marginTop: 20,
    borderRadius: 30,
    paddingVertical: 12,
    alignItems: 'center',
    borderWidth: 0.1,
    // borderColor: '#FF6666'
  },
  DeleteText: {
    color: 'black',
    fontSize: 16,
    fontWeight: '800',
    // marginRight: -10
    paddingHorizontal: 10,
  },
  screen: {
    flex: 1,
    backgroundColor: '#fff',
  },
  MaterialIcons:{
    marginRight: 5
  }
});

function DeleteAccount() {
  throw new Error('Function not implemented.');
}