import mongoose from "mongoose";

import { VISIBILITY_CONSTANTS } from '../constants'

const pastebinSchema = new mongoose.Schema({
  content: { type: String, required: true },
  userId: { type: String, required: true, ref: 'User' },
  pasteName: { type: String, required: true, unique: true },

  visibility: { type: String, enum: VISIBILITY_CONSTANTS.ENUMS, default: VISIBILITY_CONSTANTS.MAP.PUBLIC },
  password: { type: String, default: '' },

  url: { type: String, required: true },

  validTill: { type: Date },
  expired: { type: Boolean, default: false },
  burnAfterRead: { type: Boolean, default: false },
  toExpire: { type: Boolean, default: false },
}, { timestamps: true })

const Pastebin = mongoose.model('Pastebin', pastebinSchema)

export default Pastebin
