This JavaScript code implements the Quick Sort algorithm, a highly efficient sorting method that operates on the "divide and conquer" principle. Below is a detailed description of the key components of the code:

### Key Functions:

1. **`swap(arr, i, j)`**:
   - A helper function that swaps two elements in an array. It takes three arguments: the array and the indices of the two elements to be swapped.

2. **`partition(arr, low, high)`**:
   - This function is crucial to the Quick Sort algorithm. It selects a pivot element and arranges the array such that elements smaller than the pivot are on the left, and elements greater than the pivot are on the right. It returns the final position of the pivot element.

3. **`quickSort(arr, low, high)`**:
   - The core of the Quick Sort algorithm. This function recursively sorts the subarrays by partitioning the array around the pivot element and then sorting the left and right subarrays separately.

4. **`sortArray(arr)`**:
   - A wrapper function that initiates the Quick Sort process by calling `quickSort` on the entire array.

5. **`generateRandomArray(size)`**:
   - Generates an array of a specified size filled with random integers between 0 and 99. This function is useful for testing the sorting algorithm.

6. **`printArray(arr)`**:
   - Outputs the array elements in a readable format, separated by commas.

7. **`main()`**:
   - The primary function that drives the sorting process. It generates a random array, prints the original array, sorts it using Quick Sort, and then prints the sorted array.

8. **`repeatSort()`**:
   - Similar to `main()`, but it sorts a larger array (size 20) to demonstrate the algorithm's performance on a different input size.

9. **`sortLargeArray()`**:
   - Similar to `repeatSort()`, but sorts an even larger array (size 50) to further demonstrate the algorithm's efficiency with larger datasets.

10. **`isArraySorted(arr)`**:
    - A utility function that checks if the array is sorted in ascending order. It returns `true` if the array is sorted and `false` otherwise.

11. **`testIsArraySorted()`**:
    - Tests the `isArraySorted` function using a pre-sorted array and an unsorted array, providing console output to verify correctness.

12. **`generateAlmostSortedArray(size)`**:
    - Generates an almost sorted array where all elements are in order except for one, mimicking a real-world scenario where the input is nearly sorted.

13. **`testAlmostSortedArray()`**:
    - Tests the Quick Sort algorithm on an almost sorted array to demonstrate its effectiveness in handling such cases.
