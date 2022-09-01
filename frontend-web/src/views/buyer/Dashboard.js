import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  CRow,
  CCol,
  CButton,
  CModal,
  CModalHeader,
  CModalTitle,
  CModalBody,
  CModalFooter,
  CForm,
  CFormInput,
  CCard,
  CCardBody,
  CCardTitle,
  CCardSubtitle,
  CCardText,
  CSpinner,
} from "@coreui/react";
import { toast } from "react-toastify";

import { v_required } from "../../utils/validator";

import AppDataFetchLoader from "../../components/loaders/AppDataFetchLoader";
import AppItemCard from "../../components/cards/AppItemCard";

const tempData = [
  {
    name: "asd",
    description: "fsdgdgdhh",
    amount: "10",
    price: "100.00",
  },
  {
    name: "asd",
    description: "fsdgdgdhh",
    amount: "10",
    price: "100.00",
  },
  {
    name: "asd",
    description: "fsdgdgdhh",
    amount: "10",
    price: "100.00",
  },
  {
    name: "asd",
    description: "fsdgdgdhh",
    amount: "10",
    price: "100.00",
  },
  {
    name: "asd",
    description: "fsdgdgdhh",
    amount: "10",
    price: "100.00",
  },
];

function Dashboard() {
  // Collection list
  const [collection, setCollection] = useState(tempData);

  // Modal visibility
  const [visible, setVisible] = useState(false);

  // For the server side requests and responses
  const [loading, setLoading] = useState(false);
  let navigate = useNavigate();

  // Form data
  const [addItemForm, setAddItemForm] = useState({
    name: "",
    description: "",
    amount: "",
    price: "",
  });

  // Update the form data while input
  const onUpdateInput = (e) => {
    setAddItemForm((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  // For data errors
  const [addItemFormErrors, setAddItemFormErrors] = useState({
    nameError: "",
    descriptionError: "",
    amountError: "",
    priceError: "",
  });

  // Validate the data and
  // If valid send to the server
  // else show the errors
  const handleSubmit = async (e) => {
    e.preventDefault();

    let nameError = "";
    let descriptionError = "";
    let amountError = "";
    let priceError = "";

    if (!v_required(addItemForm.name)) {
      nameError = "Name can not be empty.";
    }

    if (!v_required(addItemForm.description)) {
      descriptionError = "Description can not be empty.";
    }

    if (!v_required(addItemForm.amount)) {
      amountError = "Amount can not be empty.";
    }

    if (!v_required(addItemForm.price)) {
      priceError = "{Price} can not be empty.";
    }

    // If errors exist, show errors
    setAddItemFormErrors({
      nameError,
      descriptionError,
      amountError,
      priceError,
    });

    // If no errors exist, send to the server
    if (!(nameError || descriptionError || amountError || priceError)) {
      // Sending to the server
      setLoading(true);

      const payload = {
        name: addItemForm.name,
        description: addItemForm.description,
        amount: addItemForm.amount,
        price: addItemForm.price,
      };

      // for testing only
      setCollection((prev) => [...prev, payload]);
      setVisible(false);
      toast.success("Item");

      // userService.login(payload).then(
      //   (res) => {
      //     if (res.type === "OK") {
      //       toast.success(res.message);
      //       navigate("/buyer");
      //     } else if (res.type === "BAD") {
      //       toast.error(res.message);
      //     }

      //     setLoading(false);
      //   },
      //   (error) => {
      //     const res =
      //       (error.response &&
      //         error.response.data &&
      //         error.response.data.message) ||
      //       error.message ||
      //       error.toString();

      //     // After recieving the server request
      //     toast.error(res);
      //     setLoading(false);
      //   }
      // );
    }
  };

  return (
    <div>
      <CRow>
        <CCol>
          <CButton color="success" onClick={() => setVisible(!visible)}>
            Add Item
          </CButton>
        </CCol>
      </CRow>
      <div>
        <CModal visible={visible} onClose={() => setVisible(false)}>
          <CModalHeader>
            <CModalTitle>Add Item to sell</CModalTitle>
          </CModalHeader>
          <CModalBody>
            <CForm className="row g-3">
              <CCol md={12}>
                <CFormInput
                  type="text"
                  id="validationServer01"
                  name="name"
                  label="Name"
                  onChange={onUpdateInput}
                  value={addItemForm.name}
                  feedback={addItemFormErrors.nameError}
                  invalid={addItemFormErrors.nameError ? true : false}
                />
              </CCol>
              <CCol md={12}>
                <CFormInput
                  type="text"
                  id="validationServer01"
                  name="description"
                  label="Description"
                  onChange={onUpdateInput}
                  value={addItemForm.description}
                  feedback={addItemFormErrors.descriptionError}
                  invalid={addItemFormErrors.descriptionError ? true : false}
                />
              </CCol>
              <CCol md={12}>
                <CFormInput
                  type="number"
                  id="validationServer01"
                  name="amount"
                  label="Amount"
                  onChange={onUpdateInput}
                  value={addItemForm.amount}
                  feedback={addItemFormErrors.amountError}
                  invalid={addItemFormErrors.amountError ? true : false}
                />
              </CCol>
              <CCol md={12}>
                <CFormInput
                  type="number"
                  id="validationServer01"
                  name="price"
                  label="Price"
                  onChange={onUpdateInput}
                  value={addItemForm.price}
                  feedback={addItemFormErrors.priceError}
                  invalid={addItemFormErrors.priceError ? true : false}
                />
              </CCol>
            </CForm>
          </CModalBody>
          <CModalFooter>
            <CButton color="secondary" onClick={() => setVisible(false)}>
              Close
            </CButton>
            <CButton color="primary" onClick={handleSubmit}>
              Add Item
            </CButton>
          </CModalFooter>
        </CModal>
      </div>

      <br />
      {/* Data fetch loading */}
      <AppDataFetchLoader loading={loading} />

      <div>
        <CRow className="g-3">
          {/* Item cards */}
          {collection.map((item) => (
            <AppItemCard
              name={item.name}
              description={item.description}
              amount={item.amount}
              price={item.price}
            />
          ))}
        </CRow>
      </div>
    </div>
  );
}

export default Dashboard;
