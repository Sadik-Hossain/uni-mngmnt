import User from './users.model'

// let lastUserId = 0
export const findLastUserId = async () => {
  const lastUser = await User.findOne({}, { id: 1, _id: 0 })
    .sort({
      createdAt: -1,
    })
    .lean()
  return lastUser?.id
}

export const genUserId = async () => {
  const currentId = (await findLastUserId()) || (0).toString().padStart(5, '0') //00000

  //increment by 1
  // const incrementedId = String(Number(currentId) + 1).padStart(5, '0')

  // or
  const incrementedId = (parseInt(currentId) + 1).toString().padStart(5, '0')

  return incrementedId
  //   return currentId
}
