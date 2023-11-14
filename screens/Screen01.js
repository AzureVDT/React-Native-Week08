import { View, Text, Image, TextInput, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'

const Screen01 = ({ route, navigation }) => {
    const [userName, setuserName] = useState('AzureVDT')
    return (
        <View style={{ flex: 1, justifyContent: 'space-around', alignItems: 'center', paddingHorizontal: 28, backgroundColor: "#fff" }}>
            <Image
                source={require('../assets/image.png')}
                style={{
                    width: 243,
                    height: 243
                }}
            />
            <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                <Text style={{
                    color: '#8353E2',
                    fontSize: 24,
                    fontWeight: '700'
                }}>MANAGE YOUR</Text>
                <Text style={{
                    color: '#8353E2',
                    fontSize: 24,
                    fontWeight: '700'
                }}>TASK</Text>
            </View>


            <TextInput
                style={{ borderWidth: 1, width: '100%', borderRadius: 4, paddingVertical: 9, paddingHorizontal: 16 }}
                placeholder='Enter your name'
                value={userName}
                onChangeText={setuserName} />
            <TouchableOpacity
                style={{
                    paddingVertical: 9,
                    paddingHorizontal: 30,
                    backgroundColor: '#00BDD6',
                    borderRadius: 12
                }}
                onPress={() => { navigation.navigate('screen02', { userName: userName }) }}
            >
                <Text style={{ fontSize: 16, color: '#fff' }}>GET STARTED</Text>
            </TouchableOpacity>
        </View >
    )
}

export default Screen01
