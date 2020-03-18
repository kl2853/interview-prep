/* Given an array of integers.nums, return the maximum difference, nums[j] - num[i] for all pairs nums[j] - nums[i] where i < j. Return -1 if there is not a pair that satisfies this condition.  */

const findMaxDiff = (nums) => {
    let maxDiff = 0;
    let min = nums[0];
    for(let i = 1; i < nums.length; i++) {
        let currDiff = nums[i] - min;
        if(currDiff > maxDiff) maxDiff = currDiff;
        if(nums[i] < min) min = nums[i];
    }
    return maxDiff;
}
