import { crudControllers } from '../../utils/crud'
import { Item } from './item.model'

export default crudControllers(Item)

// const run = async () => {
//   await connect(
//     'mongodb://localhost:27017/api-design',
//     {
//       useNewUrlParser: true,
//       autoReconnect: true,
//       reconnectTries: Number.MAX_VALUE,
//       reconnectInterval: 1000,
//       poolSize: 0
//     }
//   )
//   const item = await Item.create({
//     name: 'Clean up',
//     createdBy: mongoose.Types.ObjectId(),
//     list: mongoose.Types.ObjectId()
//   })

//   const updated = await Item.findByIdAndUpdate(
//     item._id,
//     { name: 'eat' },
//     { new: true }
//   ).exec()

//   console.log(updated)

//   const removed = await Item.findByIdAndRemove(item._id)

//   console.log(removed)
// }

// run()

/**
 * GET / Read many
 * GET /:id Read one
 * POST / Create one
 * PUT /:id Update One
 * DELETE /:id Delete One
 */

// export default crudControllers(Item)
