import app from "./config/express";

const main = () => {
  try {
    app.listen(3000);
    console.log("Server running");
  } catch (error) {
    console.log(error);
  }
};

main();
