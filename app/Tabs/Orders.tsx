import { router } from 'expo-router';
import React, { useEffect, useRef, useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  ActivityIndicator,
  StyleSheet,
  Dimensions, 
} from 'react-native'; 
import { useOrders } from '../../context/orderContext';
import { useLocation } from '../../context/locatonContext';
import { COLORS } from '../../constants/COLORS';

const screenWidth = Dimensions.get('window').width;

interface LocationCoords {
  latitude: number;
  longitude: number;
}

interface LocationContextType {
  locationCoords: LocationCoords | null;
  locationName: string;
  locationError: string | null;
  refreshLocation: () => Promise<void>;
}

const DeliveryDashboard = () => {
  const {
    orders,
    loadingOrders,
    acceptingOrderId,
    error,
    acceptOrder,
    rejectedOrderIds,
    rejectOrder,
    fetchOrders,
  } = useOrders();

  const { locationCoords } = useLocation() as LocationContextType;

  const [currentTime, setCurrentTime] = useState(new Date());
  const isInitialMount = useRef(true);

  useEffect(() => {
    if (isInitialMount.current) {
      isInitialMount.current = false;
      fetchOrders();
    }

    const fetchInterval = setInterval(fetchOrders, 5000);
    const timeInterval = setInterval(() => setCurrentTime(new Date()), 60000);

    return () => {
      clearInterval(fetchInterval);
      clearInterval(timeInterval);
    };
  }, []);

  const getTimeAgo = (timestamp: string) => {
    const time = new Date(timestamp);
    const diffMs = currentTime.getTime() - time.getTime();
    const diffMins = Math.floor(diffMs / 60000);

    if (diffMins < 1) return 'just now';
    if (diffMins === 1) return '1 minute ago';
    if (diffMins < 60) return `${diffMins} minutes ago`;

    const hours = Math.floor(diffMins / 60);
    return `${hours} hour${hours > 1 ? 's' : ''} ago`;
  };

  const getDistance = (lat1: number, lon1: number, lat2: number, lon2: number): string => {
    const toRad = (value: number) => (value * Math.PI) / 180;
    const R = 6371;

    const dLat = toRad(lat2 - lat1);
    const dLon = toRad(lon2 - lon1);

    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) *
      Math.sin(dLon / 2) * Math.sin(dLon / 2);

    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const d = R * c;
    return d.toFixed(2);
  };

  const confirmedOrders = orders
    .filter(o =>
      o.status === 'confirmed' &&
      !o.deliveryboy_id &&
      !rejectedOrderIds.includes(o._id)
    )
    .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
    .slice(0, 2);

  const handleAccept = (id: string) => {
    acceptOrder(id, () => {
      router.replace('/delivery/pickup');
    });
  };

  const renderItem = (item: any) => {
    if (item.status !== 'confirmed' || item.deliveryboy_id) return null;

    const customerLocation = item.address_id?.currentLocation;

    const distance =
      customerLocation && locationCoords
        ? getDistance(
            locationCoords.latitude,
            locationCoords.longitude,
            customerLocation.latitude,
            customerLocation.longitude
          )
        : null;

    return (
      <View key={item._id} style={styles.orderCard}>
        <Text style={styles.orderText}>Order ID: {item._id}</Text>
        <Text style={styles.orderText}>Total: ₹{item.total_amount}</Text>
        {distance && (
          <Text style={styles.orderText}>Distance: {distance} km</Text>
        )}
        <View style={styles.btns}>
          <TouchableOpacity
            style={[
              styles.button,
              acceptingOrderId === item._id && styles.acceptButtonDisabled,
            ]}
            onPress={() => handleAccept(item._id)}
            disabled={acceptingOrderId === item._id}
          >
            <Text style={styles.textBtn}>
              {acceptingOrderId === item._id ? 'Accepting...' : 'Accept Order'}
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.declineButton}
            onPress={() => rejectOrder(item._id)}
          >
            <Text style={{ color: 'black', fontWeight: '400' }}>Decline</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  const latestDeliveredOrder = orders
    .filter(order =>
      (order.status === 'delivered' || order.status === 'completed') &&
      !!order.deliveryboy_id
    )
    .sort((a, b) => {
      const timeA = new Date(a.deliveredAt || a.updatedAt || a.createdAt).getTime();
      const timeB = new Date(b.deliveredAt || b.updatedAt || b.createdAt).getTime();
      return timeB - timeA;
    })[0];

  return (
    <ScrollView style={{ backgroundColor: '#D0E8E6', marginBottom: 40 }}>
      <View style={styles.container}>
        <Text style={styles.currentText}>Current Order</Text>

        {loadingOrders && <ActivityIndicator size="large" color="#0000ff" />}
        {error && <Text style={styles.errorText}>{error}</Text>}
        {!loadingOrders && confirmedOrders.length === 0 && (
          <Text style={styles.noOrdersText}>
            No available orders at the moment.
          </Text>
        )}

        {confirmedOrders.map(renderItem)}

        <View style={styles.pastOrders}>
          <Text style={styles.pasttxt}>Past Orders</Text>
          {latestDeliveredOrder && (
            <Text style={styles.pasttxt2}>
              Last delivery {getTimeAgo(
                latestDeliveredOrder.deliveredAt ||
                latestDeliveredOrder.updatedAt ||
                latestDeliveredOrder.createdAt
              )}
            </Text>
          )}

          {/* Replace 'yourDeliveryBoyId' with the actual delivery boy's ID from context, props, or state */}
          {orders
  .filter(order =>
    (order.status === 'delivered' || order.status === 'completed') &&
    !!order.deliveryboy_id // Show all delivered orders with a deliveryboy_id
  )
  .sort((a, b) => {
    const timeA = new Date(a.deliveredAt || a.updatedAt || a.createdAt).getTime();
    const timeB = new Date(b.deliveredAt || b.updatedAt || b.createdAt).getTime();
    return timeB - timeA;
  })
  .slice(0, 4)
  .map((order) => {
    const deliveryTime = new Date(order.deliveredAt || order.updatedAt || order.createdAt);
    return (
      <React.Fragment key={order._id}>
        <View style={styles.pastCod}>
          <Text style={styles.pastDetails}>
            {deliveryTime.toLocaleTimeString('en-US', {
              hour: '2-digit',
              minute: '2-digit',
              hour12: true,
            })}
          </Text>
          <Text style={styles.pastCodetxt}>COD</Text>
        </View>
        <Text style={styles.pasttxt2}>Order ID: #{order._id}</Text>
        <View style={styles.divider} />
      </React.Fragment>
    );
  })}

        </View>
      </View>
    </ScrollView>
  );
};

export default DeliveryDashboard;

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#D0E8E6',
    flex: 1,
    padding: 5,
    marginTop: 20,
  },
  currentText: {
    fontSize: 20,
    fontWeight: '500',
    marginLeft: 20,
  },
  orderCard: {
    padding: 15,
    marginHorizontal: 20,
    marginVertical: 10,
    backgroundColor: '#f9f9f9',
    borderRadius: 8,
    elevation: 2,
  },
  orderText: {
    marginBottom: 5,
    fontSize: 16,
  },
  btns: {
    flexDirection: 'row',
    gap: '15%',
    justifyContent: 'center',
    padding: 10,
  },
  button: {
    backgroundColor: COLORS.main,
    paddingVertical: 10,
    paddingHorizontal: 25,
    borderRadius: 15,
  },
  declineButton: {
    backgroundColor: "white",
    paddingVertical: 10,
    paddingHorizontal: 25,
    borderRadius: 15,
    borderWidth: 1,
    borderColor: COLORS.main,
  },
  textBtn: {
    color: 'white',
    fontWeight: '500',
  },
  errorText: {
    color: 'red',
    marginBottom: 10,
  },
  noOrdersText: {
    fontSize: 16,
    fontStyle: 'italic',
    marginLeft: 20,
    marginTop: 10,
  },
  pastOrders: {
    backgroundColor: 'white',
    width: 395,
    marginTop: 20,
    alignSelf: 'center',
    borderRadius: 30,
    paddingHorizontal: 10,
  },
  pasttxt: {
    fontSize: 20,
    fontWeight: '500',
    marginLeft: 22,
    marginTop: 20,
  },
  pasttxt2: {
    fontSize: 15,
    fontWeight: '500',
    marginLeft: 22,
    marginTop: 7,
    color: 'grey',
  },
  pastDetails: {
    fontSize: 16,
    fontWeight: '700',
    marginLeft: 22,
    marginTop: 20,
  },
  pastCod: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingRight: 20,
  },
  pastCodetxt: {
    borderWidth: 1,
    borderColor: 'grey',
    borderRadius: 5,
    marginTop: 15,
    padding: 6,
    color: '#008080',
  },
  divider: {
    height: 1,
    backgroundColor: '#E0E0E0',
    marginVertical: 15,
    marginHorizontal: 22,
  },
  acceptButtonDisabled: {
    backgroundColor: '#00808088',
  },
});