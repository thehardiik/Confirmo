
const Jimp = require("jimp");


async function ImageEncryption (name, message) {

    // Split all the characters of a message
    const split = message.split('')

    // Return an array of binary equivalent of character padded with 0 to make it 8 digits
     
    const bin = split.map((char) => {
        return (char.charCodeAt(0).toString(2).padStart(8, '0'))
    })

    let ans = bin.join('')
    ans = ans + '00000000'


    const add = "./Public/" + name
    await Jimp.read(add)
    .then((data) => {

        messageIndex = 0
        for(let x = 0; x < data.bitmap.width; x++){
            for(let y = 0; y < data.bitmap.height; y++){
                if(messageIndex >= ans.length){
                    break;
                }
                const pixelColor = data.getPixelColor(x, y)
                const rgb = Jimp.intToRGBA(pixelColor);
                
                // Clear lsb of blue to 0
                let newBlue = (rgb.b & 254) | parseInt(ans[messageIndex], 2)
                
                const newColor = Jimp.rgbaToInt(rgb.r, rgb.g, newBlue, rgb.a);
                

                data.setPixelColor(newColor, x, y);

                messageIndex++
            }
            if(messageIndex >= ans.length){
                break;
            }
        }

        return data.writeAsync("./Output/Encrypted.png").then(() => {
            console.log("Successfully Completed")
        })

    }).catch((err) => {
        console.log(err)
        return err
    })

}

module.exports = ImageEncryption