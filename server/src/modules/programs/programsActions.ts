import type { RequestHandler } from "express";

import programsRepository from "./programsRepository";

const browse: RequestHandler = async (req, res, next) => {
  try {
    const programs = await programsRepository.readAll();

    res.json(programs);
  } catch (err) {
    next(err);
  }
};

const read: RequestHandler = async (req, res, next) => {
  try {
    const programsId = Number(req.params.id);
    const programs = await programsRepository.read(programsId);

    if (programs === null) {
      res.sendStatus(404);
    } else {
      res.json(programs);
    }
  } catch (err) {
    next(err);
  }
};

const add: RequestHandler = async (req, res, next) => {
  try {
    const newPrograms = {
      title: req.body.title,
      synopsis: req.body.synopsis,
      poster: req.body.poster,
      country: req.body.country,
      year: Number(req.body.year),
      category_id: Number(req.body.category_id),
    };
    const insertId = await programsRepository.create(newPrograms);
    res.status(204).json({ insertId });
  } catch (err) {
    next(err);
  }
};

const edit: RequestHandler = async (req, res, next) => {
  try {
    const programs = {
      id: Number(req.params.id),
      title: req.body.title,
      synopsis: req.body.synopsis,
      poster: req.body.poster,
      country: req.body.country,
      year: Number(req.body.year),
      category_id: Number(req.body.category_id),
    };

    const affectedRows = await programsRepository.update(programs.id, {
      title: programs.title,
      synopsis: programs.synopsis,
      poster: programs.poster,
      country: programs.country,
      year: programs.year,
      category_id: programs.category_id,
    });

    if (affectedRows === 0) {
      res.sendStatus(404);
    } else {
      res.sendStatus(204);
    }
  } catch (err) {
    console.error("Server error:", err);
    res.status(500).json({ error: "Internal Server Error" });
    next(err);
  }
};

const destroy: RequestHandler = async (req, res, next) => {
  try {
    const programId = Number(req.params.id);
    await programsRepository.delete(programId);
    res.sendStatus(204);
  } catch (err) {
    next(err);
  }
};

const validate: RequestHandler = async (req, res, next) => {
  type ValidationError = {
    field: string;
    message: string;
  };

  const errors: ValidationError[] = [];
  const { title } = req.body;
  const { synopsis } = req.body;
  const { year } = req.body;

  if (title.length === 0) {
    errors.push({ field: "title", message: "Veuillez entrer un champs" });
  } else if (title.length > 100) {
    errors.push({
      field: "title",
      message: "Veuillez ne pas dépasser les 100 charactères",
    });
  } else if (synopsis.length > 500) {
    errors.push({
      field: "synopsis",
      message: "Veuillez ne pas dépasser les 500 charactères",
    });
  } else if (year.length !== 4) {
    errors.push({
      field: "year",
      message: "Veuillez entrer une année correcte",
    });
  }

  if (errors.length === 0) {
    next();
  } else {
    res.status(400).json({ validationErrors: errors });
  }
};

export default { browse, read, add, edit, destroy, validate };
