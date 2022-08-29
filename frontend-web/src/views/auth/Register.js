import React from "react";

import {
  CForm,
  CCol,
  CFormInput,
  CButton,
  CContainer,
  CRow,
  CCard,
  CCardBody,
  CFormSelect,
} from "@coreui/react";

function Register() {
  return (
    <div className="bg-light  d-flex flex-row align-items-center vh-100">
      <CContainer>
        <CRow className="justify-content-center">
          <CCol md={5}>
            <CCard className="mx-4">
              <CCardBody className="p-4">
                <h1 className="text-center">Sign up</h1>
                <p className="text-medium-emphasis text-center">
                  Please enter your details
                </p>
                <CForm className="row g-3">
                  <CCol md={12}>
                    <CFormInput
                      type="text"
                      id="validationServer01"
                      name="username"
                      label="Username"
                      value={""}
                      feedback="good"
                      invalid={false}
                    />
                  </CCol>
                  <CCol md={6}>
                    <CFormInput
                      type="text"
                      id="validationServer01"
                      name="username"
                      label="First name"
                      value={""}
                      feedback="good"
                      invalid={false}
                    />
                  </CCol>
                  <CCol md={6}>
                    <CFormInput
                      type="text"
                      id="validationServer01"
                      name="username"
                      label="Last name"
                      value={""}
                      feedback="good"
                      invalid={false}
                    />
                  </CCol>
                  <CCol md={6}>
                    <CFormInput
                      type="text"
                      id="validationServer01"
                      name="username"
                      label="Phone"
                      value={""}
                      feedback="good"
                      invalid={false}
                    />
                  </CCol>
                  <CCol md={6}>
                    <CFormSelect
                      label="Actor type"
                      aria-label="actorType-select"
                      name="actorType"
                      //   onChange={onUpdateInputInStuDetailsForm}
                      //   value={stuDetailsForm.pob}
                      //   feedback={stuDetailsFormErrors.pobError}
                      //   invalid={stuDetailsFormErrors.pobError ? true : false}
                    >
                      <option value="buyer">Buyer</option>
                      <option value="seller">Seller</option>
                    </CFormSelect>
                  </CCol>
                  <CCol md={12}>
                    <CFormInput
                      type="text"
                      id="validationServer01"
                      name="username"
                      label="Address"
                      value={""}
                      feedback="good"
                      invalid={false}
                    />
                  </CCol>
                  <CCol md={12}>
                    <CFormInput
                      type="text"
                      id="validationServer01"
                      name="username"
                      label="Email"
                      value={""}
                      feedback="good"
                      invalid={false}
                    />
                  </CCol>
                  <CCol md={6}>
                    <CFormInput
                      type="text"
                      id="validationServer01"
                      name="username"
                      label="Password"
                      value={""}
                      feedback="good"
                      invalid={false}
                    />
                  </CCol>
                  <CCol md={6}>
                    <CFormInput
                      type="text"
                      id="validationServer01"
                      name="username"
                      label="Confirm Password"
                      value={""}
                      feedback="good"
                      invalid={false}
                    />
                  </CCol>

                  <div className="d-grid">
                    <CButton
                      color="primary"
                      size="md"
                      type="submit"
                      className="py-2"
                    >
                      <div className="text-white">
                        Login
                        {/* {loading && <CSpinner size="sm" />} */}
                      </div>
                    </CButton>
                  </div>
                </CForm>
              </CCardBody>
            </CCard>
          </CCol>
        </CRow>
      </CContainer>
    </div>
  );
}

export default Register;
