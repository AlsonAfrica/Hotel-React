import React from "react";
import { useSelector, useDispatch } from 'react-redux';
import { closePoliciesPopup } from "../Redux/policiesSlice";
import "../Styles/policies.css"

const PoliciesPopup = ()=>{
    const dispatch = useDispatch();
    const isOpen = useSelector((state) => state.policies.isOpen)

    if (!isOpen) return null;

    return (
        <div className="popup-overlay">
        <div className="popup">
        <h2>Messages</h2>
        <p>This is your Policies.. information</p>
        <button onClick={() => dispatch(closePoliciesPopup('policies'))}>Close</button>
        </div>
      </div>
    );
}
export default PoliciesPopup