import { configureStore } from '@reduxjs/toolkit';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import categoriesReducer from './slices/categories';
import productsReducer from './slices/products';
import productReducer from './productSlice';
import cartReducer from './slices/cart';
import userReducer from './userSlice';
import authReducer from './authSlice';
import checkoutReducer from './slices/checkout';
import { categoriesService, ICategoriesService } from '../services/categories';
import { IProductsService, productsService } from '../services/products';
import { cartService, ICartService } from '../services/cart';
import { checkoutService, ICheckoutService } from '../services/checkout';

console.log('Loading Redux store...', process.env.REACT_APP_ENVIRONMENT);
export const store = configureStore({
  reducer: {
    auth: authReducer,
    categories: categoriesReducer,
    products: productsReducer,
    product: productReducer,
    cart: cartReducer,
    checkout: checkoutReducer,
    user: userReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      thunk: {
        extraArgument: {
          // repositories: {
          //   business:
          //     process.env.REACT_APP_ENVIRONMENT === 'mock'
          //       ? new MockBusinessRepository()
          //       : new FirebaseRealtimeBusinessRepository(),
          //   rides:
          //     process.env.REACT_APP_ENVIRONMENT === 'mock'
          //       ? new MockRidesRepository()
          //       : new FirebaseRealtimeRidesRepository(),
          //   scheduledRides:
          //     process.env.REACT_APP_ENVIRONMENT === 'mock'
          //       ? new MockScheduledRidesRepository()
          //       : new FirebaseRealtimeScheduledRidesRepository(),
          // },
          services: {
            categories: categoriesService,
            products: productsService,
            cart: cartService,
            checkout: checkoutService,
            //   vehicles:
            //     process.env.REACT_APP_ENVIRONMENT === 'mock' ? new MockVehiclesService() : new FirebaseVehiclesService(),
            //   geofences:
            //     process.env.REACT_APP_ENVIRONMENT === 'mock'
            //       ? new MockGeofencesService()
            //       : new FirebaseGeofencesService(),
          },
        },
      },
      serializableCheck: false,
    }), // .concat(logger),
});

export type MyKnownError = {
  errorMessage: string;
};
export type AsyncThunkConfig = {
  /** return type for `thunkApi.getState` */
  state?: RootState;
  /** type for `thunkApi.dispatch` */
  dispatch?: AppDispatch;
  /** type of the `extra` argument for the thunk middleware, which will be passed in as `thunkApi.extra` */
  extra: {
    services: {
      categories: ICategoriesService;
      products: IProductsService;
      cart: ICartService;
      checkout: ICheckoutService;
    };
  };
  /** type to be passed into `rejectWithValue`'s first argument that will end up on `rejectedAction.payload` */
  rejectValue?: MyKnownError;
  /** return type of the `serializeError` option callback */
  serializedErrorType?: unknown;
  /** type to be returned from the `getPendingMeta` option callback & merged into `pendingAction.meta` */
  pendingMeta?: unknown;
  /** type to be passed into the second argument of `fulfillWithValue` to finally be merged into `fulfilledAction.meta` */
  fulfilledMeta?: unknown;
  /** type to be passed into the second argument of `rejectWithValue` to finally be merged into `rejectedAction.meta` */
  rejectedMeta?: unknown;
};
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch = () => useDispatch<AppDispatch>(); // Export a hook that can be reused to resolve types

export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
