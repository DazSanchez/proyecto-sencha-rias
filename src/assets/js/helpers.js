((w, jq) => {
  const toggleClassMultiple = els => className => {
    els.forEach(el => el.classList.toggle(className));
  };

  const getUser = () => {
    const user = localStorage.getItem("user");
    return user ? JSON.parse(user) : null;
  };

  const logout = () => {
    localStorage.clear();
    location.href = "/";
  };

  const authenticate = () => {
    const user = getUser();

    if (user) {
      jq("#username-display").toggleClass("d-none");
      jq("#access-links").toggleClass("d-none");
      jq("#logout-btn").toggleClass("d-none");

      jq("#username").text(user.username);

      if (user.userRole == "ADMIN") {
        jq("#admin-add").toggleClass("d-none");
      }
    }
  };

  jq(document).ready(() => {
    jq("#logout-btn").click(() => {
      logout();
    });
  });

  w.Helpers = {
    logout,
    authenticate,
    getUser
  };
})(window, $);
