export const getOne = model => async (req, res) => {
  const id = req.params.id
  const userId = req.user._id

  const doc = await model
    .findOne({
      _id: id,
      createdBy: userId
    })
    .exec()

  if (!doc) {
    return res.status(404).end()
  }

  res.status(200).json({
    data: doc
  })
}

export const getMany = model => async (req, res) => {
  const userId = req.user._id

  const docs = await model
    .find({
      createdBy: userId
    })
    .exec()

  res.status(200).json({
    data: docs
  })
}

export const createOne = model => async (req, res) => {
  // const documentName = req.body.name
  // const userId = req.user._id
  // const Document = model

  // const doc = new Document({ createdBy: userId, name: documentName })
  // await doc.save()

  // res.status(201).json({
  //   data: doc
  // })

  const doc = await model.create({ ...req.body, createdBy: req.user._id })

  res.status(201).json({
    data: doc
  })
}

export const updateOne = model => async (req, res) => {
  const userId = req.user._id
  const listId = req.params.id
  const documentBody = req.body

  const filter = {
    _id: listId,
    createdBy: userId
  }
  const update = { ...documentBody }
  const doc = await model.findOneAndUpdate(filter, update, { new: true }).exec()

  if (!doc) {
    return res.status(404).end()
  }

  res.status(200).json({
    data: doc
  })
}

export const removeOne = model => async (req, res) => {
  const userId = req.user._id
  const listId = req.params.id

  const filter = { _id: listId, createdBy: userId }

  const doc = await model.findOneAndDelete(filter).exec()

  if (!doc) {
    return res.status(404).end()
  }

  res.status(200).json({
    data: doc
  })
}

export const crudControllers = model => ({
  removeOne: removeOne(model),
  updateOne: updateOne(model),
  getMany: getMany(model),
  getOne: getOne(model),
  createOne: createOne(model)
})

/**
 * GET / Read many
 * GET /:id Read one
 * POST / Create one
 * PUT /:id Update One
 * DELETE /:id Delete One
 */
