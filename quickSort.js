function swap(arr: number[], i: number, j: number): void {
  let temp: number = arr[i];
  arr[i] = arr[j];
  arr[j] = temp;
}

function partition(arr: number[], low: number, high: number): number {
  let pivot: number = arr[high];
  let i: number = low - 1;

  for (let j: number = low; j <= high - 1; j++) {
    if (arr[j] < pivot) {
      i++;
      swap(arr, i, j);
    }
  }
  swap(arr, i + 1, high);
  return i + 1;
}

function quickSort(arr: number[], low: number, high: number): void {
  if (low < high) {
    let pi: number = partition(arr, low, high);

    quickSort(arr, low, pi - 1);
    quickSort(arr, pi + 1, high);
  }
}

function sortArray(arr: number[]): void {
  quickSort(arr, 0, arr.length - 1);
}

function generateRandomArray(size: number): number[] {
  let arr: number[] = [];
  for (let i: number = 0; i < size; i++) {
    arr.push(Math.floor(Math.random() * 100));
  }
  return arr;
}

function printArray(arr: (number | string)[]): void {
  console.log(arr.join(', '));
}

function main(): void {
  const size: number = 10;
  let arr: number[] = generateRandomArray(size);

  console.log("Оригінальний масив:");
  printArray(arr);

  sortArray(arr);

  console.log("Відсортований масив:");
  printArray(arr);
}

main();

function repeatSort(): void {
  const newSize: number = 20;
  let newArr: number[] = generateRandomArray(newSize);

  console.log("\nНовий оригінальний масив:");
  printArray(newArr);

  sortArray(newArr);

  console.log("Новий відсортований масив:");
  printArray(newArr);
}

repeatSort();

function sortLargeArray(): void {
  const largeSize: number = 50; 
  let largeArr: number[] = generateRandomArray(largeSize);

  console.log("\nОригінальний великий масив:");
  printArray(largeArr);

  sortArray(largeArr);

  console.log("Відсортований великий масив:");
  printArray(largeArr);
}

sortLargeArray();

function isArraySorted(arr: number[]): boolean {
  for (let i: number = 0; i < arr.length - 1; i++) {
    if (arr[i] > arr[i + 1]) {
      return false;
    }
  }
  return true;
}

function testIsArraySorted(): void {
  let testArr1: number[] = [1, 2, 3, 4, 5];
  let testArr2: number[] = [5, 4, 3, 2, 1];

  console.log("\nПеревірка відсортованого масиву:");
  console.log(isArraySorted(testArr1) ? "Масив відсортований" : "Масив не відсортований");

  console.log("Перевірка невідсортованого масиву:");
  console.log(isArraySorted(testArr2) ? "Масив відсортований" : "Масив не відсортований");
}

testIsArraySorted();

function generateAlmostSortedArray(size: number): number[] {
  let arr: number[] = [];
  for (let i: number = 0; i < size; i++) {
    arr.push(i);
  }
  arr[size - 1] = size - 3;
  return arr;
}

function testAlmostSortedArray(): void {
  const size: number = 15;
  let arr: number[] = generateAlmostSortedArray(size);

  console.log("\nМайже відсортований масив:");
  printArray(arr);

  sortArray(arr);

  console.log("Відсортований майже відсортований масив:");
  printArray(arr);
}

testAlmostSortedArray();

function sortStrings(arr: string[]): void {
  arr.sort((a: string, b: string) => a.localeCompare(b));
}

function isStringArraySorted(arr: string[]): boolean {
  for (let i: number = 0; i < arr.length - 1; i++) {
    if (arr[i].localeCompare(arr[i + 1]) > 0) {
      return false;
    }
  }
  return true;
}

function findSubstring(mainString: string, substring: string): boolean {
  return mainString.indexOf(substring) !== -1;
}

function checkSubstrings(arr: string[], substring: string): string[] {
  return arr.filter((str: string) => findSubstring(str, substring));
}

function testStringSorting(): void {
  let stringArray: string[] = ["banana", "apple", "orange", "mango", "grape"];
  
  console.log("\nОригінальний масив рядків:");
  printArray(stringArray);

  sortStrings(stringArray);

  console.log("Відсортований масив рядків:");
  printArray(stringArray);

  console.log("Чи масив рядків відсортований?");
  console.log(isStringArraySorted(stringArray) ? "Так, відсортований" : "Ні, не відсортований");
}

testStringSorting();

function testSubstringSearch(): void {
  let testString: string = "The quick brown fox jumps over the lazy dog";
  let substring: string = "fox";

  console.log(`\nЧи містить рядок '${substring}'?`);
  console.log(findSubstring(testString, substring) ? "Так, містить" : "Ні, не містить");

  let stringArray: string[] = ["strawberry", "blueberry", "blackberry", "raspberry"];
  let searchTerm: string = "berry";

  console.log(`\nРядки, що містять '${searchTerm}':`);
  let results: string[] = checkSubstrings(stringArray, searchTerm);
  printArray(results);
}

testSubstringSearch();

function reverseSortArray(arr: number[]): void {
  quickSort(arr, 0, arr.length - 1);
  arr.reverse();
}

function testReverseSort(): void {
  let arr: number[] = generateRandomArray(10);

  console.log("\nОригінальний масив для зворотного сортування:");
  printArray(arr);

  reverseSortArray(arr);

  console.log("Зворотно відсортований масив:");
  printArray(arr);
}

testReverseSort();

function removeDuplicates(arr: number[]): number[] {
  return [...new Set(arr)];
}

function testRemoveDuplicates(): void {
  let arr: number[] = [1, 2, 2, 3, 4, 4, 5];

  console.log("\nМасив з дублікованими елементами:");
  printArray(arr);

  let uniqueArr: number[] = removeDuplicates(arr);

  console.log("Масив без дублікатів:");
  printArray(uniqueArr);
}

testRemoveDuplicates();
