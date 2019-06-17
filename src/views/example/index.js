export default {
  name: "Example",

  render(h) {
    return h("h1", {
      style: {
        textAlign: "center",
        paddingTop: "100px"
      }
    }, "Example View")
  }
}