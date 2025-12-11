const SUPABASE_URL = "https://ebfgufvadojmhmvlgyzn.supabase.co";
const SUPABASE_API_KEY = 
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImViZmd1ZnZhZG9qbWhtdmxneXpuIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjUyMTM5NDQsImV4cCI6MjA4MDc4OTk0NH0.5Rp3IC4wiJsmeXtNSBe2NESn_IIMyXsGuCKQUb98ZbM";


async function saveData() {
  const nameValue = document.getElementById("nameInput").value;
  const emailValue = document.getElementById("emailInput").value;
  const messageValue = document.getElementById("messageInput").value;

  const contactData = {
    name: nameValue,
    email: emailValue,
    message: messageValue,
  };

  try {
    const response = await fetch(`${SUPABASE_URL}/rest/v1/leads`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        apikey: SUPABASE_API_KEY,
        Authorization: `Bearer ${SUPABASE_API_KEY}`,
      },
      body: JSON.stringify(contactData),
    });

    if (response.ok) {
      alert("Lead submitted successfully!");
      document.getElementById("nameInput").value = "";
      document.getElementById("emailInput").value = "";
      document.getElementById("messageInput").value = "";
    } else {
      alert("Error submitting lead.");
      console.log(await response.text());
    }
  } catch (error) {
    console.error("Network error:", error);
    alert("Network error. Check console for details.");
  }
}

const REST_ENDPOINT = `${SUPABASE_URL}/rest/v1/products`;

async function getProducts() {
  try {
    const response = await fetch(REST_ENDPOINT, {
      method: "GET",
      headers: {
        apikey: SUPABASE_API_KEY,
        Authorization: `Bearer ${SUPABASE_API_KEY}`,
      },
    });

    const products = await response.json();

    const container = document.getElementById("products-list");

    products.forEach((product) => {
      const card = document.createElement("div");
      card.className = "product-card";

      card.innerHTML = `
        <img src="${product.image_url}" alt="${product.name}" />
        <h3>${product.name}</h3>
        <p><strong>Price: $${product.price}</strong></p>
        <p>${product.description}</p>
      `;

      container.appendChild(card);
    });
  } catch (error) {
    console.error("Error fetching products:", error);
  }
}


window.onload = function () {
  getProducts();
};
