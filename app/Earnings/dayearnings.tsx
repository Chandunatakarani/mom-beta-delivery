import LoadingScreen from '../../components/LoadingScreen';
import { convertDayToName, covertMonthsToNames } from '../../Hooks/earningHooks';
import useWeekEarnings from '../../Hooks/useWeekEarnings';
import { useLocalSearchParams } from 'expo-router';
import React from 'react';
import { View, Text, StyleSheet, Image, FlatList, TouchableOpacity, SafeAreaView } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { router } from 'expo-router';

const WeekEarnings = () => {
  const { start, end } = useLocalSearchParams();
  console.log("this is earnings", start, end);

  const { weekEarnings, data, loading } = useWeekEarnings({ startingDate: start, endingDate: end });
  const AverageEarnings = weekEarnings / 7;

  if (loading) return <LoadingScreen />;

  if (!data)
    return (
      <SafeAreaView style={styles.noEarningsContainer}>
        <View style={styles.header}>
          <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
            <MaterialIcons name="arrow-back" size={24} color="#000" />
          </TouchableOpacity>
        </View>
        <View style={styles.centered}>
          <Text style={styles.noEarningText}>No Earning this week</Text>
        </View>
      </SafeAreaView>
    );

  const formatedOrders = () => {
    const { orders } = data;
    return orders.map((item) => {
      const dateObj = new Date(item.createdAt);
      return {
        date: `${convertDayToName(dateObj.getDay()).slice(0, 3)}, ${dateObj.getDate()} ${covertMonthsToNames(dateObj.getMonth())}`,
        amount: item.total_earning,
      };
    });
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <MaterialIcons name="arrow-back" size={24} color="#000" />
        </TouchableOpacity>
        <View style={styles.headerTextContainer}>
          <Text style={styles.weekText}>Weekly Earnings</Text>
          <Text style={styles.dateText}>{start} – {end}</Text>
        </View>
      </View>

      <View style={styles.earningsCard}>
        <Text style={styles.earnedText}>You’ve earned</Text>
        <Text style={styles.amount}>₹{weekEarnings ?? 0}</Text>
        <View style={styles.summaryRow}>
          <View style={styles.summaryItem}>
            <Text style={styles.label}>Orders Completed</Text>
            <Text style={styles.value}>{data.orders?.length || 0}</Text>
          </View>
          <View style={styles.summaryItem}>
            <Text style={styles.label}>Daily Average</Text>
            <Text style={styles.value}>₹{AverageEarnings.toFixed(2)}</Text>
          </View>
        </View>
        <Image
          source={require('../../assets/images/Earnings/rupee.jpeg')}
          style={styles.earnImage}
        />
      </View>

      <Text style={styles.earningsTitle}>Earnings</Text>
      <FlatList
        data={formatedOrders()}
        keyExtractor={(_, index) => index.toString()}
        contentContainerStyle={styles.earningsListContainer}
        renderItem={({ item }) => (
          <View style={styles.earningItem}>
            <Text style={styles.date}>{item.date}</Text>
            <Text style={styles.amountText}>₹{item.amount.toFixed(1)}</Text>
          </View>
        )}
      />
    </SafeAreaView>
  );
};

export default WeekEarnings;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#D5ECE9',
  },
  header: {
    padding: 16,
    paddingTop: 60,
    paddingBottom: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  backButton: {
    marginBottom: 12,
  },
  headerTextContainer: {
    marginLeft: 8,
  },
  weekText: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 2,
    color: '#333',
  },
  dateText: {
    fontSize: 14,
    color: '#666',
    marginBottom: 12,
  },
  earningsCard: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 20,
    margin: 16,
    marginTop: 8,
    position: 'relative',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 3,
  },
  earnedText: {
    fontSize: 16,
    color: '#565656',
  },
  amount: {
    color: '#BF2424',
    fontSize: 48,
    marginVertical: 8,
  },
  summaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 12,
  },
  summaryItem: {
    alignItems: 'center',
  },
  label: {
    fontSize: 14,
    color: '#565656',
  },
  value: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#000',
  },
  earnImage: {
    width: 79,
    height: 79,
    position: 'absolute',
    right: 20,
    top: 20,
  },
  earningsTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 12,
    marginBottom: 8,
    marginLeft: 16,
    color: '#565656',
  },
  earningsListContainer: {
    paddingBottom: 20,
    backgroundColor: '#fff',
    borderRadius: 20,
  },
  earningItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 14,
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  date: {
    fontSize: 16,
    fontWeight: '600',
    color: '#565656',
  },
  amountText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#424242',
  },
  noEarningsContainer: {
    flex: 1,
    backgroundColor: '#fff',
  },
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  noEarningText: {
    fontWeight: 'bold',
    fontSize: 24,
    textAlign: 'center',
    color: 'gray',
  },
});