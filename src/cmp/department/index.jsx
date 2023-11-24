import Layout from "../shared/layout";
import {
  Button,
  Space,
  Table,
  Tag,
  Modal,
  Form,
  Input,
  InputNumber,
  message,
} from "antd";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import useSWR from "swr";

import axios from "axios";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const Department = () => {
  const [department, setDepartment] = useState([]);
  const { authSlice } = useSelector((res) => res);
  const [modal1Open, setModal1Open] = useState(false);
  const [selectedRecord, setSelectedRecord] = useState(null);

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

  const deleteDepartment = async (data) => {
    const id = data._id;
    console.log(id);
    // Make the DELETE request to delete the department
    await axios
      .delete(`http://localhost:9000/department/${id}`)
      .then((res) => {
        message.success("Delete Successfully");
      })
      .catch((err) => {
        message.error("Something went wrong");
      });
  };
  const columns = [
    {
      title: "Serial Number",
      dataIndex: "_id",
      key: "id",
      render: (text, record, index) => index + 1,
    },
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    { title: "Age", dataIndex: "age", key: "age" },
    { title: "Location", dataIndex: "location", key: "location" },
    {
      title: "Action",
      key: "action",
      render: (_, record) => (
        <Space size="middle">
          <Tag
            onClick={() => {
              setSelectedRecord(record);
              setModal1Open(true);
            }}
            color="geekblue"
            className="flex justify-center items-center !py-2 !text-[15px] hover:cursor-pointer"
          >
            <EditOutlined />
          </Tag>
          <Tag
            onClick={() => {
              setSelectedRecord(record);
              deleteDepartment(record);
            }}
            color="green"
            className="flex justify-center items-center !py-2 !text-[15px] hover:cursor-pointer"
          >
            <DeleteOutlined />
          </Tag>
        </Space>
      ),
    },
  ];

  const onFinish = (values) => {
    console.log("Received values:", values);
    // You can perform further actions with the form data here
  };
  return (
    <Layout>
      <div className="container mx-auto my-8">
        {authSlice.user && authSlice.user ? (
          <>
            <div className="text-end pb-4 pr-4">
              <div>
                <Modal
                  className="capitalize"
                  centered
                  title={
                    selectedRecord && selectedRecord ? (
                      selectedRecord.name
                    ) : (
                      <span className="py-2">Create Department</span>
                    )
                  }
                  style={{
                    top: 20,
                  }}
                  footer={null}
                  open={modal1Open}
                  onOk={() => setModal1Open(false)}
                  onCancel={() => setModal1Open(false)}
                >
                  <div className="pl-20">
                    <Form
                      className="w"
                      layout="vertical"
                      labelCol={{ span: 8 }}
                      wrapperCol={{ span: 16 }}
                      onFinish={onFinish}
                      autoComplete="off"
                    >
                      <Form.Item
                        label="Name"
                        name="name"
                        rules={[
                          {
                            required: true,
                            message: "Please input your name!",
                          },
                        ]}
                      >
                        <Input />
                      </Form.Item>

                      <Form.Item
                        label="Age"
                        name="age"
                        rules={[
                          { required: true, message: "Please input your age!" },
                        ]}
                      >
                        <InputNumber />
                      </Form.Item>

                      <Form.Item
                        label="Location"
                        name="location"
                        rules={[
                          {
                            required: true,
                            message: "Please input your location!",
                          },
                        ]}
                      >
                        <Input />
                      </Form.Item>

                      <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                        <Button
                          className="bg-[#F0F5FF] text-indigo-500 hover:!bg-indigo-500 hover:!text-white"
                          type="text"
                          htmlType="submit"
                        >
                          Submit
                        </Button>
                      </Form.Item>
                    </Form>
                  </div>
                </Modal>

                <Button
                  onClick={() => setModal1Open(true)}
                  type="text"
                  className="bg-[#F0F5FF] text-indigo-500 hover:!bg-indigo-500 hover:!text-white"
                >
                  Create Department
                </Button>
              </div>
            </div>
            <Table dataSource={department && department} columns={columns} />
          </>
        ) : (
          navigate("/signup")
        )}
      </div>
    </Layout>
  );
};

export default Department;
