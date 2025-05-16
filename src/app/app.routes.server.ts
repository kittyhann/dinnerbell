import { RenderMode, ServerRoute } from '@angular/ssr';

export const serverRoutes: ServerRoute[] = [
  {
    path: 'profile/:email',
    renderMode: RenderMode.Prerender,
    getPrerenderParams: () => Promise.resolve([
      { email: 'user1@example.com' },
      { email: 'user2@example.com' },
      // Add more emails as needed
    ])
  },
  {
    path: '**',
    renderMode: RenderMode.Prerender
  }
];
