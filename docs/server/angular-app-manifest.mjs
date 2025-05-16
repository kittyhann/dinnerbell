
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
    "route": "/dinnerbell/profile/user1@example.com"
  },
  {
    "renderMode": 2,
    "route": "/dinnerbell/profile/user2@example.com"
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
    'index.csr.html': {size: 7612, hash: '3a32f1196bf93936645a1201e7c63814ff4b3aea6569a7e52bb906443d5f7172', text: () => import('./assets-chunks/index_csr_html.mjs').then(m => m.default)},
    'index.server.html': {size: 7884, hash: '9139418348f2c0b03b70a8ba5276a927c6f6fa1eba0a7b952d68bc4a55d1bce2', text: () => import('./assets-chunks/index_server_html.mjs').then(m => m.default)},
    'profile/user1@example.com/index.html': {size: 16659, hash: 'd2db71a55ddf00069e4cc35030af889ba0f1da8298821f5a031cf14a8bb52507', text: () => import('./assets-chunks/profile_user1@example_com_index_html.mjs').then(m => m.default)},
    'index.html': {size: 20857, hash: 'dc0e2205892f34382b46465c9e39ff6c5f3671da6d071dd14a58245f9a628122', text: () => import('./assets-chunks/index_html.mjs').then(m => m.default)},
    'profile/index.html': {size: 20857, hash: 'dbe36bb13deab76de6b5226fc5e23ab183aacc36ee9245f7fbbeb8ee581f7b59', text: () => import('./assets-chunks/profile_index_html.mjs').then(m => m.default)},
    'contact/index.html': {size: 17068, hash: '913762d83f7c54213e0aa4143fe12baea858915e2e74aeee1a4a2f5a24ab2bfa', text: () => import('./assets-chunks/contact_index_html.mjs').then(m => m.default)},
    'admin-dashboard/index.html': {size: 16659, hash: 'd2db71a55ddf00069e4cc35030af889ba0f1da8298821f5a031cf14a8bb52507', text: () => import('./assets-chunks/admin-dashboard_index_html.mjs').then(m => m.default)},
    'admin/index.html': {size: 16659, hash: 'd2db71a55ddf00069e4cc35030af889ba0f1da8298821f5a031cf14a8bb52507', text: () => import('./assets-chunks/admin_index_html.mjs').then(m => m.default)},
    'admin-dashboard/user-list/index.html': {size: 16659, hash: 'd2db71a55ddf00069e4cc35030af889ba0f1da8298821f5a031cf14a8bb52507', text: () => import('./assets-chunks/admin-dashboard_user-list_index_html.mjs').then(m => m.default)},
    'profile/user2@example.com/index.html': {size: 16659, hash: 'd2db71a55ddf00069e4cc35030af889ba0f1da8298821f5a031cf14a8bb52507', text: () => import('./assets-chunks/profile_user2@example_com_index_html.mjs').then(m => m.default)},
    'styles-EAXBNCMW.css': {size: 2373, hash: 'loNWDoOIpA4', text: () => import('./assets-chunks/styles-EAXBNCMW_css.mjs').then(m => m.default)}
  },
};
