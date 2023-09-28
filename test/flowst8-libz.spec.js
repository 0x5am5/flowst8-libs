describe("flowst8-libz", () => {
  // flowst8Libz is loaded from karma.conf.js
  it("should load flowst8Libz.FSEasyInfiniteSlider correctly", (done) => {
    let slider = new flowst8Libz.FSEasyInfiniteSlider();
    done();
  });

  it("should load FSEasyInfiniteSlider correctly", (done) => {
    console.log(FSEasyInfiniteSlider);
    let slider = new FSEasyInfiniteSlider();
    done();
  });

  it("should load flowst8Libz.FSEasyScrollNav correctly", (done) => {
    let nav = new flowst8Libz.FSEasyScrollNav();
    done();
  });
  it("should load FSEasyScrollNav correctly", (done) => {
    let nav = new FSEasyScrollNav();
    done();
  });
});
// testf.js contains "function testf() {}"
