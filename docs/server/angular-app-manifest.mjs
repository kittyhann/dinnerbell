
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
    'index.csr.html': {size: 7612, hash: '0c7596a88eec77e19148ddfc7cdf9a430d221e7f9009aab67c18cedf71d47bac', text: () => import('./assets-chunks/index_csr_html.mjs').then(m => m.default)},
    'index.server.html': {size: 7884, hash: 'ec70b859634e277c2bb09bbbe4cd7d4ea6165ff51745ea1ecad142b5dccbacda', text: () => import('./assets-chunks/index_server_html.mjs').then(m => m.default)},
    'index.html': {size: 23218, hash: 'ba66ba5dbbd3fbdec4cefd639c66cb57a0eedc68d7906478808aa3c90df7d46a', text: () => import('./assets-chunks/index_html.mjs').then(m => m.default)},
    'profile/index.html': {size: 23218, hash: '8091ae84778d625c117130e568253200862a5eb0bb058420d4698fa304460b70', text: () => import('./assets-chunks/profile_index_html.mjs').then(m => m.default)},
    'profile/hannahisraelagodin@yahoo.com.ph/index.html': {size: 20731, hash: '124baf37074ec177a3efee837272cc092bb4da19d9b5d172b425b153eba7e8b1', text: () => import('./assets-chunks/profile_hannahisraelagodin@yahoo_com_ph_index_html.mjs').then(m => m.default)},
    'profile/buzz3@gmail.com/index.html': {size: 20731, hash: '124baf37074ec177a3efee837272cc092bb4da19d9b5d172b425b153eba7e8b1', text: () => import('./assets-chunks/profile_buzz3@gmail_com_index_html.mjs').then(m => m.default)},
    'contact/index.html': {size: 17236, hash: '3bd709792897f88ba4c4d889d80c31b68c4b05d362b8ef716e41e0d73a1141b5', text: () => import('./assets-chunks/contact_index_html.mjs').then(m => m.default)},
    'admin-dashboard/index.html': {size: 20731, hash: '124baf37074ec177a3efee837272cc092bb4da19d9b5d172b425b153eba7e8b1', text: () => import('./assets-chunks/admin-dashboard_index_html.mjs').then(m => m.default)},
    'admin/index.html': {size: 20731, hash: '124baf37074ec177a3efee837272cc092bb4da19d9b5d172b425b153eba7e8b1', text: () => import('./assets-chunks/admin_index_html.mjs').then(m => m.default)},
    'profile/markcleocalbang05@gmail.com/index.html': {size: 20731, hash: '124baf37074ec177a3efee837272cc092bb4da19d9b5d172b425b153eba7e8b1', text: () => import('./assets-chunks/profile_markcleocalbang05@gmail_com_index_html.mjs').then(m => m.default)},
    'admin-dashboard/user-list/index.html': {size: 20731, hash: '124baf37074ec177a3efee837272cc092bb4da19d9b5d172b425b153eba7e8b1', text: () => import('./assets-chunks/admin-dashboard_user-list_index_html.mjs').then(m => m.default)},
    'styles-EAXBNCMW.css': {size: 2373, hash: 'loNWDoOIpA4', text: () => import('./assets-chunks/styles-EAXBNCMW_css.mjs').then(m => m.default)}
  },
};
