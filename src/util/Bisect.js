class Bisect {
    static lb = (nums, target) => {
        let l = -1;
        let r = nums.length;
        let mid;
        while (l + 1 < r) {
            mid = Math.floor((l + r) / 2)
            if (nums[mid] < target) {
                l = mid;
            }
            else {
                r = mid
            }
        }
        // console.log("target: ", nums, target, l + 1);
        return l + 1;
    }
    static ub = (nums, target) => {
        let l = -1;
        let r = nums.length;
        let mid;
        while (l + 1 < r) {
            mid = Math.floor((l + r) / 2)
            if (nums[mid] <= target) {
                l = mid;
            }
            else {
                r = mid
            }
        }
        // console.log("target: ", nums, target, r - 1);
        return r - 1;
    }
}

export default Bisect;
