/**
 *
 * Support glob an array of minimatch rules, and a rule which starts with "!".
 * When glob an array of rules, three methods which are `union`, `intersection`, `difference`, can be used.
 * When glob a rule which starts with "!", `intersection` method will be used.
 * However, a rule starting with "!" placed at the first of an array will not work.
 * Default export function is `glob.sync`.
 *
 * 支持 glob 匹配规则数组 和 “!” 开头的规则
 * 对于规则数组，有取并集、交集、差集三种方法
 * 对于 “!” 开头的规则，一律取差集；若位于数组第一个，则无效
 * 默认导出方法相当于 glob.sync
 */

import glob from 'glob';
import R from 'ramda';

const zpGlob = glob.sync;

const GLOB_MERGE_FN = {
  union: 'union', // 对 patterns 数组匹配结果做并集
  intersection: 'intersection', // 对 patterns 数组匹配结果做交集
  difference: 'difference', // 对 patterns 数组匹配结果做差集
};

const globMerge = (patterns, options, mergeFn) => {
  if (!Array.isArray(patterns)) {
    patterns = [patterns];
  }

  return patterns.reduce((result, pattern) => {
    let excludeFlag = false;
    if (pattern[0] === '!') {
      excludeFlag = true; // exclude the pattern matches
      pattern = pattern.slice(1);
    }
    const matches = glob.sync(pattern, options);
    if (result.length === 0 && !excludeFlag) {
      return matches;
    }
    return excludeFlag ? R.difference(result, matches) : R[mergeFn](result, matches);
  }, []);
};

zpGlob.union = (patterns, options) => globMerge(patterns, options, GLOB_MERGE_FN.union);
zpGlob.intersection = (patterns, options) => globMerge(patterns, options, GLOB_MERGE_FN.intersection);
zpGlob.difference = (patterns, options) => globMerge(patterns, options, GLOB_MERGE_FN.difference);

export default zpGlob;
