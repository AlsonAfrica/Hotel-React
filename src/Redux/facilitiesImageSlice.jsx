import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getStorage, ref, listAll, getDownloadURL } from 'firebase/storage';


// Asynch Thunk to create asynchronous action that interact with firebase storage
export const fetchFacilityImages = createAsyncThunk(
    // Name of the action to fetch images
  'facilityImages/fetchImages',
  async (_, { rejectWithValue }) => {
    try {
      console.log("Starting to fetch facility images");
    //   initialize reference to fetch images from storage folder in firebase
      const storage = getStorage();
      const imagesRef = ref(storage, 'Facilities/');
      console.log("Storage reference created:", imagesRef);
      console.log(imagesRef);
    //   Scans and goes through all the items within the Facilities folder in the Storage
      const result = await listAll(imagesRef);
      console.log("listAll result:", result);
      
    //   checks and returns the results if the number there any items within the foldder orsimply checks the items within the foldder
      if (result.items.length === 0) {
        console.log("No items found in the facilities folder");
        return [];
      }
      
    //   loops through each and every items and checks for the image urls 
      const imageUrls = await Promise.all(
        result.items.map(async (itemRef) => {
          try {
            const url = await getDownloadURL(itemRef);
            console.log(`URL fetched for ${itemRef.name}:`, url);
            return { name: itemRef.name, url };
          } catch (error) {
            console.error(`Error fetching URL for ${itemRef.name}:`, error);
            return null;
          }
        })
      );
// Checks for validd url and and error handddling
      const validImageUrls = imageUrls.filter(item => item !== null);
      console.log("Valid image URLs:", validImageUrls);
      return validImageUrls;
    } catch (error) {
      console.error("Error in fetchFacilityImages:", error);
      return rejectWithValue(error.message);
    }
  }
);

const facilityImagesSlice = createSlice({
// Initially images will store image urls, status is idle meaning no request has been made andd error to catch errors later on
    name: 'facilityImages',
  initialState: {
    images: [],
    status: 'idle',
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchFacilityImages.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchFacilityImages.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.images = action.payload;
        console.log("State updated with images:", state.images);
      })
      .addCase(fetchFacilityImages.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
        console.error("Fetch rejected:", action.payload);
      });
  },
});

export default facilityImagesSlice.reducer;