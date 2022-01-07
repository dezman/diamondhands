import Controller from "../src/Controller";
import fetchMock from "fetch-mock";

describe(".onFinishedFetching", () => {
  it("should return OK", () => {
    let controller = new Controller();
    expect(controller.onFinishedFetching("Function")).toBe("ok");
  });
});
