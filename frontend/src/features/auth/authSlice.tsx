import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import { GetAllUserProfile, GetUserProfile, UpdateProfile, loginUser, registerUser, GetSingleUser } from './authReducer'


const userData = JSON.parse(localStorage.getItem("User") || 'false');
const userToken = localStorage.getItem("Usertoken");
// console.log(userToken)
// Define a type for the slice stat
interface authState {
  userInfo?: any,
  userDetails?: any,
  users?:any,
  token?: string,
  registerisLoading?: boolean,
  registerisSuccess?: boolean,
  registerisError?: boolean,

  loginisLoading?: boolean,
  loginisSuccess?: boolean,
  loginisError?: boolean,

  userprofileisLoading?: boolean,
  userprofileisSuccess?: boolean,
  userprofileisError?: boolean,


  updateuserprofileisLoading?: boolean,
  updateuserprofileisSuccess?: boolean,
  updateuserprofileisError?: boolean,

  alertText?: any,
  showAlert?: boolean,
  alertType?: string,


}

// Define the initial state using that type
const initialState: authState = {
  userInfo: userData ? userData : null,
  userDetails:  null,
  users: [],
  token: userToken ? userToken : "",

  registerisLoading: false,
  registerisSuccess: false,
  registerisError: false,

  loginisLoading: false,
  loginisSuccess: false,
  loginisError: false,


  userprofileisLoading: false,
  userprofileisSuccess: false,
  userprofileisError: false,

  alertText: '',
  showAlert: false,
  alertType: '',

  updateuserprofileisLoading:false,
  updateuserprofileisSuccess:false,
  updateuserprofileisError:false,


}

export const authSlice = createSlice({
  name: 'auth',
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    clearUserProfile: (state, action) => {
      state.registerisSuccess = false
      state.registerisError = false
      state.registerisLoading = false

      state.updateuserprofileisLoading = false
      state.updateuserprofileisSuccess = false
      state.updateuserprofileisError = false
    },
    ClearUserInfo: (state, action) => {
      localStorage.removeItem("Usertoken");
      localStorage.removeItem("User");
      // state.isLoading = false;
      state.alertType = "";
      state.showAlert = false;
      state.alertText = "";
    },
  },
  extraReducers: (builder) => {
    // registration build case
    builder.addCase(registerUser.pending, (state, action) => {
      state.registerisLoading = true
    })
    builder.addCase(registerUser.fulfilled, (state, action) => {
      state.registerisSuccess = true
      state.registerisLoading = false
      state.userInfo = action.payload.user
      state.token = action.payload.token
    })
    builder.addCase(registerUser.rejected, (state, action) => {
      state.registerisSuccess = false
      state.registerisError = true
      state.registerisLoading = false
      state.showAlert = true
      state.alertType = 'danger'
      state.alertText = action.payload

    })

    // registration build case
    builder.addCase(loginUser.pending, (state, action) => {
      state.loginisLoading = true
    })
    builder.addCase(loginUser.fulfilled, (state, action) => {
      state.loginisSuccess = true
      state.loginisLoading = false
      state.userInfo = action.payload.user
      state.token = action.payload.token
    })
    builder.addCase(loginUser.rejected, (state, action) => {
      state.loginisSuccess = false
      state.loginisError = true
      state.loginisLoading = false
      state.showAlert = true
      state.alertType = 'danger'
      state.alertText = action.payload

    })

    builder.addCase(UpdateProfile.pending, (state, action) => {
      state.updateuserprofileisLoading = true
    })
    builder.addCase(UpdateProfile.fulfilled, (state, action) => {
      state.updateuserprofileisSuccess = true
      state.updateuserprofileisLoading = false
      state.userDetails = action.payload
      state.alertText = 'Profile Update succesfully'
      state.showAlert = true
      state.alertType = 'success'
    })
    builder.addCase(UpdateProfile.rejected, (state, action) => {
      state.updateuserprofileisSuccess = false
      state.updateuserprofileisError = true
      state.userprofileisLoading = false
      state.showAlert = true
      state.alertType = 'danger'
      state.alertText = action.payload

    })

    builder.addCase(GetUserProfile.pending, (state, action) => {
      state.userprofileisLoading = true
    })
    builder.addCase(GetUserProfile.fulfilled, (state, action) => {
      state.userprofileisSuccess = true
      state.userprofileisLoading = false
      state.userDetails = action.payload
      
    })
    builder.addCase(GetUserProfile.rejected, (state, action) => {
      state.userprofileisSuccess = false
      state.userprofileisError = true
      state.userprofileisLoading = false
      state.showAlert = true
      state.alertType = 'danger'
      state.alertText = action.payload

    })
    // GetSingleUser

    builder.addCase(GetSingleUser.pending, (state, action) => {
      state.userprofileisLoading = true
    })
    builder.addCase(GetSingleUser.fulfilled, (state, action) => {
      state.userprofileisSuccess = true
      state.userprofileisLoading = false
      state.userDetails = action.payload

    })
    builder.addCase(GetSingleUser.rejected, (state, action) => {
      state.userprofileisSuccess = false
      state.userprofileisError = true
      state.userprofileisLoading = false
      state.showAlert = true
      state.alertType = 'danger'
      state.alertText = action.payload

    })

    builder.addCase(GetAllUserProfile.pending, (state, action) => {
      state.userprofileisLoading = true
    })
    builder.addCase(GetAllUserProfile.fulfilled, (state, action) => {
      state.userprofileisSuccess = true
      state.userprofileisLoading = false
      state.users = action.payload

    })
    builder.addCase(GetAllUserProfile.rejected, (state, action) => {
      state.userprofileisSuccess = false
      state.userprofileisError = true
      state.userprofileisLoading = false
      state.showAlert = true
      state.alertType = 'danger'
      state.alertText = action.payload

    })
  },
})

export const { clearUserProfile, ClearUserInfo } = authSlice.actions

// Other code such as selectors can use the imported `RootState` type
// export const selectCount = (state: RootState) => state.auth.value

export default authSlice.reducer