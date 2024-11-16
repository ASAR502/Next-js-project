import Cookies from "js-cookie";
const baseUrl =process.env.NEXT_PUBLIC_API_URL;
export const createNewOrder = async (formData) => {
  try {
    const res = await fetch(`${baseUrl}/api/order/create-order`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${Cookies.get("token")}`,
      },
      body: JSON.stringify(formData),
    });

    const data = await res.json();

    return data;
  } catch (e) {
    console.log(e);
  }
};

export const getAllOrdersForUser = async (id) => {
  try {
    const res = await fetch(`${baseUrl}/api/order/get-all-orders?id=${id}`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${Cookies.get("token")}`,
      },
    });

    const data = await res.json();

    return data;
  } catch (e) {
    console.log(e);
  }
};

export const getOrderDetails = async (id) => {
  try {
    const res = await fetch(`${baseUrl}/api/order/order-details?id=${id}`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${Cookies.get("token")}`,
      },
    });

    const data = await res.json();

    return data;
  } catch (e) {
    console.log(e);
  }
};

export const getAllOrdersForAllUsers = async () => {
  try {
    const res = await fetch(`${baseUrl}/api/admin/orders/get-all-orders`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${Cookies.get("token")}`,
      },
    });

    const data = await res.json();

    return data;
  } catch (e) {
    console.log(e);
  }
};

export const updateStatusOfOrder = async (formData) => {
  try {
    const res = await fetch(`${baseUrl}/api/admin/orders/update-order`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${Cookies.get("token")}`,
      },
      body: JSON.stringify(formData),
    });

    const data = await res.json();

    return data;
  } catch (e) {
    console.log(e);
  }
};
