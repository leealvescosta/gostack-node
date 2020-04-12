const express = require("express");
const cors = require("cors");
const { uuid } = require("uuidv4");

const app = express();

app.use(express.json());
app.use(cors());

const repositories = [];

app.get("/repositories", (req, res) => {
  const { id, likes, title, url, techs } = req.query;

  const results = {
    id: uuid(),
    likes: likes,
    techs: techs,
    title: title,
    url: url,
  }
    ? repositories.filter((r) => r.title.includes(title))
    : repositories;

  return res.status(200).json(repositories);
});

app.post("/repositories", (req, res) => {
  const { url, title, techs } = req.body;

  const repository = {
    id: uuid(),
    title: title,
    techs: techs,
    likes: 0,
    url: url,
  };

  repositories.push(repository);

  return res.status(200).json(repository);
});

app.put("/repositories/:id", (req, res) => {
  const { id } = req.params;
  const { url, title, techs } = req.body;

  const repositoryIndex = repositories.findIndex(
    (repository) => repository.id === id,
  );

  if (repositoryIndex < 0) {
    return res.status(400).json({ error: "Repository not found!" });
  }

  const repository = {
    id: uuid(),
    title: title,
    url: url,
    techs: techs,
    likes: 0,
  };

  repositories[repositoryIndex] = repository;

  return res.status(200).json(repository);
});

app.delete("/repositories/:id", (req, res) => {
  const { id } = req.params;

  const findRepositoryIndex = repositories.findIndex(
    (repository) => repository.id === id,
  );

  if (findRepositoryIndex >= 0) {
    repositories.splice(findRepositoryIndex, 1);
  } else {
    return res.status(400).json({ error: "Repository not found!" });
  }

  return res.status(204).send();
});

app.post("/repositories/:id/like", (req, res) => {
  const { id } = req.params;

  const repository = repositories.find((r) => r.id === id);

  if (!repository) {
    return res.status(400).json({ error: "Repository not found!" });
  }

  repository.likes += 1;

  return res.status(200).json(repository);
});

module.exports = app;
