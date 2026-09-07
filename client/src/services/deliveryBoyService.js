const API_URL = "http://localhost:8080/api/delivery/boy";

// Get orders assigned to logged-in delivery boy
export const getDeliveryBoyOrders = async (token) => {
  const response = await fetch(`${API_URL}/orders`, {
    method: "GET",
    headers: {
      Accept: "*/*",
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    throw new Error(`Failed to fetch orders: ${response.status}`);
  }

  return await response.json();
};

// Update order status
export const updateOrderStatus = async (orderId, status, token) => {
  const response = await fetch(
    `${API_URL}/orders/${orderId}/status`,
    {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Accept: "*/*",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        status,
      }),
    }
  );

  if (!response.ok) {
    throw new Error(
      `Failed to update status: ${response.status}`
    );
  }

  return await response.json();
};
