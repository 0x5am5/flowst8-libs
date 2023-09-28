describe("flowst-libz", () => {
  const flowSt8Libz = require("../dist/flowSt8Libz");

  it("flowSt8Libz is object", () => {
    expect(typeof flowSt8Libz).toBe("object");
  });

  const { FSEasyInfiniteSlider } = require("../dist/flowSt8Libz");

  it("FSEasyInfiniteSlider is function", () => {
    expect(typeof FSEasyInfiniteSlider).toBe("function");
  });

  const { FSEasyScrollNav } = require("../dist/flowSt8Libz");

  it("FSEasyScrollNav is function", () => {
    expect(typeof FSEasyScrollNav).toBe("function");
  });
});

describe("individual libraries", () => {
  const FSEasyInfiniteSlider = require("../dist/FSEasyInfiniteSlider");

  it("FSEasyInfiniteSlider is function", () => {
    expect(typeof FSEasyInfiniteSlider).toBe("function");
  });

  const FSEasyScrollNav = require("../dist/FSEasyScrollNav");

  it("FSEasyScrollNav is function", () => {
    expect(typeof FSEasyScrollNav).toBe("function");
  });
});
