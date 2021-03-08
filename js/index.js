/// Auth Constants ///
const userEmail = document.getElementById("userEmailInput");
const userPass = document.getElementById("userPassInput");
const logIn = document.getElementById("logIn");
const logOut = document.getElementById("logOut");
const signUp = document.getElementById("signUp");

/// Auth ///
logIn.addEventListener("click", (e) => {
  const email = userEmail.value;
  const pass = userPass.value;
  const promise = auth.signInWithEmailAndPassword(email, pass);
  promise.catch((e) => console.log(e.message));
});

signUp.addEventListener("click", () => {
  const email = userEmail.value;
  const pass = userPass.value;
  const promise = auth.createUserWithEmailAndPassword(email, pass);
  promise.catch((e) => console.log(e.message));
});

logOut.addEventListener("click", () => {
  auth.signOut();
});

/// Realtime Listener ///
auth.onAuthStateChanged((firebaseUser) => {
  if (firebaseUser) {
    /// If user is logged in, stores user ID in a variable and displays site content
    userID = firebaseUser.uid;
    userEmailRaw = firebaseUser.email;
    logOut.classList.remove("hidden");
    userEmail.classList.add("hidden");
    userPass.classList.add("hidden");
    logIn.classList.add("hidden");
    signUp.classList.add("hidden");
    //submitWrapper.classList.remove("hidden");
    //contentWrapper.classList.remove("hidden");
  } else {
    /// If not signed in, hides site content aside from auth field
    console.log("Not signed in");
    logOut.classList.add("hidden");
    userEmail.classList.remove("hidden");
    userPass.classList.remove("hidden");
    logIn.classList.remove("hidden");
    signUp.classList.remove("hidden");
    //submitWrapper.classList.add("hidden");
    //contentWrapper.classList.add("hidden");
  }
});
