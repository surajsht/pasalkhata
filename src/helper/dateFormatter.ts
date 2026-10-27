const dateFormatter = (rawDate: undefined | string): string => {
  if (!rawDate) return "---";

  const dateObj = new Date(rawDate);

  const month = dateObj
    .toLocaleDateString("en-Us", { month: "2-digit" })
    .padStart(2, "0");
  const year = dateObj.getFullYear();
  const day = String(dateObj.getDate()).padStart(2, "0");

  return `${year}-${month}-${day}`;
};

export default dateFormatter;
