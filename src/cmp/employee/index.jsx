import Layout from "../shared/layout";
import { Table } from "antd";
import axios from "axios";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const Employee = () => {
  const { authSlice } = useSelector((res) => res);
  const [employee, setEmployee] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    axios({
      method: "get",
      url: "http://localhost:9000/employee",
    })
      .then((res) => {
        setEmployee(res.data.dataRes);
      })
      .catch((err) => {
        console.log(err.response);
      });
  }, []);

  const columns = [
    {
      title: "Serial Number",
      dataIndex: "_id",
      key: "id",
      render: (text, record, index) => index + 1,
    },
    { title: "Name", dataIndex: "name", key: "name" },
    { title: "Age", dataIndex: "age", key: "age" },
    { title: "Location", dataIndex: "location", key: "location" },
  ];

  return (
    <Layout>
      <div className="container mx-auto my-8">
        {authSlice.user && authSlice.user ? (
          <Table dataSource={employee && employee} columns={columns} />
        ) : (
          navigate("/signup")
        )}
      </div>
    </Layout>
  );
};

export default Employee;
