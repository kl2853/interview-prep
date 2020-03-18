/* Given an array of integers, make array elements distinct by incrementing values and return the minimum array sum at which this is possible. */

const minUniqueSum = (nums) => {
    nums.sort((a,b) => a - b);
    for(let i = 1; i < nums.length; i++) {
        if(nums[i] <= nums[i - 1]) {
            nums[i] = nums[i - 1] + 1;
        }
    }
    let sum = nums.reduce((acc, val) => acc + val, 0);
    return sum;
}
