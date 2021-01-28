export const totalAvarage = (arr, currentMarks) => {
  const total = arr.reduce((acc, cur, index, arr) => {
    return acc + cur.correctPoints;
  }, 0);
  return total;
};
