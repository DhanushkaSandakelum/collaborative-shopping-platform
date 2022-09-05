import React from "react";
import { useState, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";

import {
  CCol,
  CCard,
  CCardBody,
  CCardTitle,
  CCardHeader,
  CForm,
  CFormInput,
  CRow,
  CButton,
  CSpinner,
} from "@coreui/react";

import { toast } from "react-toastify";

import { v_required } from "../../utils/validator";

import userService from "../../services/userService";
import itemService from "../../services/itemService";
import paymentService from "../../services/paymentService";

function Payment() {
  // Request params
  const [searchParams, setSearchParams] = useSearchParams();

  // For the server side requests and responses
  const [loading, setLoading] = useState(false);
  let navigate = useNavigate();

  // Payment data
  const [payment, setPayment] = useState({
    userId: searchParams.get("userId"),
    itemId: searchParams.get("itemId"),
    payment: "",
  });

  // Form data
  const [paymentForm, setPaymentForm] = useState({
    number: "",
    cvv: "",
    expDate: "",
  });

  // Form data
  const [item, setItem] = useState({
    id: "",
    name: "",
    description: "",
    amount: "",
    price: "",

    userId: "",
    username: "",
    firstName: "",
    lastName: "",
  });

  useEffect(() => {
    fetchItemData(searchParams.get("itemId"));
  }, []);

  const fetchItemData = (itemId) => {
    console.log("called");
    setLoading(true);

    itemService.getItem(itemId).then(
      (res) => {
        if (res.type === "OK") {
          // Settings table data from fetched data
          setItem(res.payload);
          console.log(res.payload);
        } else if (res.type === "BAD") {
          toast.error(res.message);
        }

        setLoading(false);
      },
      (error) => {
        const res =
          (error.response &&
            error.response.data &&
            error.response.data.message) ||
          error.message ||
          error.toString();

        // After recieving the server request
        toast.error(res);
        setLoading(false);
      }
    );
  };

  // Update the form data while input
  const onUpdateInput = (e) => {
    setPaymentForm((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  // For data errors
  const [paymentFormErrors, setPaymentFormErrors] = useState({
    numberError: "",
    cvvError: "",
    expDateError: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    let numberError = "";
    let cvvError = "";
    let expDateError = "";

    if (!v_required(paymentForm.number)) {
      numberError = "Card number can not be empty.";
    }

    if (!v_required(paymentForm.cvv)) {
      cvvError = "CVV can not be empty.";
    }

    if (!v_required(paymentForm.expDate)) {
      expDateError = "Expiry Date can not be empty.";
    }

    // If errors exist, show errors
    setPaymentFormErrors({
      numberError,
      cvvError,
      expDateError,
    });

    // If no errors exist, send to the server
    if (!(numberError || cvvError || expDateError)) {
      // Sending to the server
      setLoading(true);

      const payload = {
        userId: searchParams.get("userId"),
        itemId: searchParams.get("itemId"),
        payment: item.amount * item.price,
      };

      paymentService.createPayment(payload).then(
        (res) => {
          if (res.type === "OK") {
            toast.success(res.message);
            navigate("/buyer");
          } else if (res.type === "BAD") {
            toast.error(res.message);
          }

          setLoading(false);
        },
        (error) => {
          const res =
            (error.response &&
              error.response.data &&
              error.response.data.message) ||
            error.message ||
            error.toString();

          // After recieving the server request
          toast.error(res);
          setLoading(false);
        }
      );
    }
  };

  return (
    <div>
      <CCard className="w-75 mx-auto">
        <CCardHeader>
          <CCardTitle>Payment Gateway</CCardTitle>
        </CCardHeader>
        <CCardBody>
          <CRow>
            <CCol md={8}>
              <CForm className="row g-3">
                <CCol md={12}>
                  <CFormInput
                    type="number"
                    id="validationServer01"
                    name="name"
                    label="UserId"
                    readOnly
                    disabled
                    value={payment.userId}
                  />
                </CCol>
                <CCol md={12}>
                  <CFormInput
                    type="number"
                    id="validationServer01"
                    name="number"
                    label="Card Number"
                    onChange={onUpdateInput}
                    value={paymentForm.number}
                    feedback={paymentFormErrors.numberError}
                    invalid={paymentFormErrors.numberError ? true : false}
                  />
                </CCol>
                <CCol md={6}>
                  <CFormInput
                    type="number"
                    id="validationServer01"
                    name="cvv"
                    label="CVV"
                    onChange={onUpdateInput}
                    value={paymentForm.cvv}
                    feedback={paymentFormErrors.cvvError}
                    invalid={paymentFormErrors.cvvError ? true : false}
                  />
                </CCol>
                <CCol md={6}>
                  <CFormInput
                    type="text"
                    id="validationServer01"
                    name="expDate"
                    label="Expiry Date"
                    onChange={onUpdateInput}
                    value={paymentForm.expDate}
                    feedback={paymentFormErrors.expDateError}
                    invalid={paymentFormErrors.expDateError ? true : false}
                  />
                </CCol>

                <div className="d-grid">
                  <CButton
                    color="primary"
                    className="py-2"
                    disabled={loading}
                    onClick={handleSubmit}
                  >
                    <div className="text-white">
                      Pay Now {loading && <CSpinner size="sm" />}
                    </div>
                  </CButton>
                </div>
              </CForm>
            </CCol>
            <CCol md={4}>
              <CRow className="text-secondary p-1">
                <CCol md={6}>
                  <strong>ItemId:</strong>
                </CCol>
                <CCol md={6}>{item.id}</CCol>
              </CRow>
              <CRow className="text-secondary p-1">
                <CCol md={6}>
                  <strong>Item name: </strong>
                </CCol>
                <CCol md={6}>{item.name}</CCol>
              </CRow>
              <CRow className="text-secondary p-1">
                <CCol md={6}>
                  <strong>Amount: </strong>
                </CCol>
                <CCol md={6}>{item.amount}</CCol>
              </CRow>
              <CRow className="text-secondary p-1">
                <CCol md={6}>
                  <strong>price: </strong>
                </CCol>
                <CCol md={6}>Rs. {item.price}</CCol>
              </CRow>
              <hr />
              <CRow className="text-secondary p-1">
                <CCol md={6}>
                  <strong className="h3">Total: </strong>
                </CCol>
                <CCol md={6} className="h3">
                  Rs. {item.amount * item.price}
                </CCol>
              </CRow>
            </CCol>
          </CRow>
        </CCardBody>
      </CCard>
    </div>
  );
}

export default Payment;
