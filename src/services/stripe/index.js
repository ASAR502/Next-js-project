import Cookies from "js-cookie";
 const baseUrl =process.env.NEXT_PUBLIC_API_URL;
export const callStripeSession = async (formData) => {
  try {
    const res = await fetch(`${baseUrl}/api/stripe`, {
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
