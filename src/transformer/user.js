const Transformer = require('object-transformer')

module.exports = {
  userList: (data) => {
    var listSchema = {
      name: 'firstName',
      emailId: 'email',
      gender: 'gender'
    }        
    const list = new Transformer.List(data, listSchema).parse()
    return list
  }
}