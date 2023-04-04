import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";

export const fetchTodos = createAsyncThunk(
    'todos/fetchTodos',
    async function(_, {rejectWithValue}) {
        try {
            const response = await fetch('https://jsonplaceholder.typicode.com/todos?_limit=10');
            if (!response.ok) {

                throw new Error('Server Error!');
            }
            const data = await response.json();
            return data;
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
)

export const deleteTodo = createAsyncThunk(
    'todos/deleteTodo',
    async function(id, {rejectWithValue, dispatch}) {
        try {
            const response = await fetch(`https://jsonplaceholder.typicode.com/todos/${id}`, {
                method: 'DELETE'
            });

            if (!response.ok) {
                throw new Error('delete error');
            }
            dispatch(deleteDo({id}));
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
)

export const toggleDone = createAsyncThunk(
    'todos/toggleDone',
    async function(id, {rejectWithValue, dispatch, getState}) {
        const todo = getState().todos.todos.find(todo => todo.id === id);
        try {
            const response = await fetch(`https://jsonplaceholder.typicode.com/todos/${id}`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    completed: !todo.completed
                })
            });

            if (!response.ok) {
                throw new Error('delete error');
            }
            dispatch(toggleToDoComplete({id}));
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);

export const addTodo = createAsyncThunk(
    'todos/addTodo',
    async function(text, {rejectWithValue, dispatch}) {
        try {
            const todo = {
                title: text,
                userId: 1,
                completed: false
            }
            const response = await fetch(`https://jsonplaceholder.typicode.com/todos`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(todo)
            });

            if (!response.ok) {
                throw new Error('add error');
            }
            const data = await response.json();
            dispatch(addToDo(data));
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
)

const setError = (state, action) => {
        state.status = 'rejected';
        state.error = action.payload;
};

const toDoSlice = createSlice({
    name: 'todos',
    initialState: {
        todos: [],
        status: null,
        error: null
    },
    reducers: {
        addToDo(state, action) {
            state.todos.push(action.payload);
        },
        toggleToDoComplete(state, action) {
            const toggleToDo = state.todos.find(todo => todo.id === action.payload.id);
            toggleToDo.completed = !toggleToDo.completed;
        },
        deleteDo(state, action) {
            state.todos = (state.todos.filter((todo) => todo.id !== action.payload.id))
        }
    },
    extraReducers: {
        [fetchTodos.pending] : (state, action) => {
            state.status = 'loading';
            state.error = null;

        },
        [fetchTodos.fulfilled] : (state, action) => {
            state.status = 'resolved';
            state.todos = action.payload;
        },
        [fetchTodos.rejected] : setError,
        [deleteTodo.rejected] : setError,
        [toggleDone.rejected] : setError,
        [addTodo.rejected] : setError,
    }
})

const {addToDo, toggleToDoComplete, deleteDo} = toDoSlice.actions;
export default toDoSlice.reducer;