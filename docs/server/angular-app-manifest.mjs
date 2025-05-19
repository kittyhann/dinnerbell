
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
    'index.csr.html': {size: 7612, hash: '610bf329e0a37acc8020ea8b65ccaf3ff8eb90bdee613870331b401f7a88dcd6', text: () => import('./assets-chunks/index_csr_html.mjs').then(m => m.default)},
    'index.server.html': {size: 7884, hash: 'd356b5ce00469ff0b09c35d188f0ad31476dceee9626990fc51faea30fdaaaec', text: () => import('./assets-chunks/index_server_html.mjs').then(m => m.default)},
    'profile/hannahisraelagodin@yahoo.com.ph/index.html': {size: 20558, hash: '88e65a5bc5a296e6161e63505e0d02f090dae2d2d29b1700f4eb53358db15958', text: () => import('./assets-chunks/profile_hannahisraelagodin@yahoo_com_ph_index_html.mjs').then(m => m.default)},
    'profile/index.html': {size: 21130, hash: 'c8e3ed2e1e9e73113a2930120de9365e44480cff06d0924ea83d9e8cfccf0ac8', text: () => import('./assets-chunks/profile_index_html.mjs').then(m => m.default)},
    'profile/buzz3@gmail.com/index.html': {size: 20558, hash: '88e65a5bc5a296e6161e63505e0d02f090dae2d2d29b1700f4eb53358db15958', text: () => import('./assets-chunks/profile_buzz3@gmail_com_index_html.mjs').then(m => m.default)},
    'index.html': {size: 21130, hash: 'e2c55c956bef799b0fd52f6f289665eccaa857c5693ade0a985b3607210ece2e', text: () => import('./assets-chunks/index_html.mjs').then(m => m.default)},
    'profile/markcleocalbang05@gmail.com/index.html': {size: 20558, hash: '88e65a5bc5a296e6161e63505e0d02f090dae2d2d29b1700f4eb53358db15958', text: () => import('./assets-chunks/profile_markcleocalbang05@gmail_com_index_html.mjs').then(m => m.default)},
    'contact/index.html': {size: 17236, hash: '4fa59a9e129b15526e58f2a7fd41c076c2875746ce88e29130f0f0275287fd38', text: () => import('./assets-chunks/contact_index_html.mjs').then(m => m.default)},
    'admin/index.html': {size: 20558, hash: '88e65a5bc5a296e6161e63505e0d02f090dae2d2d29b1700f4eb53358db15958', text: () => import('./assets-chunks/admin_index_html.mjs').then(m => m.default)},
    'admin-dashboard/user-list/index.html': {size: 20558, hash: '88e65a5bc5a296e6161e63505e0d02f090dae2d2d29b1700f4eb53358db15958', text: () => import('./assets-chunks/admin-dashboard_user-list_index_html.mjs').then(m => m.default)},
    'admin-dashboard/index.html': {size: 20558, hash: '88e65a5bc5a296e6161e63505e0d02f090dae2d2d29b1700f4eb53358db15958', text: () => import('./assets-chunks/admin-dashboard_index_html.mjs').then(m => m.default)},
    'styles-EAXBNCMW.css': {size: 2373, hash: 'loNWDoOIpA4', text: () => import('./assets-chunks/styles-EAXBNCMW_css.mjs').then(m => m.default)}
  },
};
