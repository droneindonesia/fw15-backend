const fs = require("fs")

const fileRemover = (file) => {
  if (file) {
    const filename = `uploads/${file.filename}`
    fs.unlink(filename, (err) => {
      try {
        if (err) {
          throw Error(err.message)
        }
      } catch (err) {
        console.log(err)
      }
    })
  }
}

module.exports = fileRemover
