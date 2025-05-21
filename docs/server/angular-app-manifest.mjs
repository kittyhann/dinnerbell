
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
    'index.csr.html': {size: 7612, hash: '68e86ad740f849828cb06378b0a250dab1de643ba0feafbde7aa296061c5d077', text: () => import('./assets-chunks/index_csr_html.mjs').then(m => m.default)},
    'index.server.html': {size: 7884, hash: 'd9952d98c882dbe93b58bcdce2808fb76720055f631298f242a97177fa11f78d', text: () => import('./assets-chunks/index_server_html.mjs').then(m => m.default)},
    'index.html': {size: 23247, hash: '3d7f8193177568fa0d0e825f6eba2821011f4fad379dc084eafccf12c3fe0abd', text: () => import('./assets-chunks/index_html.mjs').then(m => m.default)},
    'profile/buzz3@gmail.com/index.html': {size: 20731, hash: 'fbbac801cb14f702be12745f29180921d42b55ef4e81e983f8a53851b1262f1b', text: () => import('./assets-chunks/profile_buzz3@gmail_com_index_html.mjs').then(m => m.default)},
    'profile/index.html': {size: 23247, hash: '10b8cffa178a46bd1b455a5d7b1002dbc5dacfcda9fb2b46e246a4d47d4bdbd2', text: () => import('./assets-chunks/profile_index_html.mjs').then(m => m.default)},
    'profile/hannahisraelagodin@yahoo.com.ph/index.html': {size: 20731, hash: 'fbbac801cb14f702be12745f29180921d42b55ef4e81e983f8a53851b1262f1b', text: () => import('./assets-chunks/profile_hannahisraelagodin@yahoo_com_ph_index_html.mjs').then(m => m.default)},
    'admin-dashboard/index.html': {size: 20731, hash: 'fbbac801cb14f702be12745f29180921d42b55ef4e81e983f8a53851b1262f1b', text: () => import('./assets-chunks/admin-dashboard_index_html.mjs').then(m => m.default)},
    'contact/index.html': {size: 17236, hash: '102e13b43fcc9c67e1ccfa4a81829735cec853767efc290ca2fe35c9799ce114', text: () => import('./assets-chunks/contact_index_html.mjs').then(m => m.default)},
    'admin/index.html': {size: 20731, hash: 'fbbac801cb14f702be12745f29180921d42b55ef4e81e983f8a53851b1262f1b', text: () => import('./assets-chunks/admin_index_html.mjs').then(m => m.default)},
    'profile/markcleocalbang05@gmail.com/index.html': {size: 20731, hash: 'fbbac801cb14f702be12745f29180921d42b55ef4e81e983f8a53851b1262f1b', text: () => import('./assets-chunks/profile_markcleocalbang05@gmail_com_index_html.mjs').then(m => m.default)},
    'admin-dashboard/user-list/index.html': {size: 20731, hash: 'fbbac801cb14f702be12745f29180921d42b55ef4e81e983f8a53851b1262f1b', text: () => import('./assets-chunks/admin-dashboard_user-list_index_html.mjs').then(m => m.default)},
    'styles-EAXBNCMW.css': {size: 2373, hash: 'loNWDoOIpA4', text: () => import('./assets-chunks/styles-EAXBNCMW_css.mjs').then(m => m.default)}
  },
};
