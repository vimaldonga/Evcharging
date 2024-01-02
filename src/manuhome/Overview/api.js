import axios from "axios";

const studentId = JSON.parse(localStorage.getItem("userId"));
const headers = {
  "user-Id": studentId,
};
export const addItemAPI = async (inputdata) => {
  const response = await axios.post("http://localhost:9000/api/v1/createStudent",inputdata, { headers });

  return response.data.data;
};



export const deleteItemAPI = async(id)=> {

  try {
         await axios.delete(`http://localhost:9000/api/v1/deleteStudent?student_Id=${id}`);
  } catch (error) {
    console.error("Error deleting record:", error);
  }
};  


export const editItemAPI = async (editingId, editdata) => {
  try {
    const editresult = await axios.put(`http://localhost:9000/api/v1/upadteStudent?student_Id=${editingId}`, editdata);
    return editresult.data.data;
  } catch (error) {
    throw new Error('Failed to edit item');
  }
};