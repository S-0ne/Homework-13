const fs = require('fs')
const { Transform } = require('stream')

const inputFilePath = 'textForRead.txt'
const outputFilePath = 'textForRead_Transform.txt'

const reader = fs.createReadStream(inputFilePath, { encoding: 'latin1' })
const writer = fs.createWriteStream(outputFilePath, { encoding: 'latin1' })

const modifyLettersStream = new Transform({
    transform(chunk, encoding, callback) {
        const modifiedChunk = chunk.toString('utf8').split('').map((letter, index) => {
            if ((index + 1) % 3 === 0) {
                return letter.toUpperCase()
            } else {
                return letter
            }
        }).join('')

        callback(null, modifiedChunk)
    }
})

reader.pipe(modifyLettersStream).pipe(writer)

writer.on('finish', () => {
    console.log('File processing complete.')
})

reader.on('error', (err) => {
    console.error('Error reading input file:', err)
})

writer.on('error', (err) => {
    console.error('Error writing output file:', err)
})