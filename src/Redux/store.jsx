import { configureStore } from "@reduxjs/toolkit";
import facilitiesSlice from "./facilitiesSlice";
import gallerySlice from "./gallerySlice";
import ReviewsSlice from "./ReviewsSlice";
import policiesSlice from "./policiesSlice";
import profileSlice from "./profileSlice";
import authenticationSlice from "./authenticationSlice";
import roompopupSlice from "./roompopupSlice";




export const store = configureStore({
    reducer: {
        facilities: facilitiesSlice,
        gallery: gallerySlice,
        reviews: ReviewsSlice,
        policies: policiesSlice,
        profile: profileSlice,
        auth: authenticationSlice,
        roommodal:roompopupSlice
    },
});
export default store;