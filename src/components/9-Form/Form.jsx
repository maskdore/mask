import "./form.scss";

// Icons
import { FaShoppingCart, FaUserAlt } from "react-icons/fa";
import { FaPhoneFlip, FaLocationDot } from "react-icons/fa6";

// Hooks
import { useMemo, useState } from "react";
import { useTranslation } from "react-i18next";

// MUI Components
import Alert from "@mui/material/Alert";
import CircularProgress from "@mui/material/CircularProgress";
import AlertComponent from "../small-components/AlertComponent";

import PropTypes from "prop-types";

import {useNavigate} from "react-router-dom";

function Form({ language }) {
  // ======== Variables And States ========
  const history = useNavigate();

  // ==== For Total Price ====
  const price = 299;
  const [total, setTotal] = useState(null);
  const [offerPrice, setOfferPrice] = useState(null);
  // // Assuming you have a state variable to store the row count
  // const [rowCount, setRowCount] = useState(0);
  
  // For Translation
  const { t } = useTranslation();
  
  // ==== For Put Data ====
  const [formData, setFormData] = useState({
    Name: "",
    Phone: "",
    Address: "",
    Quantity: "",
    NameProduct: "Deep Sleep Mask",
  });
  const [selectedOption, setSelectedOption] = useState("");

  // For Submition Process
  const [showSuccessAlert, setShowSuccessAlert] = useState(false);
  const [loading, setLoading] = useState(false);

  const [validationAlert, setValidationAlert] = useState(false);
  const [showFillAlert, setShowFillAlert] = useState(false);
  

  // ================ Functions ================

  // for Radio button
  const getCircleStyles = () => {
    const baseStyles = {
      height: "20px",
      width: "20px",
      borderRadius: "50%",
      border: "3px solid var(--black-color)",
      display: "block",
      position: "absolute",
      left: "0",
      top: "0",
    };

    if (language === "ar") {
      // Adjust position for Arabic language
      baseStyles.left = "auto";
      baseStyles.right = "0";
    }

    return baseStyles;
  };

  const getPseudoElementStyles = () => {
    const baseStyles = {
      content: "''",
      height: "10px",
      width: "10px",
      backgroundColor: "var(--primary-color)",
      display: "block",
      position: "absolute",
      left: "51%",
      top: "51%",
      transform: "translate(-50%, -50%) scale(0)",
      borderRadius: "50%",
      transition: "300ms ease-in-out 0s",
    };

    if (language === "ar") {
      // Adjust position for Arabic language
      baseStyles.left = "49%";
    }

    return baseStyles;
  };

  // ==== For Selected Options ====
  const handleOptionChange = (value) => {
    setSelectedOption(value);
  };

  // ==== For change input Field ====

  const isFormValid = (currentSelectedOption) => {
    // Validate all fields except Quantity
    const isOtherFieldsValid = Object.entries(formData).every(([key, value]) => {
      if (key === 'Quantity') return true; // Skip Quantity for now
      return value.trim() !== '';
    });
  
    // Validate Quantity based on currentSelectedOption
    const isQuantityValid = currentSelectedOption !== '';
  
    return isOtherFieldsValid && isQuantityValid;
  };
  

  const handleLinkClick = () => {
    window.scrollTo(0, 0);
  };

  function handleInputChange(e) {
    const { name, value } = e.target;
    // Accept any input for phone number without validation or conversion
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  }

  // ==== For Submitions ====

  function submit(e) {
    e.preventDefault();
    console.log("submitted");
    setLoading(true);

    if (!isFormValid(selectedOption)) {
      setShowFillAlert(true);
      setTimeout(() => {
        setShowFillAlert(false);
      }, 3000);
      setLoading(false);
      return;
    }

    // Log data before submission
    console.log("Submitting data:", {
      Name: formData.Name,
      Phone: formData.Phone,
      Address: formData.Address,
      Quantity: selectedOption,
      NameProduct: formData.NameProduct
    });

    // Prepare data in SheetDB format
    const data = {
      data: [{
        Name: formData.Name,
        Phone: formData.Phone,
        Address: formData.Address,
        Quantity: selectedOption,
        NameProduct: formData.NameProduct
      }]
    };

    // Send data as JSON
    fetch("https://sheetdb.io/api/v1/10gjf6eedx0vm", {
      method: "POST",
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data)
    })
      .then((res) => res.json())
      .then((response) => {
        console.log("Response from server:", response);
        setFormData({
          Name: "",
          Phone: "",
          Address: "",
          Quantity: "",
          NameProduct: "Deep Sleep Mask",
        });
        setSelectedOption("");
        setShowSuccessAlert(true);
        setLoading(false);
        setTimeout(() => {
          setShowSuccessAlert(false);
          history('/thank_you_page');
          handleLinkClick();
        }, 1000);
      })
      .catch((error) => {
        console.log("Submission error:", error);
        setLoading(false);
      });
  }

  // ====== Reset Function =======
  // function handleReset() {
  //   // Reset the form to its initial state
  //   const formEle = document.querySelector("form");
  //   formEle.reset();

  //   // Reset the state for selectedOption
  //   setSelectedOption("");

  //   // Reset any other state values if needed
  //   setFormData({
  //     Name: "",
  //     Phone: "",
  //     Address: "",
  //     Quantity: "",
  //     NameProduct: "Deep Slack Mask",
  //   });

  // }

  // Calculate total whenever Quantity or selectedOption changes
  useMemo(() => {
    const quantity = parseFloat(formData.Quantity) || 0;
    if (!selectedOption) {
      setTotal(quantity * price);
    } else {
      setTotal(offerPrice);
    }
  }, [formData.Quantity, selectedOption]);

  const validatePhone = () => {
    // Updated regex to accept both Arabic and English numbers, with optional country code
    const phoneRegex = /^[\u0660-\u0669\u06F0-\u06F9\d\s+\-()]{8,}$/;

    if (!phoneRegex.test(formData.Phone)) {
      console.log("Invalid phone number format");
      setValidationAlert(true);
    } else {
      setValidationAlert(false);
    }
  };

  return (
    <div className="form-container">
      <div className="header">
        <FaShoppingCart /> {t("place_order_details_request")} <FaShoppingCart />
      </div>

      {/* ============ Start Form ============ */}
      <form className="form" onSubmit={(e) => submit(e)} autoComplete="off">
        {/* ==== Name Input Field ====*/}
        <div className="form-group">
          <div className="icon">
            <FaUserAlt fontSize={20} />
          </div>
          <input
            type="text"
            id="name"
            placeholder={t("name_field")}
            name="Name"
            value={formData.Name}
            onChange={(e) => handleInputChange(e)}
            autoComplete="off"
          />
        </div>

        {/* ==== Name Product Input Field ====*/}
        <div className="form-group" style={{ display: "none" }}>
          <div className="icon">
            <FaUserAlt fontSize={20} />
          </div>
          <input
            type="text"
            id="nameProduct"
            name="NameProduct"
            value={formData.NameProduct}
            placeholder={"Deep Sleep Mask"}
            onChange={(e) => handleInputChange(e)}
            autoComplete="off"
          />
        </div>

        {/* ==== Phone Input Field ====*/}
        <div className="form-group">
          <div className="icon">
            <FaPhoneFlip fontSize={20} />
          </div>
          <input
            type="text"
            id="phone"
            placeholder={t("phone_number_field")}
            name="Phone"
            value={formData.Phone}
            onChange={(e) => {
              handleInputChange(e);
              validatePhone();
            }}
            autoComplete="off"
          />
          {validationAlert && (
            <AlertComponent type={"error"} message={"Number is Not Valid"} />
          )}
        </div>

        {/* ==== Address Input Field ====*/}

        <div className="form-group">
          <div className="icon">
            <FaLocationDot fontSize={20} />
          </div>
          <input
            type="text"
            id="address"
            placeholder={t("address_field")}
            name="Address"
            value={formData.Address}
            onChange={(e) => handleInputChange(e)}
            autoComplete="off"
          />
        </div>

        {/* ==== Quantity Input Field ====*/}

        <div className="form-group" style={{ display: "none" }}>
          <div className="icon">
            <FaShoppingCart fontSize={20} />
          </div>
          <input
            type="number"
            id="quantity"
            placeholder={t("number_of_pieces_field")}
            name="Quantity"
            value={formData.Quantity}
            disabled
            onChange={(e) => handleInputChange(e)}
          />
        </div>

        {/* ====== Start Selection Options ====== */}
        <div className="form-group spans">
          {/* ======= First Option ======= */}
          <label htmlFor="onePiece" className="custom-radio-label">
            <input
              id="onePiece"
              type="radio"
              name="Quantity"
              value="1 Piece for 299 EGP"
              checked={selectedOption === "1 Piece for 299 EGP"}
              onChange={() => {
                handleOptionChange("1 Piece for 299 EGP");
                setTotal(299);
                setOfferPrice(299);
              }}
              className="custom-radio-input"
              autoComplete="off"
            />
            <span>{t("price_and_delivery_info")}</span>
            <div className="circle" style={getCircleStyles()}>
              {/* Pseudo-element */}
              <div
                className="pseudo-element"
                style={getPseudoElementStyles()}
              ></div>
            </div>
          </label>

          {/* ======= Second Option ======= */}
          <label htmlFor="twoPiece" className="custom-radio-label">
            <input
              id="twoPiece"
              type="radio"
              name="Quantity"
              value="2 Piece for 499 EGP"
              checked={selectedOption === "2 Piece for 499 EGP"}
              onChange={() => {
                handleOptionChange("2 Piece for 499 EGP");
                setTotal(499);
                setOfferPrice(499);
              }}
              className="custom-radio-input"
              autoComplete="off"
            />
            <span>{t("price_and_delivery_infoTwo")}</span>
            <div className="circle" style={getCircleStyles()}>
              {/* Pseudo-element */}
              <div
                className="pseudo-element"
                style={getPseudoElementStyles()}
              ></div>
            </div>
          </label>

          {/* ======= Third Option ======= */}
          <label htmlFor="threePiece" className="custom-radio-label">
            <input
              id="threePiece"
              type="radio"
              name="Quantity"
              value="3 Piece for 599 EGP"
              checked={selectedOption === "3 Piece for 599 EGP"}
              onChange={() => {
                handleOptionChange("3 Piece for 599 EGP");
                setTotal(599);
                setOfferPrice(599);
              }}
              className="custom-radio-input"
              autoComplete="off"
            />
            <span>{t("price_and_delivery_infoThree")}</span>
            <div className="circle" style={getCircleStyles()}>
              {/* Pseudo-element */}
              <div
                className="pseudo-element"
                style={getPseudoElementStyles()}
              ></div>
            </div>
          </label>

          {/* ======= Calc Total ======= */}
          <div className="total">
            {t("total_title")}: {total} {t("EGP")}
          </div>
        </div>
        {/* ====== End Selection Options ====== */}
        {/* ========================================================================================================== */}
        {/* ====== Start Buttons Area ====== */}
        <div className="submit-area">
          <button
            type="submit"
            className={`submit-button ${loading ? "loading" : ""}`}
            disabled={loading}
          >
            {loading ? (
              <CircularProgress color="inherit" size={20} />
            ) : (
              `${t("send_button")}`
            )}
          </button>
          {/* <button type="reset" className="reset-button" onClick={handleReset}>
            {t("reset_button")}
          </button> */}
        </div>
      </form>
      {/* ============ End Form ============ */}

      {/* ============ Start Successfull Showing Alert ============ */}

      {showSuccessAlert && (
        <Alert className="alert" severity="success">
          {t("form_submission_success")}
        </Alert>
      )}
      {/* ============ End Successfull Showing Alert ============ */}
      {showFillAlert && (
        <AlertComponent type="error" message={t("PleaseFillInputs")} />
      )}
    </div>
  );
}

export default Form;

Form.propTypes = {
  language: PropTypes.string,
};
