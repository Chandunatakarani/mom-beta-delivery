import React, { useEffect, useState } from 'react';
import {
    View,
    Text,
    ScrollView,
    StyleSheet,
    ActivityIndicator,
    TouchableOpacity,
    Alert
} from 'react-native';

const DeliveryBoyProfileScreen = () => {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const deliveryBoyId = '681a0e53f32e786edf2e4503';
        const fetchOrders = async () => {
            try {
                const response = await fetch(`http://18.61.201.132:3000/api/delivery/${deliveryBoyId}`);
                const data = await response.json();
                console.log(data)
                if (data.success) {
                    const confirmedOrders = data.orders.filter(order => order.status === 'confirmed');
                    setOrders(confirmedOrders);
                    
                }
            } catch (error) {
                console.error('Fetch error:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchOrders();
    }, []);

    const handleDelivery = async (orderId) => {
        try {
            const response = await fetch(`http://18.61.201.132:3000/api/${orderId}/status`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    status: 'delivered',
                  
                  })
            });

            const result = await response.json();
            console.log(result)
            if (result.success) {
                Alert.alert('Success', 'Order marked as delivered');
                setOrders(prevOrders => prevOrders.filter(order => order._id !== orderId));
            } else {
                Alert.alert('Error', result.message || 'Failed to update order status');
            }
        } catch (error) {
            console.error('Delivery update failed:', error);
            Alert.alert('Error', 'Something went wrong while updating status');
        }
    };

    if (loading) {
        return (
            <View style={styles.loadingContainer}>
                <ActivityIndicator size="large" color="#007bff" />
                <Text>Loading confirmed orders...</Text>
            </View>
        );
    }

    if (orders.length === 0) {
        return (
            <View style={styles.noDataContainer}>
                <Text style={styles.noDataText}>No confirmed orders found.</Text>
            </View>
        );
    }

    return (
        <ScrollView style={styles.container}>
            <Text style={styles.heading}>Confirmed Orders</Text>

            {orders.map((order, index) => (
                <View key={order._id} style={styles.card}>
                    <Text style={styles.orderTitle}>Order #{index + 1}</Text>
                    <Text style={styles.orderId}>Order ID: {order._id}</Text>
                    <Text>ETA: {order.ETA} mins</Text>
                    <Text>Total Amount: ₹{order.total_amount}</Text>

                    <Text style={styles.sectionTitle}>Medicines:</Text>
                    {order.medicines.map((med) => (
                        <View key={med._id} style={styles.medicine}>
                            <Text>Name: {med.name}</Text>
                            <Text>Quantity: {med.quantity}</Text>
                            <Text>Price: ₹{med.price}</Text>
                        </View>
                    ))}

                    <Text style={styles.time}>Order Time: {new Date(order.createdAt).toLocaleString()}</Text>

                    <TouchableOpacity
                        style={styles.deliveredButton}
                        onPress={() => handleDelivery(order._id)}
                    >
                        <Text style={styles.deliveredButtonText}>Mark as Delivered</Text>
                    </TouchableOpacity>
                </View>
            ))}
        </ScrollView>
    );
};

export default DeliveryBoyProfileScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 15,
        backgroundColor: '#ffffff',
    },
    heading: {
        fontSize: 22,
        fontWeight: 'bold',
        marginBottom: 15,
        textAlign: 'center',
    },
    card: {
        backgroundColor: '#f2f2f2',
        padding: 15,
        borderRadius: 10,
        marginBottom: 15,
        elevation: 3,
    },
    orderTitle: {
        fontWeight: 'bold',
        fontSize: 18,
        marginBottom: 5,
    },
    orderId: {
        fontSize: 14,
        color: '#555',
        marginBottom: 5,
    },
    sectionTitle: {
        marginTop: 10,
        fontWeight: 'bold',
        fontSize: 16,
    },
    medicine: {
        paddingLeft: 10,
        marginVertical: 3,
    },
    time: {
        marginTop: 10,
        fontStyle: 'italic',
        fontSize: 12,
    },
    deliveredButton: {
        marginTop: 15,
        backgroundColor: '#00a99d',
        paddingVertical: 10,
        borderRadius: 8,
        alignItems: 'center',
    },
    deliveredButtonText: {
        color: '#fff',
        fontWeight: 'bold',
    },
    loadingContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    noDataContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
    },
    noDataText: {
        fontSize: 16,
        color: '#888',
    },
});
