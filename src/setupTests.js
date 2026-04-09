import '@testing-library/jest-dom';

// Suppress React.act warning globally
const originalError = console.error;
console.error = (...args) => {
  if (
    typeof args[0] === 'string' &&
    args[0].includes('ReactDOMTestUtils.act')
  ) {
    return;
  }
  originalError.call(console, ...args);
};
