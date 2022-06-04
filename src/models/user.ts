import { User } from "../schema";
import crypto from 'crypto'

function generateApiKey(userId: string): string {
  return userId + '_' + crypto.randomUUID()
}


async function _generateClientIdentifier(clientName: string, startingIndex: number = 0): Promise<string> {
  const userId: string = clientName.substring(startingIndex, (startingIndex + 3)).toUpperCase()

  const clientDetails = await User.findOne({ userId })

  if (clientDetails) {
    return _generateClientIdentifier(clientName, (startingIndex + 1))
  }
  return userId
}

async function createUser(attrs: any) {
  const {
    userName
  } = attrs

  const userId = await _generateClientIdentifier(userName)

  const apiKey = generateApiKey(userId)

  const userDetails = await User.create({
    userName,
    userId,
    apiKey
  })

  return userDetails

}

async function getAllUsers() {
  const userDetails = await User.find({})
  if (userDetails.length === 0) {
    throw new Error('No Clients Found.')
  }
  return userDetails
}

export {
  createUser,
  getAllUsers
}
