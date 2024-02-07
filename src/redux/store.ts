import { configureStore } from "@reduxjs/toolkit";
import todoReducer from "./features/todo/todoSlice";
import {
	persistReducer,
	FLUSH,
	REHYDRATE,
	PAUSE,
	PERSIST,
	PURGE,
	REGISTER,
} from "redux-persist";
import storage from "redux-persist/lib/storage";


const persistConfig = {
	key: "todo", //reducer name
	version: 1,
	storage,
};

//persiting our todo reducer -> that means if we refresh the page, exsisting todo will never be lost as they are persisted in  localstorage.
const persistedReducer = persistReducer(persistConfig, todoReducer);

export const store = configureStore({
	reducer: {
		todo: persistedReducer,
	},

	middleware: (getDefaultMiddleware) =>
		getDefaultMiddleware({
			serializableCheck: {
				ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
			},
		}),
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
