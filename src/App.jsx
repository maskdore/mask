// Components
import { useTranslation } from "react-i18next";
import { Header } from "./components";
import LandingPage from "./components/11-landingPage/LandingPage";
import Footer from "./components/10-Footer/Footer";

// Hooks
import { useEffect, useState } from "react";

// Small Components
// import PopUp from "./components/small-components/PopUp";

// Mui Components
import { Button } from "@mui/material";

// React Router
import { Route, Routes } from "react-router-dom";
import RefundPolicy from "./pages/refund-policy/RefundPolicy";
import ShippingPolicy from "./pages/shipping-policy/ShippingPolicy";
import TermsOfService from "./pages/terms-of-service/TermsOfService";
import ThankYou from "./pages/thank-you/ThankYou";
import PrivacyInformation from "./pages/privacy-policy/PrivacyPolicy";

function App() {
  const { t } = useTranslation();

  // For PopUP - Removed
  // const [open, setOpen] = useState(false);

  // const handleClickOpen = () => {
  //   setOpen(true);
  // };

  // const handleClose = () => {
  //   setOpen(false);
  // };

  // ========== For Open PopUP - Removed ==========
  // useEffect(() => {
  //   const timerId = setTimeout(() => {
  //     setOpen(true);
  //   }, 6000);

  //   // Clear the timeout if the component unmounts before it expires
  //   return () => clearTimeout(timerId);
  // }, []);

  // ====================================== LEt It ========================================
  const { i18n } = useTranslation();
  const [language, setLanguage] = useState("en");

  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
  };
  // ==============================================================================

  return (
    <div dir={language === "ar" ? "rtl" : "ltr"} className="app">
      <div className="announcement-bar">
        <div className="scrolling-text">
          <span style={{ letterSpacing: "2px" }}>
            {"valentines' sale: up to 30% off"}{" "}
          </span>
          <span style={{ letterSpacing: "2px" }}>
            {"valentines' sale: up to 30% off"}{" "}
          </span>
          <span style={{ letterSpacing: "2px" }}>
            {"valentines' sale: up to 30% off"}{" "}
          </span>
          <span style={{ letterSpacing: "2px" }}>
            {"valentines' sale: up to 30% off"}{" "}
          </span>
          <span style={{ letterSpacing: "2px" }}>
            {"valentines' sale: up to 30% off"}{" "}
          </span>
        </div>
      </div>
      {/* Removed popup component */}
      {/* {open && <PopUp handleClose={handleClose} open={open} />} */}
      <Header
        setLanguage={setLanguage}
        changeLanguage={changeLanguage}
        i18n={i18n}
      />
      {/* Removed get offer button */}
      {/* <Button
        sx={{ backgroundColor: "var(--black-color)", color: "white" }}
        variant="outlined"
        onClick={handleClickOpen}
        className="getOfferBtn"
      >
        {t("getoffer")}
      </Button> */}

      <Routes>
        <Route path="/DeepSleepMaskEGP" element={<LandingPage language={language} />} />
        <Route path="/DeepSleepMaskEGP/refund_policy" element={<RefundPolicy language={language} />} />
        <Route path="/DeepSleepMaskEGP/shipping_policy" element={<ShippingPolicy language={language} />} />
        <Route path="/DeepSleepMaskEGP/terms_of_service" element={<TermsOfService language={language} />} />
        <Route path="/DeepSleepMaskEGP/privacy_policy" element={<PrivacyInformation language={language} />} />
        <Route path="/DeepSleepMaskEGP/thank_you_page" element={<ThankYou language={language} />} />
      </Routes>

      

      <div className="footer-container">
        <Footer language={language} />
      </div>
    </div>
  );
}

export default App;
