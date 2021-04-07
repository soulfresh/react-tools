import PageObject from 'page-o';

export const selectors = {
  container: '[data-test=currencyInput]',
};

export default class NumberInputPageObject extends PageObject {
  selectors = selectors;
}
