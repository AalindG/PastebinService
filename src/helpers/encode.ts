function hashData(data: string) {
  let buff = new Buffer(data);
  let base64data = buff.toString('base64');
  return base64data
}


function decodeData(hash: string) {
  let buff = new Buffer(hash, 'base64');
  let text = buff.toString('ascii');
  return text
}

export {
  hashData,
  decodeData
}
