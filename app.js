// Initialize Supabase
const supabaseUrl = "YOUR_SUPABASE_URL"; // From Step 3
const supabaseKey = "YOUR_SUPABASE_KEY"; // From Step 3
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