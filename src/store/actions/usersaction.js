import { createAsyncThunk } from "@reduxjs/toolkit";                  //async function perform
import axios from "axios";
//import Users from "../../components/users";

export const getUsers = createAsyncThunk('users', async () => {                     //createAsyncThunk take two args name and callback function
   const response = await axios?.get('https://jsonplaceholder.typicode.com/comments')
   return response.data.map(v => ({ ...v, company: "extern lab" }))
});


