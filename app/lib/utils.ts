export const numberFormatter = new Intl.NumberFormat('en-US', {
  style: 'decimal',
  minimumFractionDigits: 2,
  maximumFractionDigits: 2,
});

export const isNotEmptyArray = (value: []) => {
  return Array.isArray(value) && value.length > 0;
};
