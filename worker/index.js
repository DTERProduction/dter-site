// Petit service côté Cloudflare. Il fait deux choses :
// 1. la connexion du CMS (dter.eu/admin) à GitHub, via /api/auth et /api/callback ;
// 2. la redirection de www.dter.eu vers dter.eu.
// Tout le reste est servi tel quel depuis le dossier du site.
// Les deux secrets GITHUB_CLIENT_ID et GITHUB_CLIENT_SECRET se règlent dans Cloudflare, jamais dans le code.

const html = (body, status = 200) =>
  new Response(`<!doctype html><meta charset="utf-8"><title>Connexion</title><body style="font-family:sans-serif;padding:32px">${body}</body>`, {
    status,
    headers: { 'Content-Type': 'text/html; charset=utf-8', 'Cache-Control': 'no-store' },
  });

export default {
  async fetch(request, env) {
    const url = new URL(request.url);

    if (url.hostname === 'www.dter.eu') {
      url.hostname = 'dter.eu';
      return Response.redirect(url.href, 301);
    }

    if (url.pathname === '/api/auth') {
      if (!env.GITHUB_CLIENT_ID) return html('La connexion à GitHub n’est pas encore configurée.', 503);
      const state = crypto.randomUUID();
      const to = new URL('https://github.com/login/oauth/authorize');
      to.searchParams.set('client_id', env.GITHUB_CLIENT_ID);
      to.searchParams.set('redirect_uri', `${url.origin}/api/callback`);
      to.searchParams.set('scope', 'repo,user');
      to.searchParams.set('state', state);
      return new Response(null, {
        status: 302,
        headers: { Location: to.href, 'Set-Cookie': `cms_state=${state}; Path=/api; HttpOnly; Secure; SameSite=Lax; Max-Age=600` },
      });
    }

    if (url.pathname === '/api/callback') {
      const code = url.searchParams.get('code');
      const state = url.searchParams.get('state');
      const cookie = (request.headers.get('Cookie') || '').match(/(?:^|;\s*)cms_state=([^;]+)/)?.[1];
      if (!code || !state || state !== cookie) return html('Connexion refusée : la demande a expiré. Fermez cette fenêtre et réessayez.', 400);

      const res = await fetch('https://github.com/login/oauth/access_token', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json', 'User-Agent': 'dter-site' },
        body: JSON.stringify({ client_id: env.GITHUB_CLIENT_ID, client_secret: env.GITHUB_CLIENT_SECRET, code }),
      });
      const data = await res.json().catch(() => ({}));
      const ok = Boolean(data.access_token);
      const message = ok
        ? `authorization:github:success:${JSON.stringify({ token: data.access_token, provider: 'github' })}`
        : `authorization:github:error:${JSON.stringify({ error: data.error_description || data.error || 'échec' })}`;

      // Le jeton est remis à la fenêtre du CMS, et seulement à elle : même adresse que ce service.
      return html(`<p>${ok ? 'Connexion réussie, vous pouvez fermer cette fenêtre.' : 'La connexion a échoué.'}</p>
<script>
  (function () {
    var origin = ${JSON.stringify(url.origin)};
    var message = ${JSON.stringify(message)};
    function receive(e) {
      if (e.origin !== origin) return;
      window.opener.postMessage(message, origin);
      window.removeEventListener('message', receive, false);
    }
    if (!window.opener) return;
    window.addEventListener('message', receive, false);
    window.opener.postMessage('authorizing:github', origin);
  })();
</script>`);
    }

    return env.ASSETS.fetch(request);
  },
};
