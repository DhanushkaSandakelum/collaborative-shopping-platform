import React from "react";
import { useState, useEffect } from "react";
import { useNavigate, NavLink } from "react-router-dom";
import {
  CTable,
  CTableHead,
  CTableRow,
  CTableHeaderCell,
  CTableBody,
  CTableDataCell,
  CButtonGroup,
  CButton,
} from "@coreui/react";
import { toast } from "react-toastify";

import AppDataFetchLoader from "../../components/loaders/AppDataFetchLoader";

import deliveryService from "../../services/deliveryService";

function AdminDelivery() {
  // Collection list
  const [collection, setCollection] = useState([]);

  // Modal visibility
  const [visible, setVisible] = useState(false);

  // For the server side requests and responses
  const [loading, setLoading] = useState(false);
  let navigate = useNavigate();

  // const [user, setUser] = useState(userService.getUser());

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = () => {
    console.log("called");
    setLoading(true);

    deliveryService.getDeliveries().then(
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
      <h4>Deliveries</h4>

      <br />
      {/* Data fetch loading */}
      <AppDataFetchLoader loading={loading} />
      {collection.length === 0 && (
        <h3 className="text-center">Deliveries are empty</h3>
      )}

      <CTable>
        <CTableHead>
          <CTableRow>
            <CTableHeaderCell scope="col">ID</CTableHeaderCell>
            <CTableHeaderCell scope="col">Seller</CTableHeaderCell>
            <CTableHeaderCell scope="col">Buyer</CTableHeaderCell>
            <CTableHeaderCell scope="col">Item</CTableHeaderCell>
          </CTableRow>
        </CTableHead>
        <CTableBody>
          {collection.map((delivery) => (
            <CTableRow>
              <CTableHeaderCell scope="row">{delivery.id}</CTableHeaderCell>
              <CTableDataCell>{delivery.sellerUsername}</CTableDataCell>
              <CTableDataCell>{delivery.buyerUsername}</CTableDataCell>
              <CTableDataCell>{delivery.name}</CTableDataCell>
            </CTableRow>
          ))}
        </CTableBody>
      </CTable>
    </div>
  );
}

export default AdminDelivery;
