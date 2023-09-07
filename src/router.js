

export class Router {
  routes = {};

  add(routeName, page) {
    this.routes[routeName] = page;
  }

  route(event) {
    event = event || window.event;

    window.history.pushState({}, "", event.target.href);

    event.preventDefault();

    this.handle();
  }

  handle() {
    const { pathname } = window.location;

    const route = this.routes[pathname] || this.routes[404];

    this.alterBackground(route);

    fetch(route)
      .then((data) => data.text())
      .then(html => {
        document.querySelector(".app").innerHTML = html;
      });
  }

  alterBackground(pathname) {
    switch (pathname) {
      case "/pages/universe.html":
        document.querySelector("body").style.backgroundImage = "url('./assets/mountains-universe-2.png')";
        break;
      case "/pages/exploration.html":
        document.querySelector("body").style.backgroundImage = "url('./assets/mountains-universe-3.png')";
        break;
      default:
        document.querySelector("body").style.backgroundImage = "url('./assets/mountains-universe-1.png')";

    }

  }
}