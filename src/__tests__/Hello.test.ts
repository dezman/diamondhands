import {Hello} from "../index";

test('Hello', () => {
  expect(Hello('DiamondHands')).toBe('Hello DiamondHands');
});