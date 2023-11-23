import Layout from "../shared/layout";
import { Table } from "antd";
import axios from "axios";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const Department = () => {
  const [department, setDepartment] = useState([]);
  const { authSlice } = useSelector((res) => res);

  const navigate = useNavigate();

  useEffect(() => {
    axios({
      method: "get",
      url: "http://localhost:9000/department",
    })
      .then((res) => {
        setDepartment(res.data.dataRes);
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
          <Table dataSource={department && department} columns={columns} />
        ) : (
          navigate("/signup")
        )}
      </div>
    </Layout>
  );
};

export default Department;
