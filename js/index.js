/// Dropdown Constants ///
const education = document.getElementById("education");
const recreation = document.getElementById("recreation");
const dining = document.getElementById("dining");
const btnEducation = document.getElementById("btnEducation");
const btnRecreation = document.getElementById("btnRecreation");
const btnDining = document.getElementById("btnDining");

/// Dropdown Controller ///
btnEducation.addEventListener("click", (e) => {
  e.preventDefault();
  education.classList.toggle("is-active");
});

btnRecreation.addEventListener("click", (e) => {
  e.preventDefault();
  recreation.classList.toggle("is-active");
});

btnDining.addEventListener("click", (e) => {
  e.preventDefault();
  dining.classList.toggle("is-active");
});

/// Auth Constants ///
const userEmail = document.getElementById("userEmailInput");
const userPass = document.getElementById("userPassInput");
const logIn = document.getElementById("logIn");
const logOut = document.getElementById("logOut");
const signUp = document.getElementById("signUp");
const signIn = document.getElementById("signIn");

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
    console.log("Signed in");
    userID = firebaseUser.uid;
    userEmailRaw = firebaseUser.email;
    logOut.classList.remove("hidden");
    signIn.classList.add("hidden");
    //submitWrapper.classList.remove("hidden");
    //contentWrapper.classList.remove("hidden");
  } else {
    /// If not signed in, hides site content aside from auth field
    console.log("Not signed in");
    logOut.classList.add("hidden");
    signIn.classList.remove("hidden");
    //submitWrapper.classList.add("hidden");
    //contentWrapper.classList.add("hidden");
  }
});
