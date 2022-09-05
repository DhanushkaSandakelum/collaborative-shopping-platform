import React from "react";
import { NavLink } from "react-router-dom";
import {
  CCol,
  CCard,
  CCardBody,
  CCardTitle,
  CCardSubtitle,
  CCardText,
} from "@coreui/react";

function AppItemCard(props) {
  return (
    <CCol md="3">
      <NavLink
        to={"/item?itemId=" + props.id}
        style={{ textDecoration: "none", color: "inherit" }}
      >
        <CCard>
          <CCardBody>
            <CCardTitle>{props.name}</CCardTitle>
            <CCardSubtitle className="mb-2 text-medium-emphasis">
              Amounts: {props.amount}
            </CCardSubtitle>
            <CCardText>{props.description}</CCardText>
            <h3>{props.price}</h3>
            <div></div>
          </CCardBody>
        </CCard>
      </NavLink>
    </CCol>
  );
}

export default AppItemCard;
