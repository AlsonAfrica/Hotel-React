import React from "react";
import { useSelector, useDispatch } from 'react-redux';
import { closePoliciesPopup } from "../Redux/policiesSlice";
import "../Styles/policies.css";

const PoliciesPopup = () => {
    const dispatch = useDispatch();
    const isOpen = useSelector((state) => state.policies.isOpen);

    // Sample hotel policies
    const policies = [
        {
            title: "Cancellation Policy",
            content: "Guests can cancel their booking free of charge up to 24 hours before arrival."
        },
        {
            title: "Check-in/Check-out Policy",
            content: "Check-in time is from 3:00 PM, and check-out is by 11:00 AM."
        },
        {
            title: "Smoking Policy",
            content: "This is a non-smoking hotel. A fee will be charged for violations."
        },
        {
            title: "Pet Policy",
            content: "Pets are not allowed on the premises."
        },
        {
            title: "Payment Policy",
            content: "Full payment is required upon check-in. We accept all major credit cards."
        }
    ];

    if (!isOpen) return null;

    return (
        <div className="popup-overlay">
            <div className="popup">
                <h2>Hotel Policies</h2>
                <div className="policies-container">
                    {policies.map((policy, index) => (
                        <div key={index} className={`policy-card policy-card-${index}`}>
                            <h3>{policy.title}</h3>
                            <p>{policy.content}</p>
                        </div>
                    ))}
                </div>
                <button className="close-button" onClick={() => dispatch(closePoliciesPopup('policies'))}>&times;</button>
            </div>
        </div>
    );
};

export default PoliciesPopup;
