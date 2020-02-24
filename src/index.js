// Placeholder
import mdSrc from './source.md';
import showdown from 'showdown';

function convert() {
  const cnv = new showdown.Converter();
  let src = mdSrc;
  if (process.env.NODE_ENV === 'test') {
    src = '# Test';
  }
  const html = cnv.makeHtml(src);
  return html;
}

(() => {
  const body = document.body;
  const container = document.createElement("div");
  container.setAttribute("id", "container");
  container.setAttribute("class", "content");
  body.appendChild(container);
  const html = convert();
  container.innerHTML = html;
})();

