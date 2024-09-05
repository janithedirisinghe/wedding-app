import React from 'react'
const GoogleMap = () => {
  return (
    <div className="p-4 sm:p-6 max-w-md mx-auto bg-white rounded-lg border border-gray-200">
      <div className="iframe-container">
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d15847.58556850581!2d79.910614!3d6.7824621!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3ae2457ad82eca25%3A0x904aaafa62ba3bc8!2sParadise%20Inn%20Bolgoda!5e0!3m2!1sen!2slk!4v1725516587325!5m2!1sen!2slk"
          allowFullScreen
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        ></iframe>
      </div>
      </div>
  )
}

export default GoogleMap
