import { getCurrentYear, getFooterCopy, getLatestNotification } from "./utils";
import { expect, describe, it } from '@jest/globals';

describe('Test utils.js', () => {
  describe('getCurrentYear()', () => {
    it('Return the current year', () => {
      const expectValue = new Date().getFullYear();
      const funcValue = getCurrentYear();
      expect(funcValue).toEqual(expectValue);
    });
  });

  describe('getFooterCopy()', () => {
    it('Return "Holberton School" when true', () => {
      const expectValue = "Holberton School";
      const funcValue = getFooterCopy(true);
      expect(funcValue).toEqual(expectValue);
    });

    it('Return "Holberton School main dashboard" when false', () => {
      const expectValue = "Holberton School main dashboard";
      const funcValue = getFooterCopy(false);
      expect(funcValue).toEqual(expectValue);
    });
  });

  describe('getLatestNotification()', () => {
    it('Return correct value', () => {
      const expectValue = '<strong>Urgent requirement</strong> - complete by EOD';
      const funcValue = getLatestNotification();
      expect(funcValue).toEqual(expectValue);
    });
  });
});
