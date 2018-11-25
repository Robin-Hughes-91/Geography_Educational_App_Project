const PubSub = require('../helpers/pub_sub.js');

const PinnedCountryView =  function (container, country) {
  this.container = container;
  this.country = country;
};

PinnedCountryView.prototype.render = function () {
  const countryContainer = this.createDiv('pinned-country-container');
  const countryName = this.createTextElement('p', this.country.name, 'pinned-country-name');
  const notesFormHeading = this.createTextElement('p', 'Add your own notes on this country', 'pinned-country-notes-heading');
  const notesForm = this.createNotesForm();
  const notesHeading = this.createTextElement('p', 'Notes', 'pinned-country-notes-heading');
  const notes = this.createTextElement('p', this.country.notes, 'pinned-country-notes');
  const showInfoButton = this.createShowInfoButton();
  const removeButton = this.createRemoveButton();

  countryContainer.appendChild(countryName);
  countryContainer.appendChild(notesFormHeading);
  countryContainer.appendChild(notesForm);
  countryContainer.appendChild(notesHeading);
  countryContainer.appendChild(notes);
  countryContainer.appendChild(showInfoButton);
  countryContainer.appendChild(removeButton);

  this.container.appendChild(countryContainer);
};

PinnedCountryView.prototype.createButton = function (textContent, cssClass) {
  const button = document.createElement('button');
  button.textContent = textContent;
  button.classList.add(cssClass);
  return button;
};

PinnedCountryView.prototype.createRemoveButton = function () {
  const removeButton = this.createButton('Remove from pinned countries', 'pinned-country-remove-button');
  removeButton.addEventListener('click', (event) => {
    PubSub.publish('PinnedCountryView:remove-button-clicked', this.country);
  });
  return removeButton;
};

PinnedCountryView.prototype.createShowInfoButton = function () {
  const showInfoButton = this.createButton('Show Country Info', 'pinned-country-show-info-button');
  showInfoButton.addEventListener('click', (event) => {
    PubSub.publish('Countries:selected-country-ready', this.country);
  });
  return showInfoButton;
};

PinnedCountryView.prototype.createTextElement = function (type, textContent, cssClass) {
  const element = document.createElement(type);
  element.textContent = textContent;
  element.classList.add(cssClass);
  return element;
};

PinnedCountryView.prototype.createNotesForm = function () {
  const formWrapper = this.createDiv('notes-form-wrapper');
  const form = document.createElement('form');
  form.classList.add('notes-form');
  const textarea = document.createElement('textarea');
  textarea.classList.add('notes-form-textarea');
  textarea.name = 'notes';
  const submit = document.createElement('input');
  submit.type = 'submit';
  submit.value = 'Add notes';

  form.appendChild(textarea);
  form.appendChild(submit);
  form.addEventListener('submit', (evt) => {
    this.handleSubmit(evt);
  })

  formWrapper.appendChild(form);

  return formWrapper;
};

PinnedCountryView.prototype.handleSubmit = function (evt) {
  evt.preventDefault();
  this.country.notes = evt.target.notes.value;
  PubSub.publish('PinnedCountryView:notes-submitted', this.country);
  evt.target.reset();
};

PinnedCountryView.prototype.createDiv = function (cssClass) {
  const div = document.createElement('div');
  div.classList.add(cssClass);
  return div;
};

module.exports = PinnedCountryView;
