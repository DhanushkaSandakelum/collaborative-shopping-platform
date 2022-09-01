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
} from "@coreui/react";

function AppItemCard(props) {
  const [visible, setVisible] = useState(false);

  // Form data
  const [itemForm, setItemForm] = useState({
    name: "",
    description: "",
    amount: "",
    price: "",
  });

  useEffect(() => {
    setItemForm({
      name: props.name,
      description: props.description,
      amount: props.amount,
      price: props.price,
    });
  }, []);

  const handleDeleteItem = () => {
    console.log(itemForm.name);
    setVisible(false);
  };

  return (
    <CCol md="3">
      <CCard>
        <CCardBody>
          <CCardTitle>{itemForm.name}</CCardTitle>
          <CCardSubtitle className="mb-2 text-medium-emphasis">
            Amounts: {itemForm.amount}
          </CCardSubtitle>
          <CCardText>{itemForm.description}</CCardText>
          <h3>{itemForm.price}</h3>
          <div>
            <CButtonGroup role="group" aria-label="Basic example">
              <CButton color="warning" size="sm">
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
