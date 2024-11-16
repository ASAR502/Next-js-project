//add a new product service

import Cookies from "js-cookie";
const baseUrl =process.env.NEXT_PUBLIC_API_URL;

export const addNewProduct = async (formData) => {
  try {
    const response = await fetch(`${baseUrl}/api/admin/add-product`, {
      method: "POST",
      headers: {
        "content-type": "application/json",
        Authorization: `Bearer ${Cookies.get("token")}`,
      },
      body: JSON.stringify(formData),
    });

    const data = await response.json();

    return data;
  } catch (error) {
    console.log(error);
  }
};

export const getAllAdminProducts = async () => {
  try {
    const res = await fetch(`${baseUrl}/api/admin/all-products`, {
      method: "GET",
      cache: "no-store",
    });

    console.log("llll", res);
    const data = res;

    return data;
  } catch (error) {
    console.log(error);
  }
};

export const updateAProduct = async (formData) => {
  try {
    const res = await fetch(`${baseUrl}/api/admin/update-product`, {
      method: "PUT",
      headers: {
        "content-type": "application/json",
        Authorization: `Bearer ${Cookies.get("token")}`,
      },
      cache: "no-store",
      body: JSON.stringify(formData),
    });

    const data = await res.json();

    return data;
  } catch (e) {
    console.log(e);
  }
};

export const deleteAProduct = async (id) => {
  try {
    const res = await fetch(`${baseUrl}/api/admin/delete-product?id=${id}`, {
      method: "DELETE",
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

export const productByCategory = async (id) => {
  try {
    const res = await fetch(
      `${baseUrl}/api/admin/product-by-category?id=${id}`,
      {
        method: "GET",
        cache: "no-store",
      }
    );

    // Check if the response is OK and has content
    if (!res.ok) {
      throw new Error(`HTTP error! status: ${res.status}`);
    }

    const text = await res.text(); // Read response as text first

    // If response body is not empty, parse it as JSON
    if (text) {
      return JSON.parse(text);
    } else {
      console.warn("Empty response body");
      return {}; // Return an empty object if response is empty
    }
  } catch (error) {
    console.log("Error in productByCategory:", error);
    return null;
  }
};

export const productById = async (id) => {
  try {
    const res = await fetch(
      `${baseUrl}/api/admin/product-by-id?id=${id}`,
      {
        method: "GET",
        cache: "no-store",
      }
    );

    const data = await res.json();

    return data;
  } catch (e) {
    console.log(e);
  }
};
