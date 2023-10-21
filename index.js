const jsonServer = require("json-server"); // importing json-server library
const server = jsonServer.create();
const router = jsonServer.router("db.json");
const middlewares = jsonServer.defaults();
const port = process.env.PORT || 8080; //  chose port from here like 8080, 3001
const path = require("path");
server.use(middlewares);
server.use(router);
// Create a middleware to handle file uploads
const uploadMiddleware = (req, res, next) => {
  // Get the folder name from the request body
  const folderName = req.body.folderName;

  // Get the file name from the request body
  const fileName = req.body.fileName;

  // Get the file data from the request
  const fileData = req.files.file.data;

  // Create a new file in the specified folder
  const filePath = path.join(process.cwd(), "uploads", folderName, fileName);
  fs.writeFileSync(filePath, fileData);

  next();
};

// Add the upload middleware to the server
server.use(uploadMiddleware);

// Add the upload middleware to the server
server.use(uploadMiddleware);

server.listen(port, (err) => {
  if (err) {
    console.log(err);
  } else {
    console.log("http://localhost:8080");
  }
});
