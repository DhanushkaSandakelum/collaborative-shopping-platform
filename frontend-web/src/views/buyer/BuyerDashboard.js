import React from "react";
import { useState, useEffect } from "react";
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
} from "@coreui/react";
import { toast } from "react-toastify";

import { v_required } from "../../utils/validator";

import AppDataFetchLoader from "../../components/loaders/AppDataFetchLoader";
import AppItemCard from "../../components/cards/AppItemCard";

import itemService from "../../services/itemService";
import userService from "../../services/userService";

function BuyerDashboard() {
  // Collection list
  const [collection, setCollection] = useState([]);

  // Modal visibility
  const [visible, setVisible] = useState(false);

  // For the server side requests and responses
  const [loading, setLoading] = useState(false);
  let navigate = useNavigate();

  const [user, setUser] = useState(userService.getUser());

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = () => {
    console.log("called");
    setLoading(true);

    itemService.getItems().then(
      (res) => {
        if (res.type === "OK") {
          toast.success(res.message);

          // Settings table data from fetched data
          setCollection(res.payload);
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

  return (
    <div>
      <h3 className="display-6">Buyer Dashboard</h3>
      <br />
      <CRow>
        <CCol>
          <CButton color="success" onClick={() => setVisible(!visible)}>
            My Item Collection
          </CButton>
        </CCol>
      </CRow>

      <br />
      {/* Data fetch loading */}
      <AppDataFetchLoader loading={loading} />
      {collection.length === 0 && (
        <h3 className="text-center">Your item collection is empty !</h3>
      )}

      <div>
        <CRow className="g-3">
          {/* Item cards */}
          {collection.map((item) => (
            <AppItemCard
              id={item.id}
              name={item.name}
              description={item.description}
              amount={item.amount}
              price={item.price}
              fetchData={fetchData}
            />
          ))}
        </CRow>
      </div>
    </div>
  );
}

export default BuyerDashboard;
