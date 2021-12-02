const $tabs = document.querySelector('.tabs');
const $spinner = document.querySelector('.spinner');

// eslint-disable-next-line arrow-body-style
const fetchTabsData = () => {
  return new Promise(resolve => {
    setTimeout(
      () =>
        resolve([
          {
            title: 'HTML',
            content: `HTML(HyperText Markup Language) is the most basic building block of the Web. It describes and defines the content of a webpage along with the basic layout of the webpage. Other technologies besides HTML are generally used to describe a web page's appearance/presentation(CSS) or functionality/ behavior(JavaScript).`,
          },
          {
            title: 'CSS',
            content: `Cascading Style Sheets(CSS) is a stylesheet language used to describe the presentation of a document written in HTML or XML (including XML dialects such as SVG, MathML or XHTML). CSS describes how elements should be rendered on screen, on paper, in speech, or on other media.`,
          },
          {
            title: 'JavaScript',
            content: `JavaScript(JS) is a lightweight interpreted or JIT-compiled programming language with first-class functions. While it is most well-known as the scripting language for Web pages, many non-browser environments also use it, such as Node.js, Apache CouchDB and Adobe Acrobat. JavaScript is a prototype-based, multi-paradigm, dynamic language, supporting object-oriented, imperative, and declarative (e.g. functional programming) styles.`,
          },
        ]),
      1000
    );
  });
};

fetchTabsData().then(menus => {
  $spinner.style.display = 'none';

  const tabs = menus
    .map(
      (menu, index) => `
    <div class="tab" data-index=${index}>${menu.title}</div>
    `
    )
    .join('');

  const tabContent = menus
    .map((menu, index) => `<div class="tab-content ${index === 0 ? 'active' : ''}">${menu.content}</div>`)
    .join('');

  $tabs.style.setProperty('--tabs-length', menus.length);
  $tabs.innerHTML = `<nav>
    ${tabs}
    <span class="glider"></span>
  </nav>
  ${tabContent}
  `;
});

$tabs.onclick = ({ target }) => {
  if (!target.classList.contains('tab')) return;

  const contents = [...$tabs.children].filter(node => node.classList.contains('tab-content'));

  const dataIndex = target.getAttribute('data-index');

  contents.forEach((content, index) => {
    content.classList.toggle('active', index === +dataIndex);
  });

  target.parentNode.lastElementChild.style.left =
    getComputedStyle($tabs).getPropertyValue('--tab-width') * dataIndex + 'px';
};
