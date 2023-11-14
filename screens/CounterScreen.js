import { Pressable, StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'

export default function CounterScreen() {
    const [count, setCount] = useState(0);
    return (
        <View>
            <Pressable >+</Pressable>
            <Text>Count: {count}</Text>
            <Pressable >-</Pressable>
        </View>
    )
}

const styles = StyleSheet.create({})