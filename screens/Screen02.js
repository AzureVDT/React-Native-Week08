import {
    View,
    Text,
    Image,
    TextInput,
    FlatList,
    TouchableOpacity,
    Pressable,
} from "react-native";
import React, { useEffect, useState } from "react";
import { AntDesign } from "@expo/vector-icons";
import { useDispatch, useSelector } from "react-redux";
import { setTodo, setTodoValue } from "../redux-toolkit/todoSlice";

const Screen02 = ({ route, navigation }) => {
    const username = route.params.userName;
    if (!username) return null;
    const dispatch = useDispatch();
    const todo = useSelector((state) => state.todo.todo);
    const value = useSelector((state) => state.todo.value);
    useEffect(() => {
        async function fetchNotes() {
            const res = await fetch(
                `https://65409ea745bedb25bfc230af.mockapi.io/todo?username=${username}`
            );
            const data = await res.json();
            console.log(data);
            dispatch(setTodo(data[0]));
        }
        fetchNotes();
    }, [navigation, username]);
    const handleEditTodo = async (id, todoValue) => {
        // Find the item with the specified id and update its todo value
        const updatedTodoList = todo.todoList.map((item) => {
            if (item.id === id) {
                return { ...item, todo: todoValue };
            } else {
                return item;
            }
        });

        // Send a PUT request with the updated data
        const updateRes = await fetch(
            `https://65409ea745bedb25bfc230af.mockapi.io/todo/${todo.id}`,
            {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ ...todo, todoList: updatedTodoList }),
            }
        );

        // Update the local state
        dispatch(
            setTodo({
                ...todo,
                todoList: updatedTodoList,
            })
        );
    };

    return (
        <View
            style={{ flex: 1, paddingHorizontal: 26, backgroundColor: "#fff" }}
        >
            <TextInput
                placeholder="Search"
                style={{
                    borderWidth: 1,
                    paddingHorizontal: 10,
                    paddingVertical: 10,
                    marginBottom: 100,
                }}
            />
            <View style={{ width: "100%", alignItems: "center" }}>
                <FlatList
                    style={{ width: "100%" }}
                    data={todo.todoList}
                    keyExtractor={(item) => item.id}
                    ItemSeparatorComponent={() => (
                        <View style={{ height: 20 }} />
                    )}
                    renderItem={({ item }) => (
                        <View
                            style={{
                                flexDirection: "row",
                                backgroundColor: "rgba(222, 225, 230, 0.47)",
                                paddingVertical: 10,
                                paddingHorizontal: 50,
                                borderRadius: 24,
                            }}
                        >
                            <TouchableOpacity>
                                <Image
                                    source={require("../assets/Frame (1).png")}
                                    style={{
                                        width: 24,
                                        height: 24,
                                        position: "absolute",
                                        left: -30,
                                    }}
                                />
                            </TouchableOpacity>

                            <TextInput
                                style={{
                                    color: "#171A1F",
                                    fontSize: 16,
                                    fontWeight: 700,
                                    width: "100%",
                                    paddingVertical: 1,
                                }}
                                defaultValue={item.todo}
                                onChangeText={(text) =>
                                    dispatch(setTodoValue(text))
                                }
                            />

                            <TouchableOpacity
                                onPress={() => handleEditTodo(item.id, value)}
                            >
                                <Image
                                    source={require("../assets/Frame (2).png")}
                                    style={{
                                        width: 24,
                                        height: 24,
                                        position: "absolute",
                                        right: -30,
                                    }}
                                />
                            </TouchableOpacity>
                        </View>
                    )}
                />
                <TouchableOpacity
                    style={{
                        backgroundColor: "#00BDD6",
                        width: 69,
                        height: 69,
                        borderRadius: 50,
                        justifyContent: "center",
                        alignItems: "center",
                        marginVertical: 30,
                    }}
                    onPress={() => {
                        navigation.navigate("screen03", { userName: username });
                    }}
                >
                    <AntDesign name="plus" size={30} color="#fff" />
                </TouchableOpacity>
            </View>
        </View>
    );
};

export default Screen02;
