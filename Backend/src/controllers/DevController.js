const axios = require('axios')
const Dev = require('../models/Dev')
const parseStringAsArray = require('../utils/parseStringAsArray') 

//primeira funcao: rotas
//segunda funcao: funcao error function 

//METODOS HTTP: get(buscar), post(criar), put(editar ou atualizar), delete(deletar)

//Tipos de parametros:

//Query Params: <GET> request.query(Filtros, Ordenacao, Paginacao, ...)
//Rote Params: <PUT, DELETE> request.params(Identificar na alteracao ou remocao de um recurso)
//Body: <POST, PUT> request.body(Dados para criar ou alterar um registro)

//index(mostra lista de recursos), show(mostra um elemento), store(criar), update(alterar), destroy(deletar) 


module.exports = {
  async index(request, response) {
    const devs = await Dev.find()

    return response.json(devs)
  },

  async store(request, response) {
    const { github_username, techs, latitude, longitude } = request.body

    let dev = await Dev.findOne({ github_username })

    if(!dev) {
      const apiResponse = await axios.get(`https://api.github.com/users/${github_username}`)
  
      const { name = login, avatar_url, bio } = apiResponse.data
    
      //map() -> percorre o array
      //trim() -> remove espaçamentos antes e depois da string
      const techsArray = parseStringAsArray(techs)
    
      const location = {
        type: 'Point',
        coordinates: [longitude, latitude],
      }
    
      dev = await Dev.create({
        github_username,
        name,
        avatar_url,
        bio,
        techs: techsArray,
        location,
      })
  
    }
  
    return response.json(dev)
  },

  // desafio
  // async update() {

  // },

  // async destroy() {
    
  // },

}