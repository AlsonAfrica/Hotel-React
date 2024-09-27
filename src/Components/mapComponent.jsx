import React from "react";

const MapComponent = () => {
  return (
    <div style={{ width: '370px', height: '270px' }}>
      <iframe
        title="Google Maps"
        width="100%"
        height="100%"
        frameBorder="0"
        style={{ border: 0 }}
        src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d14374.652174096427!2d28.2686481!3d-25.7486544!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x1e9560451d408f9d%3A0xb180e978338dcefd!2smLab%20Southern%20Africa!5e0!3m2!1sen!2sza!4v1725365316739!5m2!1sen!2sza"
        allowFullScreen
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
      ></iframe>
    </div>
  );
};

export default MapComponent;
