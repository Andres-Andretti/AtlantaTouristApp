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

/// Comment Constants ///
const commentSection = document.getElementById("commentSection");
const commentInput = document.getElementById("commentInput");
const btnComment = document.getElementById("btnComment");
const docTitle = document.querySelector("title");
const title = docTitle.textContent;

/// Comment Controller ///
function populateComments() {
  commentSection.innerHTML = "";
  db.collection(title)
    .get()
    .then((snapshot) => {
      snapshot.forEach((doc) => {
        let dataRaw = doc.data();
        let commentData = `
          <div class='commentWrapper'>
            <p class='userTitle'>${dataRaw.email}</p>
            <div class='comment'>
                <p><small>${dataRaw.content}</small></p>
            </div>
          </div>
      `;
        commentSection.innerHTML = commentData;
      });
    });
}

btnComment.addEventListener("click", (e) => {
  e.preventDefault();
  db.collection(title)
    .add({
      content: commentInput.value,
      email: userEmailRaw,
    })
    .then((docRef) => {
      populateComments();
    });
  populateComments();
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

var $navbarBurgers = Array.prototype.slice.call(
  document.querySelectorAll(".navbar-burger"),
  0
);

// Check if there are any navbar burgers
if ($navbarBurgers.length > 0) {
  // Add a click event on each of them
  $navbarBurgers.forEach(function ($el) {
    $el.addEventListener("click", function () {
      // Get the target from the "data-target" attribute
      var target = $el.dataset.target;
      var $target = document.getElementById(target);

      // Toggle the class on both the "navbar-burger" and the "navbar-menu"
      $el.classList.toggle("is-active");
      $target.classList.toggle("is-active");
    });
  });
}

document.querySelectorAll(".navbar-link").forEach(function (navbarLink) {
  navbarLink.addEventListener("click", function () {
    navbarLink.nextElementSibling.classList.toggle("is-hidden-mobile");
  });
});
