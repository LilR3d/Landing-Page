async function saveData() {
  const nameValue = document.getElementById("nameInput").value;
  const emailValue = document.getElementById("emailInput").value;
  const messageValue = document.getElementById("messageInput").value;

  const contactData = {
    name: nameValue,
    email: emailValue,
    message: messageValue,
  };

  const SUPABASE_URL = "https://ebfgufvadojmhmvlgyzn.supabase.co";
  const SUPABASE_API_KEY =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImViZmd1ZnZhZG9qbWhtdmxneXpuIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjUyMTM5NDQsImV4cCI6MjA4MDc4OTk0NH0.5Rp3IC4wiJsmeXtNSBe2NESn_IIMyXsGuCKQUb98ZbM";

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
