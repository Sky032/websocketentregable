const fs= require('fs');


class Comentarios{
    constructor(ruta){
        this.ruta=ruta
    }


    async save(msj){

        try{
            let data = await fs.promises.readFile(this.ruta, 'utf8')
            let dataParse= JSON.parse(data)

            if(dataParse.length){
                await fs.promises.writeFile(this.ruta, JSON.stringify([...dataParse,{...msj,id: dataParse[dataParse.length-1].id  + 1}],null,2))
                console.log(`El id del comentario agregado es: ${dataParse.length+1}`)


            }else{
                await fs.promises.writeFile(this.ruta, JSON.stringify([{...msj,id: 1}],null,2))
                console.log(`El id del comentario creado es: ${dataParse[dataParse.length-1].id  + 1}`)
            }

            

        }catch(error){
            console.log(error)
        } 
    }


    async getAllComments(){
        try {
            let data = await fs.promises.readFile(this.ruta, 'utf8')
            let dataParse= JSON.parse(data)
            

            if(dataParse.length){
                // console.log(dataParse)
                return (dataParse)
            }else{
                console.log(`no hay comentarios`)
            }

        } catch (error) {
            console.log(error)
        }

    }

}

module.exports=Comentarios;