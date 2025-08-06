import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native'
import React from 'react'
import { Entypo, Feather, FontAwesome5, Fontisto, MaterialCommunityIcons, MaterialIcons, Octicons } from '@expo/vector-icons'
import DeliveryBoyDetails from '../../components/DeliveryBoyDetails'
import userDeliveryAuth from '../../context/authContext'
import { router } from 'expo-router'
import { log } from 'console'

export default function details() {

    const { deliveryBoyDetails } = userDeliveryAuth()

    return (
        <View style={styles.body}>
            <View style={styles.header}>
                <View style={styles.backtitle}>
                    <TouchableOpacity onPress={() => router.back()}>
                        <MaterialIcons name="keyboard-arrow-left" size={30} color="black" />
                    </TouchableOpacity>
                    <Text style={styles.text}>Details</Text>
                </View>
                <TouchableOpacity style={styles.help} onPress={() => router.push('/profile/momhelp')}>
                    <Entypo name="help-with-circle" size={27} color="#00a99d" />
                    <Text style={styles.text}>Help</Text>
                </TouchableOpacity>
            </View>

            {/* body */}
            <ScrollView style={styles.scrollView} contentContainerStyle={styles.scrollContent}>
                <View style={styles.container}>
                    <Text style={styles.heading}>Personal Details</Text>
                    <View style={styles.detailsbox}>
                        <View>
                            <DeliveryBoyDetails
                                icon={<MaterialCommunityIcons name="account-circle-outline" size={35} color="gray" />}
                                title={deliveryBoyDetails.name}
                                subtitle="Full Name"
                            />


                            <View style={styles.flexbox}>
                                <MaterialCommunityIcons style={styles.icon} name="phone-outline" size={30} color="gray" />
                                <View style={styles.rowbox}>
                                    <Text style={styles.rowheader}>{deliveryBoyDetails.mobileNumber}</Text>
                                    <Text style={styles.rowcontent}>Mobile Number</Text>
                                </View>
                                <Text style={{ color: "#00a99d", fontSize: 20 }}>Change</Text>
                            </View>

                            <DeliveryBoyDetails
                                icon={<MaterialCommunityIcons name="phone-outline" size={30} color="gray" />}
                                title="-"
                                subtitle=" Alternate Mobile Number"
                            />
                            <DeliveryBoyDetails
                                icon={<Octicons name="hash" size={30} color="gray" />}
                                title="-"
                                subtitle="Render vendor ID"
                            />
                            <DeliveryBoyDetails
                                icon={<Feather name="calendar" size={30} color="gray" />}
                                title="-"
                                subtitle="DOB"
                            />
                            <DeliveryBoyDetails
                                icon={<Octicons name="hash" size={30} color="gray" />}
                                title={deliveryBoyDetails.pancardNumber}
                                subtitle="PAN Number"
                            />
                            <DeliveryBoyDetails
                                icon={<MaterialCommunityIcons name="card-account-details-outline" size={30} color="gray" />}
                                title={deliveryBoyDetails.AadharNumber}
                                subtitle="Aadhaar Number"
                            />
                            <DeliveryBoyDetails
                                icon={<MaterialIcons name="storefront" size={30} color="gray" />}
                                title={deliveryBoyDetails.storeId}
                                subtitle="Assigned StoreId"
                            />
                            <DeliveryBoyDetails
                                icon={<MaterialCommunityIcons name="phone-outline" size={30} color="gray" />}
                                title="-"
                                subtitle="Blood group"
                            />
                        </View>

                    </View>
                </View>


                <Text style={styles.heading}>Vehicle & License Details</Text>
                <View style={styles.detailsbox}>
                    <DeliveryBoyDetails
                        icon={<Octicons name="hash" size={30} color="gray" />}
                        title="-"
                        subtitle="Vehicle Number"
                    />
                    <DeliveryBoyDetails
                        icon={<MaterialCommunityIcons name="phone-outline" size={30} color="gray" />}
                        title={deliveryBoyDetails.vehicleType}
                        subtitle="Vehicle Type"
                    />
                    <DeliveryBoyDetails
                        icon={<Octicons name="hash" size={30} color="gray" />}
                        title="-"
                        subtitle="RC Number"
                    />

                    <DeliveryBoyDetails
                        icon={<Octicons name="hash" size={30} color="gray" />}
                        title={deliveryBoyDetails.drivingLicense}
                        subtitle="License Number"
                    />

                    <DeliveryBoyDetails
                        icon={<Fontisto name="date" size={30} color="gray" />}
                        title="-"
                        subtitle="License Expiry Date"
                    />
                </View>

                <Text style={styles.heading}>Insurance Number</Text>
                <View style={styles.detailsbox}>
                    <DeliveryBoyDetails
                        icon={<Octicons name="hash" size={30} color="gray" />}
                        title="-"
                        subtitle="Insurance Number"
                    />
                    <DeliveryBoyDetails
                        icon={<MaterialIcons name="account-balance" size={30} color="gray" />}
                        title="-"
                        subtitle="Insurance Vendor"
                    />
                    <DeliveryBoyDetails
                        icon={<MaterialCommunityIcons name="account" size={30} color="gray" />}
                        title="Mohan"
                        subtitle="Nominee name"
                    />
                    <DeliveryBoyDetails
                        icon={<MaterialCommunityIcons name="account" size={30} color="gray" />}
                        title="Spouse"
                        subtitle="Relationship with Nominee"
                    />
                </View>

                <Text style={styles.heading}>Vendor details</Text>
                <View style={styles.detailsbox}>
                    <DeliveryBoyDetails
                        icon={<MaterialIcons name="account-balance" size={30} color="gray" />}
                        title="Referral"
                        subtitle="Vendor name"
                    />
                </View>

                <Text style={styles.heading}>Contract</Text>
                <View style={styles.detailsbox}>
                    <DeliveryBoyDetails
                        icon={<FontAwesome5 name="file-contract" size={30} color="gray" />}
                        title="Agreement "
                        subtitle="Tap to see agreement"
                    />
                </View>

                <View style={styles.bottomPadding} />

            </ScrollView>
        </View>
    )
}

const styles = StyleSheet.create({
    body: {
        backgroundColor: '#D0E8E6',
        flex: 1,
    },
    header: {
        backgroundColor: "#fff",
        padding: 10,
        margin: 0,
        flexDirection: 'row',
    },
    backtitle: {
        flexDirection: 'row',
        gap: 10,
        flex: 1
    },
    help: {
        flexDirection: 'row',
        gap: 10,
    },
    text: {
        fontSize: 20,
        fontWeight: 500
    },
    scrollView: {
        flex: 1,
    },
    scrollContent: {
        paddingBottom: 20,
    },
    container: {
        flex: 1,
    },
    heading: {
        color: 'gray',
        fontSize: 20,
        fontWeight: 400,
        paddingHorizontal: 18,
        paddingVertical: 10
    },
    detailsbox: {
        height: 'auto',
        padding: 25,
        backgroundColor: '#fff',
        marginHorizontal: 15,
        borderRadius: 10,
        marginBottom: 10,
    },
    flexbox: {
        flexDirection: 'row',
        gap: 20,
        marginBottom: 20

    },
    rowbox: {
        flexDirection: 'column'
    }
    ,
    rowheader: {
        fontSize: 19,
        fontWeight: 400,
        color: 'black',

    }
    ,
    rowcontent: {
        fontSize: 16,
        fontWeight: "medium",
        color: 'gray',
    },
    icon: {
        paddingVertical: 7
    },
    bottomPadding: {
        height: 50,
    }
})
