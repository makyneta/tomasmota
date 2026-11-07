(function () {
  const sessionKey = "makyneta_admin_session";
  const protectedPage = document.querySelector("[data-admin-protected]");
  const form = document.getElementById("login-form");

  if (form) {
    if (sessionStorage.getItem(sessionKey) === "authenticated") {
      window.location.replace("painel.html");
      return;
    }

    const message = document.getElementById("login-message");
    const button = document.getElementById("login-button");

    form.addEventListener("submit", async function (event) {
      event.preventDefault();
      message.textContent = "";
      message.classList.remove("form-message-error");
      button.disabled = true;
      button.querySelector("span").textContent = "Signing in…";

      const formData = new FormData(form);
      const email = String(formData.get("email")).trim().toLowerCase();
      const password = String(formData.get("password"));

      try {
        const input = new TextEncoder().encode(email + ":" + password);
        const digest = await crypto.subtle.digest("SHA-256", input);
        const verifier = btoa(String.fromCharCode.apply(null, new Uint8Array(digest)));

        if (verifier !== "/4xEqIPiRjOEHV+DMHBntgLz/aR47c5A3FKKXuvld/M=") {
          throw new Error("The email address or password is incorrect.");
        }

        sessionStorage.setItem(sessionKey, "authenticated");
        window.location.assign("painel.html");
      } catch (error) {
        message.textContent = error.message || "Could not verify your credentials. Please try again.";
        message.classList.add("form-message-error");
        button.disabled = false;
        button.querySelector("span").textContent = "Sign in";
      }
    });
  }

  if (protectedPage) {
    if (sessionStorage.getItem(sessionKey) !== "authenticated") {
      window.location.replace("index.html");
      return;
    }

    const profilePhoto = document.querySelector(".contact-photo-image");
    const photoPlaceholder = document.querySelector(".photo-placeholder");
    if (profilePhoto && photoPlaceholder) {
      const showPhotoPlaceholder = function () {
        profilePhoto.hidden = true;
        photoPlaceholder.hidden = false;
      };

      profilePhoto.addEventListener("error", showPhotoPlaceholder, { once: true });
      if (profilePhoto.complete && profilePhoto.naturalWidth === 0) {
        showPhotoPlaceholder();
      }
    }

    document.getElementById("auth-check").hidden = true;
    document.querySelector(".admin-app").hidden = false;

    const logoutButton = document.getElementById("logout-button");
    logoutButton.addEventListener("click", function () {
      sessionStorage.removeItem(sessionKey);
      window.location.replace("index.html");
    });
  }
}());
