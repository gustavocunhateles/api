
const Pilha = () => {

  const dados = []
  let topo = -1

  const show = () => {
      console.log(dados)
  }

  const add_author = (elemento) => {
      topo = topo + 1;
      dados[topo] = elemento
      console.log(dados)
  }

  const remove_author = () => {

      if(topo<0){
          return false
      }
    
      else{
         const itemToReturn = dados[topo]
         dados.splice(topo,1)
         topo = topo - 1;
         return itemToReturn
      }
    
  }

  return{
      show, add_author, remove_author
  }

}

export default Pilha;
