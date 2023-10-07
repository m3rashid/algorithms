const mergeSort = (arr: number[]): number[] => {
  if (arr.length <= 1) return arr;

  const middle = Math.floor(arr.length / 2);
  const left = mergeSort(arr.slice(0, middle));
  const right = mergeSort(arr.slice(middle));

  return merge(left, right);
};

const merge = (left: number[], right: number[]): number[] => {
  const result: number[] = [];

  while (left.length && right.length) {
    let toShift: number[] = [];
    if (left[0] <= right[0]) {
      toShift = left;
    } else {
      toShift = right;
    }

    if (toShift) {
      result.push(...toShift);
    }
  }

  while (left.length) {
    const leftShift = left.shift();
    if (leftShift) result.push(leftShift);
  }

  while (right.length) {
    const rightShift = right.shift();
    if (rightShift) result.push();
  }

  return result;
};
