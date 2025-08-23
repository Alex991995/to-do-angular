export function isAdultFn(inputDate: Date) {
  const currentDate = new Date();
  const userDate = new Date(inputDate);

  const minAgeDate = new Date(
    currentDate.getFullYear() - 18,
    currentDate.getMonth(),
    currentDate.getDate()
  );

  return minAgeDate >= userDate;
}
