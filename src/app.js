const express = require("express");
const cors = require("cors");

const { uuid } = require("uuidv4");

const app = express();

app.use(express.json());
app.use(cors());

const repositories = [];

app.get("/repositories", (request, response) => {

  return response.status(200).json(repositories)
});

app.post("/repositories", (request, response) => {
  // TODO
  const values = {
    title,
    url,
    techs,
  } = request.body

  const userId = uuid()

  const userTechs = techs.join()

  const repository = {
    likes: 0,
    id: userId,
    techs: userTechs,
    ...values,
  }

  repositories.push(repository)

  return response.json(repository)
});

app.put("/repositories/:id", (request, response) => {
  const userId = request.params.id

  const userIndex = repositories.findIndex(repositorie => repositorie.id === userId)

  if (userIndex === -1) {
    return response.status(400).send()
  }

  const repository = {
    id: userId,
    ...request.body
  }

  if (repository.likes) {
    repository.likes = repositories[userIndex].likes
  }

  repositories[userIndex] = repository

  return response.json(repository)
});

app.delete("/repositories/:id", (request, response) => {
  // TODO
  const userId = request.params.id

  const userIndex = repositories.findIndex(repositorie => repositorie.id === userId)

  if (userIndex === -1) {
    return response.status(400).send()
  }

  repositories.splice(1, userIndex)

  return response.status(204).send()
});

app.post("/repositories/:id/like", (request, response) => {
  // TODO
  const userId = request.params.id

  const repository = repositories.find(repositorie => repositorie.id === userId)

  if (!repository) {
    return response.status(400).send()
  }

  repository.likes += 1;

  return response.json(repository)
});

module.exports = app;
