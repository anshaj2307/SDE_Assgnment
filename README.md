# Merge Discontinuous Time Ranges

## 📋 Problem Statement

This assignment solves the problem of **merging overlapping and near-overlapping time ranges** based on a configurable threshold. Given an array of time ranges (start, end pairs) and a maximum gap threshold, the algorithm merges ranges that either overlap or are separated by a gap smaller than the threshold.

### Real-World Use Cases
- **Calendar event consolidation**: Combining adjacent meetings with buffer times
- **Network activity analysis**: Grouping consecutive connection attempts
- **Video streaming**: Merging buffered segments with small gaps
- **Time tracking applications**: Combining work periods close together

---

## 🎯 Algorithm Overview

### Approach: **Interval Merging with Gap Detection**

1. **Sort** all ranges by start time (with secondary sort by end time)
2. **Iterate** through sorted ranges, comparing each with the current merged range
3. **Merge** if ranges overlap OR gap between them is ≤ threshold
4. **Track** the extended end time using `Math.max()`
5. **Finalize** by pushing the last merged range

### Time Complexity: **O(n log n)** 
- Sorting dominates the algorithm

### Space Complexity: **O(n)**
- Output array stores merged ranges

---

## 💡 Key Implementation Details

### Gap Detection Logic
```javascript
if(currentMergedRange[1] >= nextRange[0] || 
   currentMergedRange[1] + threshold >= nextRange[0])
```

- **First condition**: Direct overlap detection
- **Second condition**: Threshold-based gap detection
- **`Math.max()`**: Ensures we extend to the farthest end point

### Edge Cases Handled
✓ Empty or null input arrays  
✓ Single range  
✓ Completely overlapping ranges  
✓ Ranges that bridge the threshold gap  

---

## 📊 Example Execution

### Input
```javascript
const ranges = [
  [0, 10],    // First time block
  [12, 15],   // Gap of 2ms (< threshold)
  [17, 25],   // Gap of 2ms (< threshold)
  [27, 35]    // Gap of 2ms (< threshold)
];
const threshold = 3; // milliseconds
```

### Step-by-Step Merging

| Step | Current Range | Next Range | Gap | Action | Result |
|------|---------------|-----------|-----|--------|--------|
| 1 | `[0, 10]` | `[12, 15]` | 2 | ✅ Merge (2 ≤ 3) | `[0, 15]` |
| 2 | `[0, 15]` | `[17, 25]` | 2 | ✅ Merge (2 ≤ 3) | `[0, 25]` |
| 3 | `[0, 25]` | `[27, 35]` | 2 | ✅ Merge (2 ≤ 3) | `[0, 35]` |

### Output
```javascript
[[ 0, 35 ]]  // All ranges merged into one continuous block
```

---

## 🚀 Usage

```javascript
const { mergeTimeRanges } = require('./index.js');

// Example 1: Adjacent events with small gaps
const ranges1 = [[0, 10], [12, 15], [17, 25], [27, 35]];
console.log(mergeTimeRanges(ranges1, 3));
// Output: [[0, 35]]

```

---



## 📚 Complexity Analysis

| Metric | Value | Reason |
|--------|-------|--------|
| **Time** | O(n log n) | Sorting dominates |
| **Space** | O(n) | Output array size |
| **Sorting** | O(n log n) | Default comparison sort |
| **Merging** | O(n) | Single pass through ranges |

---

## 📄 License

Educational use - Assignment submission
