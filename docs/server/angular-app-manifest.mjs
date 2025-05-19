
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
    'index.csr.html': {size: 7612, hash: '42e2653f47ec2de541cba48fa6912a572c34e92e18bb2badc16180e920333b32', text: () => import('./assets-chunks/index_csr_html.mjs').then(m => m.default)},
    'index.server.html': {size: 7884, hash: '4fe77be245970682de952bd442dc5860a643636dd79a00e419fe535260291587', text: () => import('./assets-chunks/index_server_html.mjs').then(m => m.default)},
    'profile/index.html': {size: 21130, hash: 'e16f7f6d29329787d5a52df63f8db0953bf473cbcaa8ea2b05cb366f7e175037', text: () => import('./assets-chunks/profile_index_html.mjs').then(m => m.default)},
    'index.html': {size: 21130, hash: '42e0ded10eb9554db8322cf9582c24457abf8d45420f830bf8d9f8a9535e92d6', text: () => import('./assets-chunks/index_html.mjs').then(m => m.default)},
    'profile/hannahisraelagodin@yahoo.com.ph/index.html': {size: 20506, hash: '7c13c9b7eec0f3081babaf6eb6cc087191c00fc1fb1032d0915853725b0deab9', text: () => import('./assets-chunks/profile_hannahisraelagodin@yahoo_com_ph_index_html.mjs').then(m => m.default)},
    'contact/index.html': {size: 17236, hash: 'c3567eec814000909b817a181a5f328b3b79fdad8fb44340f5eaebd8d244d2fd', text: () => import('./assets-chunks/contact_index_html.mjs').then(m => m.default)},
    'admin/index.html': {size: 20506, hash: '7c13c9b7eec0f3081babaf6eb6cc087191c00fc1fb1032d0915853725b0deab9', text: () => import('./assets-chunks/admin_index_html.mjs').then(m => m.default)},
    'profile/markcleocalbang05@gmail.com/index.html': {size: 20506, hash: '7c13c9b7eec0f3081babaf6eb6cc087191c00fc1fb1032d0915853725b0deab9', text: () => import('./assets-chunks/profile_markcleocalbang05@gmail_com_index_html.mjs').then(m => m.default)},
    'admin-dashboard/user-list/index.html': {size: 20506, hash: '7c13c9b7eec0f3081babaf6eb6cc087191c00fc1fb1032d0915853725b0deab9', text: () => import('./assets-chunks/admin-dashboard_user-list_index_html.mjs').then(m => m.default)},
    'admin-dashboard/index.html': {size: 20506, hash: '7c13c9b7eec0f3081babaf6eb6cc087191c00fc1fb1032d0915853725b0deab9', text: () => import('./assets-chunks/admin-dashboard_index_html.mjs').then(m => m.default)},
    'profile/buzz3@gmail.com/index.html': {size: 20506, hash: '7c13c9b7eec0f3081babaf6eb6cc087191c00fc1fb1032d0915853725b0deab9', text: () => import('./assets-chunks/profile_buzz3@gmail_com_index_html.mjs').then(m => m.default)},
    'styles-EAXBNCMW.css': {size: 2373, hash: 'loNWDoOIpA4', text: () => import('./assets-chunks/styles-EAXBNCMW_css.mjs').then(m => m.default)}
  },
};
