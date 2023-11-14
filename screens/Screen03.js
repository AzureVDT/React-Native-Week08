import { View, Text, TextInput, TouchableOpacity, Image } from 'react-native'
import React, { useEffect, useState } from 'react'
import { AntDesign } from '@expo/vector-icons';

const Screen03 = ({ route, navigation }) => {
    const [userName, setUser] = useState(route.params.userName)
    const [jobInput, setJobInput] = useState('');
    const [userAvatar, setUserAvatar] = useState(null);

    React.useLayoutEffect(() => {
        navigation.setOptions({
            headerTitle: '',
            headerRight: () => (
                <TouchableOpacity
                    style={{ marginRight: 35 }}
                    onPress={() => navigation.goBack()}
                >
                    <AntDesign name="arrowleft" size={24} color="#000" />
                </TouchableOpacity>
            ),
            headerLeft: () => (
                <View style={{ flexDirection: 'row', alignItems: 'center', marginLeft: 35 }}>
                    <Image
                        source={{ uri: userAvatar }}
                        style={{ width: 50, height: 50, borderRadius: 25, marginRight: 10, backgroundColor: '#D9CBF6' }}
                    />
                    <View>
                        <Text style={{ fontSize: 20, fontWeight: 'bold' }}>Hi {userName}</Text>
                        <Text style={{ opacity: 0.75, fontWeight: 700 }}>Have a grate day ahead</Text>
                    </View>
                </View>
            )
        });
    }, [navigation, userName, userAvatar]);

    useEffect(() => {
        fetch(`https://6509450bf6553137159b2327.mockapi.io/an/pro/user?userName=${userName}`)
            .then((response) => response.json())
            .then((data) => {
                if (data.length > 0) {
                    setUserAvatar(data[0].avatar);
                }
            })
            .catch((error) => {
                console.error('Error fetching avatar:', error);
            });
    }, [userName]);

    const handleFinish = async () => {
        try {
            const response = await fetch('https://6509450bf6553137159b2327.mockapi.io/an/pro/note', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ userName: userName, job: jobInput }),
            });

            if (response.ok) {
                setJobInput('');
                alert('Job added successfully!');
            } else {
                alert('Failed to add job');
            }
        } catch (error) {
            console.error('Error:', error);
        }
    };

    return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'space-around', backgroundColor: '#fff' }}>
            <Text style={{ fontSize: 32, fontWeight: 700 }}>ADD YOUR JOB</Text>
            <View style={{ width: '100%', paddingHorizontal: 28 }}>
                <Image
                    source={require('../assets/Frame.png')}
                    style={{
                        width: 24,
                        height: 24,
                        marginRight: 10,
                        position: 'absolute',
                        left: 40,
                        top: 13
                    }}
                />
                <TextInput
                    style={{
                        borderColor: '#000',
                        borderWidth: 1,
                        paddingVertical: 12,
                        paddingLeft: 40,
                        paddingRight: 10,
                        borderRadius: 4,
                    }}
                    placeholder='input your job'
                    value={jobInput}
                    onChangeText={(text) => setJobInput(text)}
                />
            </View>
            <TouchableOpacity
                style={{
                    backgroundColor: '#00BDD6',
                    paddingVertical: 9,
                    paddingHorizontal: 60,
                    borderRadius: 12
                }}
                onPress={handleFinish}
            >
                <Text style={{ fontSize: 16, color: "#fff" }}>FINISH</Text>
            </TouchableOpacity>
            <Image source={require('../assets/image.png')} style={{ width: 190, height: 170 }} />
        </View>
    )
}

export default Screen03
