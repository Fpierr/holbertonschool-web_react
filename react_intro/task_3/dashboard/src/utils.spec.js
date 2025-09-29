import { getCurrentYear, getFooterCopy, getLatestNotification } from "./utils";

describe("Utils functions", () => {
  it("getCurrentYear should return the current year", () => {
    const expectValue = new Date().getFullYear();
    const funcValue = getCurrentYear();
    expect(funcValue).toEqual(expectValue);
  });

  it("getFooterCopy should return 'Holberton School' when isIndex is true", () => {
    const expectValue = "Holberton School";
    const funcValue = getFooterCopy(true);
    expect(funcValue).toEqual(expectValue);
  });

  it("getFooterCopy should return 'Holberton School main dashboard' when isIndex is false", () => {
    const expectValue = "Holberton School main dashboard";
    const funcValue = getFooterCopy(false);
    expect(funcValue).toEqual(expectValue);
  });

  it("getLatestNotification should return the correct notification string", () => {
    const expectValue = "<strong>Urgent requirement</strong> - complete by EOD";
    const funcValue = getLatestNotification();
    expect(funcValue).toEqual(expectValue);
  });
});
