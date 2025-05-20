
export default {
  bootstrap: () => import('./main.server.mjs').then(m => m.default),
  inlineCriticalCss: true,
  baseHref: '/dinnerbell/',
  locale: undefined,
  routes: [
  {
    "renderMode": 2,
    "route": "/dinnerbell"
  },
  {
    "renderMode": 2,
    "route": "/dinnerbell/profile"
  },
  {
    "renderMode": 2,
    "route": "/dinnerbell/profile/hannahisraelagodin@yahoo.com.ph"
  },
  {
    "renderMode": 2,
    "route": "/dinnerbell/profile/buzz3@gmail.com"
  },
  {
    "renderMode": 2,
    "route": "/dinnerbell/profile/markcleocalbang05@gmail.com"
  },
  {
    "renderMode": 0,
    "route": "/dinnerbell/profile/*"
  },
  {
    "renderMode": 2,
    "route": "/dinnerbell/contact"
  },
  {
    "renderMode": 2,
    "route": "/dinnerbell/admin"
  },
  {
    "renderMode": 2,
    "route": "/dinnerbell/admin-dashboard"
  },
  {
    "renderMode": 2,
    "route": "/dinnerbell/admin-dashboard/user-list"
  }
],
  entryPointToBrowserMapping: undefined,
  assets: {
    'index.csr.html': {size: 7612, hash: 'e223b07bbf15a3853ad99cae04b84883c5c951da755ed0df973728b84b5f62ca', text: () => import('./assets-chunks/index_csr_html.mjs').then(m => m.default)},
    'index.server.html': {size: 7884, hash: '36799438acb54d61976e8fb409b042ef2dd917b92931ab7e3b9053598da57c68', text: () => import('./assets-chunks/index_server_html.mjs').then(m => m.default)},
    'index.html': {size: 19699, hash: '634e3953eafc717e5b748cfb887916e47f097b9d296713e03c7209127994a076', text: () => import('./assets-chunks/index_html.mjs').then(m => m.default)},
    'profile/index.html': {size: 19699, hash: '4d74375135c602993e1e3f96772e5f6bea87cdc3b1b4ccc4dfca4b6f65ec4d41', text: () => import('./assets-chunks/profile_index_html.mjs').then(m => m.default)},
    'profile/hannahisraelagodin@yahoo.com.ph/index.html': {size: 20474, hash: 'afce6af7f8f13dfadef56858bd2d08fd7ef5d54a6b6a66e2394263842d7fb391', text: () => import('./assets-chunks/profile_hannahisraelagodin@yahoo_com_ph_index_html.mjs').then(m => m.default)},
    'profile/buzz3@gmail.com/index.html': {size: 20474, hash: 'afce6af7f8f13dfadef56858bd2d08fd7ef5d54a6b6a66e2394263842d7fb391', text: () => import('./assets-chunks/profile_buzz3@gmail_com_index_html.mjs').then(m => m.default)},
    'contact/index.html': {size: 17236, hash: 'f53758985fbdaf6022213fddb0b6fa6377fb8fcba8bbae53df096cca86d94509', text: () => import('./assets-chunks/contact_index_html.mjs').then(m => m.default)},
    'admin/index.html': {size: 20474, hash: 'afce6af7f8f13dfadef56858bd2d08fd7ef5d54a6b6a66e2394263842d7fb391', text: () => import('./assets-chunks/admin_index_html.mjs').then(m => m.default)},
    'profile/markcleocalbang05@gmail.com/index.html': {size: 20474, hash: 'afce6af7f8f13dfadef56858bd2d08fd7ef5d54a6b6a66e2394263842d7fb391', text: () => import('./assets-chunks/profile_markcleocalbang05@gmail_com_index_html.mjs').then(m => m.default)},
    'admin-dashboard/index.html': {size: 20474, hash: 'afce6af7f8f13dfadef56858bd2d08fd7ef5d54a6b6a66e2394263842d7fb391', text: () => import('./assets-chunks/admin-dashboard_index_html.mjs').then(m => m.default)},
    'admin-dashboard/user-list/index.html': {size: 20474, hash: 'afce6af7f8f13dfadef56858bd2d08fd7ef5d54a6b6a66e2394263842d7fb391', text: () => import('./assets-chunks/admin-dashboard_user-list_index_html.mjs').then(m => m.default)},
    'styles-EAXBNCMW.css': {size: 2373, hash: 'loNWDoOIpA4', text: () => import('./assets-chunks/styles-EAXBNCMW_css.mjs').then(m => m.default)}
  },
};
