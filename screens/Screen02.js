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
    const [searchValue, setSearchValue] = useState("");
    React.useLayoutEffect(() => {
        navigation.setOptions({
            headerTitle: "",
            headerRight: () => (
                <View
                    style={{
                        flexDirection: "row",
                        alignItems: "center",
                        marginRight: 30,
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
            headerLeft: () => (
                <TouchableOpacity
                style={{marginLeft: 35}}
                onPress={() => navigation.goBack()}
            >
                <AntDesign name="arrowleft" size={24} color="#000" />
            </TouchableOpacity>
            ),
        });
    }, [navigation, username]);
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
    const handleSearchTodo = (text) => {
        if(text !== "") {
            const updateTodoList = todo.todoList.filter((item) =>
            item.todo.includes(text)
            );
            dispatch(
                setTodo({
                    ...todo,
                    todoList: updateTodoList,
                })
            );
        } else {
            async function fetchNotes() {
                const res = await fetch(
                    `https://65409ea745bedb25bfc230af.mockapi.io/todo?username=${username}`
                );
                const data = await res.json();
                console.log(data);
                dispatch(setTodo({
                    ...todo,
                    todoList: data[0].todoList,
                }));
            }
            fetchNotes();
        }
    };
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
        alert("Edit successfully");
    };
    const handleRemoveTodo = async (id) => {
        const updateTodoList = todo.todoList.filter((item) => item.id !== id);
        const updateRes = await fetch(
            `https://65409ea745bedb25bfc230af.mockapi.io/todo/${todo.id}`,
            {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ ...todo, todoList: updateTodoList }),
            }
        )

        dispatch(setTodo({
            ...todo,
            todoList: updateTodoList,
        }));
        alert("Delete successfully");
    }

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
                onChangeText={(text) => handleSearchTodo(text)}
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
                                        right: 30,
                                    }}
                                />
                            </TouchableOpacity>
                            <TouchableOpacity
                                onPress={() => handleRemoveTodo(item.id)}
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" style={{width: 24, height: 24, 
                                    position: "absolute",
                                    right: 0,
                                    top: 0,
                                    }}>
                                <path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
                                </svg>

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
