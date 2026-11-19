import React from "react";
import {
  getCustomers,
  getBillByAll,
  getSummary,
} from "../services/customerServices.js";
import { useState } from "react";
import { useEffect } from "react";

const Customer = () => {
  const [customers, setCustomers] = useState([]);
  const [bills, setBills] = useState([]);
  const [summary, setSummary] = useState({});

  const getData = async () => {
    const result = await getCustomers();
    setCustomers(result.data);
  };

  const getBillData = async () => {
    const result = await getBillByAll();
    setBills(result.data);
  };

  useEffect(() => {
    getData();
    getBillData();
    getSummaryData();
  }, []);

  const getSummaryData = async () => {
    const result = await getSummary();
    console.log(result);
    setSummary(result.data[0]);
  };

  return (
    <div className="container mt-4">
      <h2>Electricity Bill Dashboard</h2>

      <table className="table table-bordered mt-3">
        <thead>
          <tr>
            <th>Name</th>
            <th>City</th>
            <th>Connection Type</th>
            <th>Current Units</th>
            <th>Previous Units</th>
          </tr>
        </thead>

        <tbody>
          {customers.map((c) => (
            <tr key={c._id}>
              <td>{c.name}</td>
              <td>{c.city}</td>
              <td>{c.conntype}</td>
              <td>{c.cunit}</td>
              <td>{c.punit}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <h3 className="mt-4">Electricity Bill Details</h3>

      <table className="table table-bordered">
        <thead>
          <tr>
            <th>Name</th>
            <th>Units Consumed</th>
            <th>Energy Charge</th>
            <th>Fixed Charge</th>
            <th>Subtotal</th>
            <th>Tax</th>
            <th>Final Bill</th>
          </tr>
        </thead>

        <tbody>
          {bills.map((b) => (
            <tr key={b._id}>
              <td>{b.name}</td>
              <td>{b.unitCon}</td>
              <td>{b.echarge}</td>
              <td>{b.fcharge}</td>
              <td>{b.subtotal}</td>
              <td>{b.tax}</td>
              <td>{b.finalbill}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <h3 className="mt-4">Summary</h3>

          <div>
            <h2>Total customer : </h2>
            <h4>{summary.totalCust}</h4>
          </div>
      <div className="row">
        {/* <div className="col-md-4">
          <div className="card p-3">
            <h5>Total Customers</h5>
            <h3>{summary.totalCust}</h3>
          </div>
        </div> */}

        <div className="col-md-4">
          <div className="card p-3">
            <h5>Total Units</h5>
            <h3>{summary.totalUnit}</h3>
          </div>
        </div>

        <div className="col-md-4">
          <div className="card p-3">
            <h5>Average Units</h5>
            <h3>{summary.avgUnit}</h3>
          </div>
        </div>

        <div className="col-md-4 mt-3">
          <div className="card p-3">
            <h5>Maximum Units</h5>
            <h3>{summary.maxUnit}</h3>
          </div>
        </div>

        <div className="col-md-4 mt-3">
          <div className="card p-3">
            <h5>Minimum Units</h5>
            <h3>{summary.minUnit}</h3>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Customer;
