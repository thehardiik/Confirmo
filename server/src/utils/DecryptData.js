const Jimp = require("jimp");

async function Decryption (name) {

    let mes = ""
    let res =""
    const add = "./public/" + name;
    return Jimp.read(add)
    .then((data) => {
        
        for(let x = 0; x < data.bitmap.width; x++){
            for(let y = 0; y < data.bitmap.height; y++){

                
                const pixelColor = data.getPixelColor(x, y)
                const rgb = Jimp.intToRGBA(pixelColor);

                const messageBit = (rgb.b & 1).toString()

                mes = mes + messageBit
                
            }

            
        }

        const messageChars = [];

        for (let i = 0; i < mes.length; i += 8) {
            const byte = mes.slice(i, i + 8);
            const charCode = parseInt(byte, 2);
            if (charCode === 0) break; // Null character indicates end of message
            messageChars.push(String.fromCharCode(charCode));
        }


        return res = messageChars.join("")
        
    })

    

}

module.exports = Decryption