const getDate = (date, options, language = navigator.language) =>
  new Intl.DateTimeFormat('fa-IR', options).format(date);

export default getDate;
