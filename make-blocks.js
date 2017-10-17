const fs = require('fs');

const makeBlock = (block) => {
  fs.writeFileSync(`./src/pug/blocks/_${block}.pug`, '')
  fs.appendFileSync(`./src/pug/${indexFile}.pug`, `\n\tinclude blocks/_${block}.pug`)
  fs.writeFileSync(`./src/stylus/blocks/_${block}.styl`, '')
  fs.appendFileSync('./src/stylus/style.styl', `\n@import './blocks/_${block}.styl'`)
}

const indexFile = process.argv[2];
const blocks = process.argv.slice(3);

blocks.forEach(makeBlock)
