/* Access gate for the prototype studio.
   Loaded first in <head> of every page. Shows a password window until the right
   password is entered; the choice is remembered on this device.
   Only a salted PBKDF2 hash is stored here, never the password itself.
   This is a client-side gate: it keeps casual visitors out, it is not server security. */
(function () {
  var HASH = '88d27e570d756f41b7d02b3a89db0733f195ff4dcedc80bb2f9de088487d23d2';
  var SALT = 'xmtrading-ideas-2027-195ba1fab62d5e63';
  var ITER = 200000;
  var KEY = 'xm.access';

  function stored() {
    try { return localStorage.getItem(KEY) || sessionStorage.getItem(KEY); } catch (e) { return null; }
  }
  if (stored() === HASH) return;

  var de = document.documentElement;
  de.classList.add('xm-locked');
  var st = document.createElement('style');
  st.textContent =
    'html.xm-locked{background:#0b0d10!important}' +
    'html.xm-locked body{visibility:hidden!important}' +
    '#xmGate{visibility:visible;position:fixed;inset:0;z-index:2147483647;display:flex;align-items:center;justify-content:center;padding:24px;' +
      'background:radial-gradient(1200px 600px at 50% -10%,#1d2128 0,#0b0d10 60%);' +
      'font-family:Poppins,Inter,-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,Helvetica,Arial,sans-serif;color:#1d2024}' +
    '#xmGate *{box-sizing:border-box}' +
    '#xmGate .xgc{width:100%;max-width:400px;background:#fff;border-radius:20px;padding:32px 28px 24px;box-shadow:0 24px 60px rgba(0,0,0,.45)}' +
    '#xmGate .xlg{font-style:italic;font-weight:800;font-size:20px;letter-spacing:.02em;margin-bottom:18px}' +
    '#xmGate .xlg b{color:#e5373f}' +
    '#xmGate h1{font-size:20px;line-height:1.3;margin:0 0 6px;font-weight:700}' +
    '#xmGate p{margin:0 0 18px;font-size:14px;line-height:1.5;color:#4a5058}' +
    '#xmGate .xfld{position:relative;margin-bottom:10px}' +
    '#xmGate input[type=password],#xmGate input[type=text]{width:100%;height:46px;border:1.5px solid #d6d9de;border-radius:12px;padding:0 64px 0 14px;font:inherit;font-size:15px;color:#1d2024;background:#fff;outline:0}' +
    '#xmGate input:focus{border-color:#008454;box-shadow:0 0 0 3px #e6f3ed}' +
    '#xmGate .bad input{border-color:#e5373f;box-shadow:0 0 0 3px #fdecee}' +
    '#xmGate .xtg{position:absolute;right:6px;top:6px;height:34px;padding:0 10px;border:0;border-radius:8px;background:transparent;color:#4a5058;font:inherit;font-size:13px;font-weight:600;cursor:pointer}' +
    '#xmGate .xtg:hover{background:#f1f2f4}' +
    '#xmGate .xer{min-height:20px;margin:0 0 6px;font-size:13px;color:#e5373f}' +
    '#xmGate label.xkp{display:flex;align-items:center;gap:8px;margin:0 0 16px;font-size:13px;color:#4a5058;cursor:pointer}' +
    '#xmGate label.xkp input{width:16px;height:16px;accent-color:#008454;margin:0}' +
    '#xmGate .xgo{width:100%;height:46px;border:0;border-radius:12px;background:#008454;color:#fff;font:inherit;font-size:15px;font-weight:600;cursor:pointer}' +
    '#xmGate .xgo:hover{background:#006b44}' +
    '#xmGate .xgo:disabled{opacity:.6;cursor:default}' +
    '#xmGate .xft{margin:14px 0 0;font-size:12px;color:#7b828b;text-align:center}' +
    '#xmGate .shake{animation:xmShake .35s}' +
    '@keyframes xmShake{20%,60%{transform:translateX(-6px)}40%,80%{transform:translateX(6px)}}';
  (document.head || de).appendChild(st);
  /* Locked pages inside a frame (previews) stay blank: only the top page asks, so it keeps keyboard focus. */
  if (window.top !== window) return;

  function hex(buf) {
    return Array.prototype.map.call(new Uint8Array(buf), function (b) { return ('0' + b.toString(16)).slice(-2); }).join('');
  }
  function derive(pw) {
    var enc = new TextEncoder();
    return crypto.subtle.importKey('raw', enc.encode(pw), 'PBKDF2', false, ['deriveBits']).then(function (k) {
      return crypto.subtle.deriveBits({ name: 'PBKDF2', salt: enc.encode(SALT), iterations: ITER, hash: 'SHA-256' }, k, 256);
    }).then(hex);
  }

  function build() {
    var g = document.createElement('div');
    g.id = 'xmGate';
    g.setAttribute('role', 'dialog');
    g.setAttribute('aria-modal', 'true');
    g.setAttribute('aria-label', 'Access password');
    g.innerHTML =
      '<form class="xgc" autocomplete="off">' +
        '<div class="xlg">XMTRADING<b>/</b></div>' +
        '<p>This workspace is private. Enter the access password to continue.</p>' +
        '<div class="xfld" id="xmF"><input type="password" id="xmPw" placeholder="Access password" aria-label="Access password" autocomplete="current-password" spellcheck="false" autocapitalize="off">' +
          '<button type="button" class="xtg" id="xmTg" aria-label="Show password">Show</button></div>' +
        '<div class="xer" id="xmEr" role="alert"></div>' +
        '<label class="xkp"><input type="checkbox" id="xmKp" checked> Keep me signed in on this device</label>' +
        '<button type="submit" class="xgo" id="xmGo">Continue</button>' +
        '<div class="xft">No password? Ask the product team.</div>' +
      '</form>';
    document.documentElement.appendChild(g);

    var form = g.querySelector('form'), pw = g.querySelector('#xmPw'), er = g.querySelector('#xmEr'),
        go = g.querySelector('#xmGo'), f = g.querySelector('#xmF'), tg = g.querySelector('#xmTg'), fails = 0;
    pw.focus();
    tg.addEventListener('click', function () {
      var show = pw.type === 'password';
      pw.type = show ? 'text' : 'password';
      tg.textContent = show ? 'Hide' : 'Show';
      tg.setAttribute('aria-label', show ? 'Hide password' : 'Show password');
      pw.focus();
    });
    pw.addEventListener('input', function () { f.classList.remove('bad'); er.textContent = ''; });

    form.addEventListener('submit', function (ev) {
      ev.preventDefault();
      if (go.disabled || !pw.value) return;
      if (!window.crypto || !crypto.subtle) { er.textContent = 'This browser cannot verify the password. Open the page over https.'; return; }
      go.disabled = true; go.textContent = 'Checking…';
      derive(pw.value).then(function (h) {
        if (h === HASH) {
          try {
            if (g.querySelector('#xmKp').checked) localStorage.setItem(KEY, HASH); else sessionStorage.setItem(KEY, HASH);
          } catch (e) {}
          location.reload();
          return;
        }
        fails++;
        f.classList.add('bad'); er.textContent = 'Wrong password. Try again.';
        form.classList.remove('shake'); void form.offsetWidth; form.classList.add('shake');
        pw.select();
        setTimeout(function () { go.disabled = false; go.textContent = 'Continue'; }, Math.min(fails, 5) * 600);
      }).catch(function () {
        go.disabled = false; go.textContent = 'Continue'; er.textContent = 'Something went wrong. Try again.';
      });
    });
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', build); else build();
})();
