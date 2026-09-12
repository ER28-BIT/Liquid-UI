// Example behavior only: no network, authorization, evidence mutation or payment.
const root = document.documentElement;
const theme = document.querySelector('#theme-toggle');
const transparency = document.querySelector('#transparency-toggle');
for (const id of ['preferences', 'record', 'allocation']) {
  document.querySelector(`#${id}-open`).addEventListener('click', () => document.querySelector(`#${id}`).showModal());
}
theme.addEventListener('click', () => {
  const dark = root.dataset.liquidTheme !== 'dark';
  root.dataset.liquidTheme = dark ? 'dark' : 'light';
  theme.setAttribute('aria-pressed', String(dark));
});
transparency.addEventListener('click', () => {
  const reduced = root.dataset.liquidTransparency !== 'reduced';
  root.dataset.liquidTransparency = reduced ? 'reduced' : 'default';
  transparency.setAttribute('aria-pressed', String(reduced));
});
const tabs = [...document.querySelectorAll('[role="tab"]')];
function activateTab(tab) {
  for (const item of tabs) {
    const selected = item === tab;
    item.setAttribute('aria-selected', String(selected));
    item.tabIndex = selected ? 0 : -1;
    document.getElementById(item.getAttribute('aria-controls')).hidden = !selected;
  }
}
for (const [index, tab] of tabs.entries()) {
  tab.addEventListener('click', () => activateTab(tab));
  tab.addEventListener('keydown', (event) => {
    let target;
    if (event.key === 'ArrowRight') target = tabs[(index + 1) % tabs.length];
    if (event.key === 'ArrowLeft') target = tabs[(index - 1 + tabs.length) % tabs.length];
    if (event.key === 'Home') target = tabs[0];
    if (event.key === 'End') target = tabs.at(-1);
    if (target) { event.preventDefault(); activateTab(target); target.focus(); }
  });
}
let toastOpener;
function showToast(message) {
  toastOpener = document.activeElement;
  document.querySelector('#toast-message').textContent = message;
  document.querySelector('#toast').hidden = false;
}
document.querySelector('#toast-trigger').addEventListener('click', () => showToast('Confirmation preview: your contribution has been acknowledged.'));
document.querySelector('#toast-dismiss').addEventListener('click', () => { document.querySelector('#toast').hidden = true; toastOpener?.focus(); });
document.querySelector('#sample-form').addEventListener('submit', (event) => {
  event.preventDefault();
  showToast('Saved note preview. This example stores no project data.');
});
