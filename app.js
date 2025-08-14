// Initialize Supabase
const supabaseUrl = "https://kdwetxwmfxiikcistisi.supabase.co"; // From Step 3
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imtkd2V0eHdtZnhpaWtjaXN0aXNpIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTUxNTYzMjMsImV4cCI6MjA3MDczMjMyM30.hV09dKEcn0vo2Z17vNmBg6FhsA52wfR6_b4uoid6pXQ"; // From Step 3
const supabase = supabase.createClient(supabaseUrl, supabaseKey);

// Sign Up Function
async function signUp() {
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;
  
  const { data, error } = await supabase.auth.signUp({
    email: email,
    password: password,
  });

  if (error) {
    alert("Error: " + error.message);
  } else {
    alert("Check your email for confirmation!");
  }
}

// Login Function
async function login() {
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;
  
  const { data, error } = await supabase.auth.signInWithPassword({
    email: email,
    password: password,
  });

  if (error) {
    alert("Error: " + error.message);
  } else {
    alert("Logged in as: " + data.user.email);
    checkUser(); // Update UI
  }
}

// Check if User is Logged In
async function checkUser() {
  const { data: { user } } = await supabase.auth.getUser();
  
  if (user) {
    document.getElementById("user-info").innerHTML = `
      Welcome, ${user.email}! 
      <button onclick="logout()">Logout</button>
    `;
  } else {
    document.getElementById("user-info").innerHTML = "Not logged in.";
  }
}

// Logout Function
async function logout() {
  await supabase.auth.signOut();
  checkUser(); // Update UI
}

// Check user on page load
checkUser();