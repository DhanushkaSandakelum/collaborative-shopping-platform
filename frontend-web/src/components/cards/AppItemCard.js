import React from "react";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  CCol,
  CCard,
  CCardBody,
  CCardTitle,
  CCardSubtitle,
  CCardText,
  CButtonGroup,
  CButton,
  CModal,
  CModalHeader,
  CModalTitle,
  CModalBody,
  CModalFooter,
  CForm,
  CFormInput,
} from "@coreui/react";
import { toast } from "react-toastify";

import { v_required } from "../../utils/validator";

import itemService from "../../services/itemService";

function AppItemCard(props) {
  const [visible, setVisible] = useState(false);
  const [visibleEditForm, setVisibleEditForm] = useState(false);

  // For the server side requests and responses
  const [loading, setLoading] = useState(false);
  let navigate = useNavigate();

  // Form data
  const [item, setItem] = useState({
    id: "",
    name: "",
    description: "",
    amount: "",
    price: "",
  });

  // Temp Edit Form data
  const [itemForm, setItemForm] = useState({
    name: "",
    description: "",
    amount: "",
    price: "",
  });

  // Update the form data while input
  const onUpdateInput = (e) => {
    setItemForm((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  useEffect(() => {
    setItem({
      id: props.id,
      name: props.name,
      description: props.description,
      amount: props.amount,
      price: props.price,
    });

    setItemForm({
      name: props.name,
      description: props.description,
      amount: props.amount,
      price: props.price,
    });
  }, []);

  // useEffect(() => {
  //   setItem({
  //     name: props.name,
  //     description: props.description,
  //     amount: props.amount,
  //     price: props.price,
  //   });
  // }, [itemForm]);

  // For data errors
  const [itemFormErrors, setItemFormErrors] = useState({
    nameError: "",
    descriptionError: "",
    amountError: "",
    priceError: "",
  });

  const handleEditItem = async (e) => {
    console.log("EDITING", itemForm.name);

    e.preventDefault();

    let nameError = "";
    let descriptionError = "";
    let amountError = "";
    let priceError = "";

    if (!v_required(itemForm.name)) {
      nameError = "Name can not be empty.";
    }

    if (!v_required(itemForm.description)) {
      descriptionError = "Description can not be empty.";
    }

    if (!v_required(itemForm.amount)) {
      amountError = "Amount can not be empty.";
    }

    if (!v_required(itemForm.price)) {
      priceError = "{Price} can not be empty.";
    }

    // If errors exist, show errors
    setItemFormErrors({
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
        name: itemForm.name,
        description: itemForm.description,
        amount: itemForm.amount,
        price: itemForm.price,
      };

      // for testing only
      // setCollection((prev) => [...prev, payload]);
      setVisibleEditForm(false);

      itemService.updateItem(item.id, payload).then(
        (res) => {
          if (res.type === "OK") {
            toast.success(res.message);
            props.fetchData();
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

  const handleDeleteItem = async (e) => {
    e.preventDefault();

    setVisible(false);

    itemService.deleteItem(item.id).then(
      (res) => {
        if (res.type === "OK") {
          toast.success(res.message);
          props.fetchData();
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

  return (
    <CCol md="3">
      <CCard>
        <CCardBody>
          <CCardTitle>{item.name}</CCardTitle>
          <CCardSubtitle className="mb-2 text-medium-emphasis">
            Amounts: {item.amount}
          </CCardSubtitle>
          <CCardText>{item.description}</CCardText>
          <h3>{item.price}</h3>
          <div>
            <CButtonGroup role="group" aria-label="Basic example">
              <CButton
                color="warning"
                size="sm"
                onClick={() => setVisibleEditForm(!visibleEditForm)}
              >
                Edit
              </CButton>
              <CButton
                color="danger"
                size="sm"
                onClick={() => setVisible(true)}
              >
                Remove
              </CButton>
            </CButtonGroup>
          </div>
        </CCardBody>
      </CCard>

      <div>
        <CModal
          visible={visibleEditForm}
          onClose={() => setVisibleEditForm(false)}
        >
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
                  value={itemForm.name}
                  feedback={itemFormErrors.nameError}
                  invalid={itemFormErrors.nameError ? true : false}
                />
              </CCol>
              <CCol md={12}>
                <CFormInput
                  type="text"
                  id="validationServer01"
                  name="description"
                  label="Description"
                  onChange={onUpdateInput}
                  value={itemForm.description}
                  feedback={itemFormErrors.descriptionError}
                  invalid={itemFormErrors.descriptionError ? true : false}
                />
              </CCol>
              <CCol md={12}>
                <CFormInput
                  type="number"
                  id="validationServer01"
                  name="amount"
                  label="Amount"
                  onChange={onUpdateInput}
                  value={itemForm.amount}
                  feedback={itemFormErrors.amountError}
                  invalid={itemFormErrors.amountError ? true : false}
                />
              </CCol>
              <CCol md={12}>
                <CFormInput
                  type="number"
                  id="validationServer01"
                  name="price"
                  label="Price"
                  onChange={onUpdateInput}
                  value={itemForm.price}
                  feedback={itemFormErrors.priceError}
                  invalid={itemFormErrors.priceError ? true : false}
                />
              </CCol>
            </CForm>
          </CModalBody>
          <CModalFooter>
            <CButton
              color="secondary"
              onClick={() => setVisibleEditForm(false)}
            >
              Close
            </CButton>
            <CButton color="primary" onClick={handleEditItem}>
              Update Item
            </CButton>
          </CModalFooter>
        </CModal>
      </div>

      <div>
        <CModal visible={visible} onClose={() => setVisible(false)}>
          <CModalHeader onClose={() => setVisible(false)}>
            <CModalTitle>Delete Item: {itemForm.name}</CModalTitle>
          </CModalHeader>
          <CModalBody>Woohoo, you're reading this text in a modal!</CModalBody>
          <CModalFooter>
            <CButton color="secondary" onClick={() => setVisible(false)}>
              Close
            </CButton>
            <CButton color="danger" onClick={handleDeleteItem}>
              Delete
            </CButton>
          </CModalFooter>
        </CModal>
      </div>
    </CCol>
  );
}

export default AppItemCard;
