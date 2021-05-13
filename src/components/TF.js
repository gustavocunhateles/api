//import Pilha from "./components/Pilha";

const TF = (TA) => {

  const TFSet = []
  let tf = 0
  let r_a_f = 1
  let dev = ""
  let topo = -1

  while(topo !== 0){

    dev = TA[topo]
    tf = tf + 1
    TFSet.add_author(dev)
    if(r_a_f >= 0.5){
      break;
    }
    TA.remove_author(dev)
  }

  return{
    tf, TFSet
  }

}

export default TF;
