import { configureStore } from "@reduxjs/toolkit";
import facilitiesSlice from "./facilitiesSlice";
import gallerySlice from "./gallerySlice";
import ReviewsSlice from "./ReviewsSlice";
import policiesSlice from "./policiesSlice";
import profileSlice from "./profileSlice";
import authenticationSlice from "./authenticationSlice";
import roompopupSlice from "./roompopupSlice";
import paymentSlice from "./paymentSlice";
import roomDataSlice from "./roomDataSlice";
import facilitiesImageSlice from "./facilitiesImageSlice";
import galleryImageSlice from "./galleryImageSlice";


export const store = configureStore({
    reducer: {
        facilities: facilitiesSlice,
        gallery: gallerySlice,
        reviews: ReviewsSlice,
        policies: policiesSlice,
        profile: profileSlice,
        auth: authenticationSlice,
        roommodal:roompopupSlice,
        payments:paymentSlice,
        rooms:roomDataSlice,
        facilityImages:facilitiesImageSlice,
        galleryImages:galleryImageSlice
    },
});
export default store;