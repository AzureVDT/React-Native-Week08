import { View, Text, TextInput, TouchableOpacity, Image } from "react-native";
import React, { useEffect, useState } from "react";
import { AntDesign } from "@expo/vector-icons";
import { useDispatch, useSelector } from "react-redux";
import { setTodo, setTodoValue } from "../redux-toolkit/todoSlice";

const Screen03 = ({ route, navigation }) => {
    const username = route.params.userName;
    const value = useSelector((state) => state.todo.value);
    const todo = useSelector((state) => state.todo.todo);
    const dispatch = useDispatch();

    const handleAddTodo = async (newTodo) => {
        try {
            // Create a new todo item
            const newTodoItem = {
                id: `${todo.todoList.length + 1}`,
                todo: newTodo,
            };

            // Add the new todo item to the todo list
            const updatedTodoList = [...todo.todoList, newTodoItem];

            // Send a PUT request with the updated data
            const updateRes = await fetch(
                `https://65409ea745bedb25bfc230af.mockapi.io/todo/${todo.id}`,
                {
                    method: "PUT",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        ...todo,
                        todoList: updatedTodoList,
                    }),
                }
            );

            dispatch(
                setTodo({
                    ...todo,
                    todoList: updatedTodoList,
                })
            );

            if (!updateRes.ok) {
                throw new Error(`HTTP error! status: ${updateRes.status}`);
            } else {
                alert("Add todo successfully");
            }
        } catch (error) {
            console.error("An error occurred:", error);
        }
    };

    React.useLayoutEffect(() => {
        navigation.setOptions({
            headerTitle: "",
            headerRight: () => (
                <TouchableOpacity
                    style={{ marginRight: 35 }}
                    onPress={() => navigation.goBack()}
                >
                    <AntDesign name="arrowleft" size={24} color="#000" />
                </TouchableOpacity>
            ),
            headerLeft: () => (
                <View
                    style={{
                        flexDirection: "row",
                        alignItems: "center",
                        marginLeft: 35,
                    }}
                >
                    <Image
                        source={{ uri: "https://images.unsplash.com/photo-1700366232028-d64ab5f6c3a8?q=80&w=1374&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" }}
                        style={{
                            width: 50,
                            height: 50,
                            borderRadius: 25,
                            marginRight: 10,
                            backgroundColor: "#D9CBF6",
                        }}
                    />
                    <View>
                        <Text style={{ fontSize: 20, fontWeight: "bold" }}>
                            Hi {username}
                        </Text>
                        <Text style={{ opacity: 0.75, fontWeight: 700 }}>
                            Have a grate day ahead
                        </Text>
                    </View>
                </View>
            ),
        });
    }, [navigation, username]);

    return (
        <View
            style={{
                flex: 1,
                alignItems: "center",
                justifyContent: "space-around",
                backgroundColor: "#fff",
            }}
        >
            <Text style={{ fontSize: 32, fontWeight: 700 }}>ADD YOUR JOB</Text>
            <View style={{ width: "100%", paddingHorizontal: 28 }}>
                <Image
                    source={require("../assets/Frame.png")}
                    style={{
                        width: 24,
                        height: 24,
                        marginRight: 10,
                        position: "absolute",
                        left: 40,
                        top: 13,
                    }}
                />
                <TextInput
                    style={{
                        borderColor: "#000",
                        borderWidth: 1,
                        paddingVertical: 12,
                        paddingLeft: 40,
                        paddingRight: 10,
                        borderRadius: 4,
                    }}
                    placeholder="input your job"
                    onChangeText={(text) => dispatch(setTodoValue(text))}
                />
            </View>
            <TouchableOpacity
                style={{
                    backgroundColor: "#00BDD6",
                    paddingVertical: 9,
                    paddingHorizontal: 60,
                    borderRadius: 12,
                }}
                onPress={() => handleAddTodo(value)}
            >
                <Text style={{ fontSize: 16, color: "#fff" }}>FINISH</Text>
            </TouchableOpacity>
            <Image
                source={require("../assets/image.png")}
                style={{ width: 190, height: 170 }}
            />
        </View>
    );
};

export default Screen03;
