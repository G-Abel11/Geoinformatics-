// Initialize Supabase
const { createClient } = supabase;
const supabaseUrl = "https://kdwetxwmfxiikcistisi.supabase.co";
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imtkd2V0eHdtZnhpaWtjaXN0aXNpIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTUxNTYzMjMsImV4cCI6MjA3MDczMjMyM30.hV09dKEcn0vo2Z17vNmBg6FhsA52wfR6_b4uoid6pXQ";
const supabaseClient = createClient(supabaseUrl, supabaseKey);

// Enhanced Sign Up Function
async function signUp() {
  const name = document.getElementById("name").value;
  const email = document.getElementById("email").value;
  const phone = document.getElementById("phone").value;
  const password = document.getElementById("password").value;

  // 1. Sign up the user
  const { data: authData, error: authError } = await supabaseClient.auth.signUp({
    email: email,
    password: password,
  });

  if (authError) {
    alert("Authentication error: " + authError.message);
    return;
  }

  // 2. Wait briefly for the auth session to initialize
  await new Promise(resolve => setTimeout(resolve, 1000));

  // 3. Insert profile data
  const { error: profileError } = await supabaseClient
    .from('profiles')
    .insert([
      { 
        user_id: authData.user.id,
        name: name,
        phone: phone 
      }
    ]);

  if (profileError) {
    alert("Profile creation error: " + profileError.message);
    return;
  }

  alert("Account created successfully! Please check your email for verification.");
  checkUser();
}

// Enhanced User Check
async function checkUser() {
  const { data: { user } } = await supabaseClient.auth.getUser();
  
  if (user) {
    // Get the user's profile data
    const { data: profile, error } = await supabaseClient
      .from('profiles')
      .select('name, phone')
      .eq('user_id', user.id)
      .single();

    document.getElementById("user-info").innerHTML = `
      Welcome, ${profile?.name || user.email}!<br>
      Phone: ${profile?.phone || 'Not provided'}<br>
      <button onclick="logout()">Logout</button>
    `;
  } else {
    document.getElementById("user-info").innerHTML = "Not logged in.";
  }
}

// Logout function remains the same
async function logout() {
  await supabaseClient.auth.signOut();
  checkUser();
}

// Initialize check on page load
checkUser();