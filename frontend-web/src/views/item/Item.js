import React from "react";
import { useState, useEffect } from "react";
import {
  CAvatar,
  CCardHeader,
  CCard,
  CCardBody,
  CCardTitle,
  CCardText,
  CButton,
  CCol,
  CButtonGroup,
  CModal,
  CModalHeader,
  CModalTitle,
  CModalBody,
  CModalFooter,
  CForm,
  CFormInput,
} from "@coreui/react";
import { useNavigate, useSearchParams, NavLink } from "react-router-dom";

import { toast } from "react-toastify";

import { v_required } from "../../utils/validator";

import itemService from "../../services/itemService";
import userService from "../../services/userService";

function Item() {
  const [user, setUser] = useState(userService.getUser());

  // Request params
  const [searchParams, setSearchParams] = useSearchParams();

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
    alreadyBuy: "",

    userId: "",
    username: "",
    firstName: "",
    lastName: "",
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
          setItemForm(res.payload);
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
            setItem((prev) => ({ ...prev, ...payload }));
            console.log(item);
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
          navigate("/seller");
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
    <div>
      <CCard className="w-75 mx-auto">
        <CCardHeader>
          <CAvatar color="primary" textColor="white">
            {item.firstName[0]}
          </CAvatar>
          <span className="ms-2">{item.username}</span>
          {user.userType === "seller" && (
            <CButtonGroup
              role="group"
              aria-label="Basic example"
              className="ms-3"
            >
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
          )}
        </CCardHeader>
        <CCardBody>
          <CCardTitle>{item.name}</CCardTitle>
          <CCardText>{item.description}</CCardText>
          <CCardText>Amount: {item.amount}</CCardText>
          <CCardText className="display-6">${item.price}</CCardText>

          <NavLink
            to={`/${user.userType}`}
            style={{ textDecoration: "none", color: "inherit" }}
          >
            <CButton className="bg-secondary">Back</CButton>
          </NavLink>
          {item.alreadyBuy ? (
            <CButton className="bg-warning ms-2 px-5">Sold</CButton>
          ) : (
            <NavLink
              to={`/item/payment?userId=${
                item.userId
              }&itemId=${searchParams.get("itemId")}`}
              style={{ textDecoration: "none", color: "inherit" }}
            >
              <CButton className="bg-success ms-2 px-5">Buy</CButton>
            </NavLink>
          )}
        </CCardBody>
      </CCard>

      <div>
        <CModal
          visible={visibleEditForm}
          onClose={() => setVisibleEditForm(false)}
        >
          <CModalHeader>
            <CModalTitle>Edit Item: {itemForm.name}</CModalTitle>
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
          <CModalBody>Are you sure you want to delete this item?</CModalBody>
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
    </div>
  );
}

export default Item;
