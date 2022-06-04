import { Pastebin, User } from "../schema";
import { HashHelper, PasswordHelper } from '../helpers'
import { VISIBILITY_CONSTANTS } from "../constants";
import { generateUrl } from "../helpers/tinyUrl.service";

export {
  createPasteBin,
  getPastebin
}

async function createPasteBin(attrs: any) {
  try {

    console.log('attrs: ', attrs);
    const {
      pasteName = '',
      content = '',
      userId = '',
      validTill = '',
      visibility = '',
      password = '',
      burnAfterRead
    } = attrs

    let _password = password || ''
    let toExpire = false
    let _pasteName = pasteName || ''
    if (visibility === VISIBILITY_CONSTANTS.MAP.PRIVATE) {
      if (!_password) {
        _password = PasswordHelper.generateRandomPassword()
      }
    }

    if (burnAfterRead) {
      toExpire = true
    } else if (validTill) {
      toExpire = true
    }

    const hash = HashHelper.hashData(content)

    if (!_pasteName) {
      _pasteName = `${userId}_${Date.now()}_${Math.random().toString(36).slice(-9)}`
    }

    const url = await generateUrl(`${process.env.OWN_ENDPOINT}/pastebin/get/${_pasteName}`)

    const insertObject = {
      pasteName: _pasteName,
      userId,
      content: hash,
      visibility,
      password: _password,

      toExpire,
      burnAfterRead,
      validTill,
      url
    }

    const response = await Pastebin.create(insertObject)

    return response
  } catch (error) {
    console.log('Error generating pastebin: ', error)
    throw error
  }

}


async function getPastebin(attrs: any) {
  const { pasteName } = attrs


  const pastebin = await Pastebin.findOne({ pasteName }).lean()

  const {
    visibility,
    validTill,
    expired,
    toExpire,
    burnAfterRead,
    userId,
    content
  } = pastebin

  if (expired) {
    throw new Error('Pastebin has been expired.')
  }

  let updateObject = {}

  const currentDate = new Date()

  if (burnAfterRead || (validTill <= currentDate)) {
    updateObject = { expired: true }
    await Pastebin.updateOne({ pasteName, updateObject })
      .then(res => {
        console.log('Pastebin marked expired: ', userId);
      })
  }


  const userUpdateObject = { lastUsed: currentDate }
  User.findOneAndUpdate({ userId }, userUpdateObject)
    .then(res => {
      console.log('Last used updated for user: ', userId);
    })

  return { ...pastebin, content: HashHelper.decodeData(content) }
}

