export const getTheme = (mode) => ({
  palette: {
    mode,
    ...(mode === "light"
      ? {
          // palette values for light mode
          primary: {
            main: "#000",
          },
          background: {
            paper: "linear-gradient(#333581,#00D3FF)",
            default: "#fff",
          },
          secondary: {
            main: "#ff844a",
          },
          text: {
            primary: "#000",
            secondary: "#ff844a",
          },
        }
      : {
          primary: {
            main: "#fff",
          },
          background: {
            paper: "#000",
            default: "#000",
          },
          secondary: {
            main: "#0ff",
          },
          text: {
            primary: "#fff",
            secondary: "#0ff",
          },
        }),
  },
});
