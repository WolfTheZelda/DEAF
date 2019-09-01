import Vue from "vue"
import App from "./App.vue";

import store from "./store";
import router from "./router";

import "animate.css";
import "material-icons";

import "quill";
import "quill/dist/quill.core.css";
import "quill/dist/quill.snow.css";
import "quill/dist/quill.bubble.css";

import "materialize-css";
import "materialize-css/dist/css/materialize.min.css";

import {
  rtdbPlugin
} from "vuefire";

import {
  mixin
} from "./mixin";

// Vue Config
Vue.config.productionTip = false;

if (process.env.NODE_ENV === "development") {
  Vue.config.devtools = true;
  Vue.config.performance = true;
  Vue.config.silent = false;
} else if (process.env.NODE_ENV === "production") {
  Vue.config.devtools = false;
  Vue.config.performance = false;
  Vue.config.silent = true;
}

// Vue Use
Vue.use(rtdbPlugin);

// This callback runs before every route change, including on page load.
router.beforeEach((to, from, next) => {
  // This goes through the matched routes from last to first, finding the closest route with a title.
  // eg. if we have /some/deep/nested/route and /some, /deep, and /nested have titles, nested's will be chosen.
  const nearestWithTitle = to.matched.slice().reverse().find(r => r.meta && r.meta.title);

  // Find the nearest route element with meta tags.
  const nearestWithMeta = to.matched.slice().reverse().find(r => r.meta && r.meta.metaTags);
  // const previousNearestWithMeta = from.matched.slice().reverse().find(r => r.meta && r.meta.metaTags);

  // If a route with a title was found, set the document (page) title to that value.
  if (nearestWithTitle) document.title = nearestWithTitle.meta.title;

  // Remove any stale meta tags from the document using the key attribute we set below.
  Array.from(document.querySelectorAll('[data-vue-router-controlled]')).map(el => el.parentNode.removeChild(el));

  // Skip rendering meta tags if there are none.
  if (!nearestWithMeta) return next();

  // Turn the meta tag definitions into actual elements in the head.
  nearestWithMeta.meta.metaTags.map(tagDef => {
      const tag = document.createElement('meta');

      Object.keys(tagDef).forEach(key => {
        tag.setAttribute(key, tagDef[key]);
      });

      // We use this to track which meta tags we create, so we don't interfere with other ones.
      tag.setAttribute('data-vue-router-controlled', '');

      return tag;
    })
    // Add the meta tags to the document head.
    .forEach(tag => document.head.appendChild(tag));

  next();
});

// Vue Instance
new Vue({
    router,
    store,
    mixins: [mixin],
    render: h => h(App)
  })
  .$mount("#app");