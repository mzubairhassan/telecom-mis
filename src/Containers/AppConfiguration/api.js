import axios from "axios";

export const addVendor = async (values) => {
  const no = await axios.post("http://localhost:8080/addVendor", values);
  return no;
};
export const addItem = async (values) => {
  const no = await axios.post("http://localhost:8080/addItem", values);
  return no;
};
export const addUser = async (values) => {
  const no = await axios.post("http://localhost:8080/addUser", values);
  return no;
};
export const addAccount = async (values) => {
  console.info("API CALL ADD ACCOUNT");
  const no = await axios.post("http://localhost:8080/addAccount", values);
  return no;
};
export const deleteVendor = async (id) => {
  const no = await axios.delete(`http://localhost:8080/deleteVendor/${id}`);
  return no;
};
export const getAllVendors = async () => {
  const list = await axios.get("http://localhost:8080/getAllVendors");

  return list.data;
};
export const getAllAccounts = async () => {
  const list = await axios.get("http://localhost:8080/getAllAccounts");

  return list.data;
};
export const getAllItems = async () => {
  const list = await axios.get("http://localhost:8080/allItems");
  console.log(list.data);

  return list.data;
};

export const getAllUsers = async () => {
  const list = await axios.get("http://localhost:8080/allUsers");
  console.log(list.data);

  return list.data;
};
export const deleteItems = async (values) => {
  const no = await axios.delete("http://localhost:8080/deleteItems", {
    data: values,
  });
  console.log(no.data);

  return no;
};

export const deleteUsers = async (values) => {
  const no = await axios.delete("http://localhost:8080/deleteUsers", {
    data: values,
  });
  console.log(no.data);

  return no;
};

export const deleteAccounts = async (values) => {
  const no = await axios.delete("http://localhost:8080/deleteAccounts", {
    data: values,
  });
  console.log(no.data);

  return no;
};
export const addPlan = async (values) => {
  const no = await axios.post("http://localhost:8080/addPlan", values);
  console.log(no.data);

  return no;
};
export const getAllPlans = async () => {
  const list = await axios.get("http://localhost:8080/allPlans");
  console.log(list.data);

  return list.data;
};

export const getAllSubscription = async () => {
  const list = await axios.get("http://localhost:8080/allSubscr");
  console.log(list.data);

  return list.data;
};

export const deletePlan = async (values) => {
  const no = await axios.delete("http://localhost:8080/deletePlans", {
    data: values,
  });
  console.log(no.data);

  return no;
};

export const addSubscription = async (values) => {
  const no = await axios.post("http://localhost:8080/addSubscription", values);
  console.log(no.data);

  return no;
};
