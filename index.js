/**
 * Merges discontinuous time ranges within a given threshold.
 * 
 * @param {Array<[number, number]>} ranges - Array of [start, end) ranges (unsorted, may overlap)
 * @param {number} threshold - Max gap (in ms) allowed between ranges to still be merged
 * @returns {Array<[number, number]>} - Sorted, non-overlapping merged ranges
 */

const mergeTimeRanges = (ranges, threshold) => {
  if(!ranges || ranges.length === 0){
    return[];
  }
  
  // Sort ranges by their start time to simplify merging 
  ranges.sort((a, b)=> {
    if(a[0] === b[0]){
      return a[1] - b[1];
    }
    return a[0] -b[0];
  });
  const mergedRanges =[];
  let currentMergedRange = ranges[0];
  
  for(let i = 1; i< ranges.length; i++){
    const nextRange = ranges[i];
    
    // Check if the current merged range and the next range overlap or are within the thershold
    
    if(currentMergedRange[1] >= nextRange[0] || currentMergedRange[1] + threshold>=nextRange[0]){
      
        // merge: extend the end of the current merged range 
        
        currentMergedRange[1] = Math.max(currentMergedRange[1], nextRange[1]);
      }
      else{
        
        // NO overlap or threshold gap 
        
        mergedRanges.push(currentMergedRange);
        currentMergedRange = nextRange;
      }
    }
    // ADD the last merged range
    mergedRanges.push(currentMergedRange);
    
    return mergedRanges;
  };

module.exports = {
	mergeTimeRanges
}

// For Example

const myModule = require('./index.js')
const ranges = [
  [0, 10],
  [12, 15],
  [17, 25],
  [27, 35]
];
const threshold = 3;



console.log(myModule.mergeTimeRanges(ranges, threshold));


// Output:

// [
//   [0, 35]
// ]