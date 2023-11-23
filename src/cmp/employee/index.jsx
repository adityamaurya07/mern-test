import Layout from "../shared/layout";

import { Space, Table, Tag } from "antd";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";

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
    // { title: "Age", dataIndex: "age", key: "age" },
    { title: "Location", dataIndex: "location", key: "location" },
    {
      title: "Action",
      key: "action",
      render: (_, record) => (
        <Space size="middle">
          <Tag
            color="geekblue"
            className="flex justify-center items-center !py-2 !text-[15px] hover:cursor-pointer"
          >
            <EditOutlined />
          </Tag>
          <Tag
            color="green"
            className="flex justify-center items-center !py-2 !text-[15px] hover:cursor-pointer"
          >
            <DeleteOutlined />
          </Tag>
        </Space>
      ),
    },
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
