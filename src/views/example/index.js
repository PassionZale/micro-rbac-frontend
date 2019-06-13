export default {
  name: "Example",

  render(h) {
    return h("h1", {
      style: {
        textAlign: "center",
        marginTop: "200px"
      }
    }, "Example View")
  }
}