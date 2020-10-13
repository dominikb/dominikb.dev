import React, { useState } from "react"
import Cookies from 'js-cookie'
import './consent-banner.css'

const ConsentBanner = () => {

  const [
    cookieConsent,
    updateCookieConsent
  ] = useState(Cookies.get('cc'));

  const updateConsent = () => {
    [`g-analytics`, `g-tagmanager`, `cc`]
      .forEach(name => Cookies.set(name, true, { expires: 7 }))
    updateCookieConsent(true);
  }

  return (
    <div className={`consent-banner ${cookieConsent ? 'hidden' : ''}`}>
      <p className="text">This site uses cookies.</p>
      <button className="button" onClick={updateConsent}>
        Go ahead
      </button>
    </div>
  )
}

export default ConsentBanner