import { createSlice } from "@reduxjs/toolkit";

const todoSlice = createSlice({
    name: "todo",
    initialState: {
        value: "",
        todo: {},
    },
    reducers: {
        setTodoValue: (state, action) => ({
            ...state,
            value: action.payload,
        }),
        setTodo: (state, action) => ({
            ...state,
            todo: action.payload,
        }),
    },
});

export const { setTodoValue, setTodo } = todoSlice.actions;
export default todoSlice.reducer;
