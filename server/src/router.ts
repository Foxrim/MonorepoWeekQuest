import express from "express";

const router = express.Router();

/* ************************************************************************* */
// Define Your API Routes Here
/* ************************************************************************* */

// Define item-related routes
import itemActions from "./modules/item/itemActions";

router.get("/api/items", itemActions.browse);
router.get("/api/items/:id", itemActions.read);
router.post("/api/items", itemActions.add);

import programsActions from "./modules/programs/programsActions";

router.get("/api/programs", programsActions.browse);
router.get("/api/programs/:id", programsActions.read);
router.post("/api/programs", programsActions.validate, programsActions.add);
router.put("/api/programs/:id", programsActions.validate, programsActions.edit);
router.delete("/api/programs/:id", programsActions.destroy);

import categoryActions from "./modules/category/categoryActions";

router.get("/api/categories", categoryActions.browse);
router.get("/api/categories/:id", categoryActions.read);
router.post("/api/categories", categoryActions.validate, categoryActions.add);
router.put(
  "/api/categories/:id",
  categoryActions.validate,
  categoryActions.edit,
);
router.delete("/api/categories/:id", categoryActions.destroy);

/* ************************************************************************* */

export default router;
