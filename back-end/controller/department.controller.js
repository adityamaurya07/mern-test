import Department from "../schema/department.schema.js";
export const Get = async (req, res) => {
  try {
    const dataRes = await Department.find();
    res.status(200).json({
      dataRes,
    });
  } catch {
    res.status(404).json({
      message: "Not found !",
    });
  }
};
export const GetById = async (req, res) => {
  const { id } = req.params;
  try {
    const dataRes = await Department.findOne({ _id: id });
    res.status(200).json({
      dataRes,
    });
  } catch {
    res.status(404).json({
      message: "Not found !",
    });
  }
};
export const Post = async (req, res) => {
  try {
    const data = req.body;
    const collection = new Department(data);
    const dateRes = await collection.save();
    res.status(200).json({
      dateRes,
    });
  } catch {
    res.status(409).json({
      message: "Somthing is wrong",
    });
  }
};
export const Delete = async (req, res) => {
  const { id } = req.params;
  try {
    const { acknowledged, deletedCount } = await Department.deleteOne({
      _id: id,
    });
    if (acknowledged && deletedCount) {
      res.status(200).json({
        message: "Deleted!",
        success: true,
      });
    } else {
      res.status(404).json({
        message: "Not found !",
      });
    }
  } catch {
    res.status(404).json({
      message: "Not found !",
    });
  }
};
export const Update = async (req, res) => {
  const { id } = req.params;
  const data = req.body;
  console.log(id, data);
  try {
    const { acknowledged, modifiedCount } = await Department.updateOne(
      { _id: id },
      data
    );
    console.log(acknowledged, modifiedCount);
    if (acknowledged && modifiedCount) {
      res.status(200).json({
        message: "Update Succesfully",
      });
    } else {
      res.status(404).json({
        message: "Not found !",
      });
    }
  } catch {
    res.status(404).json({
      message: "Not found !",
    });
  }
};
