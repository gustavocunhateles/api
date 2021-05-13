/* eslint-disable jsx-a11y/img-redundant-alt */
import React, { Component } from "react";
import 'mobx-react-lite/batchingForReactDom';
import axios from "axios";
import Navbar from "../components/Navbar";
import Modal from "react-modal";
import InfiniteScroll from "react-infinite-scroller";
import ApiItem from "../components/ApiItem";
import ApiOption from "../components/ApiOption";
import ApiInfor from "../components/ApiInfor";
import { CSVLink } from "react-csv";
import "../sass/Repositorio.scss";
import "../sass/PullRequest.scss";
import "../styles/Global.css";
import "../styles/Reboot.css";

class AppEn extends Component {
  
  /*Definição da classe principal*/
  constructor() {
    super();
    this.state = {
      githubData: [],
      count: 5,
      isActive: false,
      githubRepo: [],
      hasMoreItems: true,
      githubPagina: [],
      //githubHeader: [],
      //githubUrl: [],
      githubCommits2: [],
      githubCommits3: [],
      githubCommits4: [],
      githubCommits5: [],
    };
  }

  /*Inicializando o componente Modal*/
  componentDidMount() { Modal.setAppElement("body"); }

  /*Carregando as informações do Modal através de Axios*/
  getModal = async (user, nomeDoRepo) => {
 
    var base = "https://api.github.com/repos/";

    await axios
    .get(base + user + "/" + nomeDoRepo + "/contributors?per_page=100&page=1")
    .then((repo) => {
      console.log("repo", repo);
      this.setState({ githubRepo: repo.data });
      console.log("repo.config.url", repo.config.url);
      this.setState({ githubUrl: repo.config.url + "!" });
      this.setState({ githubEndPoint: repo.config.url });
      console.log("repo.headers.link", repo.headers.link);
      //this.setState({ githubHeader: repo.headers.link });
    });

    await axios
    .get(base + user + "/" + nomeDoRepo + "/contributors?per_page=100&page=2")
    .then((repo) => {
      console.log("repo", repo);
      this.setState({ githubCommits2 : repo.data });
    });

    await axios
    .get(base + user + "/" + nomeDoRepo + "/contributors?per_page=100&page=3")
    .then((repo) => {
      console.log("repo", repo);
      this.setState({ githubCommits3 : repo.data });
    });

    await axios
    .get(base + user + "/" + nomeDoRepo + "/contributors?per_page=100&page=4")
    .then((repo) => {
      console.log("repo", repo);
      this.setState({ githubCommits4 : repo.data });
    });

    await axios
    .get(base + user + "/" + nomeDoRepo + "/contributors?per_page=100&page=5")
    .then((repo) => {
      console.log("repo", repo);
      this.setState({ githubCommits5 : repo.data });
    });

    this.setState({
      isActive: !this.state.isActive
    });
   
  };

  /*Carregando a primeira página através de Axios*/
  loadMore = (count) => {

    var baseUrl = "https://api.github.com/search/repositories";    
    var search = "?q=org:facebook&per_page=35&=Iv1.894126e290174aed&=d5c698dd554a669464dfdc1b36ce7756a475c16b";
    
    axios
      .get(baseUrl + search)
      .then((res) => {
        console.log("res", res);
        this.setState({ githubData: res.data.items });
      });
  };

  mudaOrg = (org) => {

    var baseUrl = "https://api.github.com/search/repositories/search/repositories?q=org:";    
    var client_id = "Iv1.894126e290174aed";
    var client_secret = "d5c698dd554a669464dfdc1b36ce7756a475c16b";

    axios
      .get(        
        baseUrl 
        + org
        + "&per_page=35&="
        + client_id
        + "&="
        + client_secret 
      )
      .then((res) => {
        console.log("res", res);
        this.setState({ githubData: res.data.items });
      });
  };

  render() {
    
    /*Inicializando as estruturas de dados*/
    const { githubData } = this.state;
    const { githubRepo } = this.state;
    //const { githubHeader } = this.state;
    //const { githubUrl } = this.state;
    const { githubCommits2 } = this.state; 
    const { githubCommits3 } = this.state; 
    const { githubCommits4 } = this.state; 
    const { githubCommits5 } = this.state; 
    const loader = <div className="loader"></div>;

    /* Função que mostra as páginas do repositório */
    /*
    const mudaPagina = (e) => {

      let pagina = e.target.value
      console.log(pagina)

      axios
      .get(         
        api.repoUrl
        + user(githubUrl, nomeDoRepo(githubUrl)) 
        + "/" 
        + nomeDoRepo(githubUrl) 
        + "/contributors?per_page=100&page=" 
        + pagina
      )      
      .then((repo) => {
        console.log("repo", repo);
        this.setState({ githubRepo: repo.data });
      });
  
    }
    */

    /*Função que mostra os repositórios da organização selecionada*/
    const mudaUrl = (e) => {

      let org = e.target.value
      console.log(org)

      axios
      .get(         
        api.baseUrl 
        + "/search/repositories?q=org:"
        + org
        + "&per_page=35&="
        + api.client_id
        + "&="
        + api.client_secret 
      )      
      .then((res) => {
        console.log("res", res);
        this.setState({ githubData: res.data.items });
      });
  
    }

    /*Constantes presentes na api do github*/
    const api = {
      baseUrl: "https://api.github.com",
      client_id: "Iv1.894126e290174aed",
      client_secret: "d5c698dd554a669464dfdc1b36ce7756a475c16b",
      repoUrl: "https://api.github.com/repos/",
    };

    /*Função que retorna a última página de um header link*/
    /*
    const ultimaPagina = (header) => {  

      var pagina = 0;

      for(var i in header){
        if(header[i] === "a" && header[i-1] === "l" && header[i-2] === '"'){
          pagina += parseInt(header[i-10]);
        }
      }

      if(pagina === 0){ pagina = 1; }

      return pagina;
    }  
    */

    /* Retorna a palavra sem aspas simples */
    /*
    const semAspasSimples = (a) => {
      if (a.charAt(0) === '"' && a.charAt(a.length-1) === '"') {
          return a.substr(1, a.length-2);
      }
      return a;
    }
    */

    /* Retorna da opção com valor 1 até valor da última página */
    /*
    const opcoes = () => {  
      
      var u = ultimaPagina+1;
      
      for (var i=1; i<u; i++) {
        return <ApiOption item={i} itemName={i}/>;
      }

    }
    */

    /* Atualiza a página */
    function voltaPagina(){ 
      window.location.href = "https://gustavocunhateles.github.io";
    }

    /* Retorna o inverso de uma palavra */
    /*
    function reverse(string) {
      var res = '';
      for (var i = string.length - 1; i >= 0; i--) {
        res += string[i];
      }
      return res;
    }
    */

    /* Retorna o nome do projeto */
    /*
    const nomeDoRepo = (url) => {  

      var nome = [];

      for(var i in url){
        if(url[i] === "t" && url[i-1] === "n" && url[i-2] === "o" && url[i-3] === "c" && url[i-4] === "/"){
          for(var j=i-5; url[j] !== "/"; j--){
            nome += url[j];
          }
        }
      }
    
      var nomeDoRepo = reverse(nome);
      console.log("nomeDoRepo: ", nomeDoRepo);

      return nomeDoRepo;
    } 
    */

    /* Retorna o nome da organização que construiu o projeto */
    /*
    const user = (url, nomeDoRepo) => {  

      var org = [];
      var contadorBarraUrl = 0;

      for(var i in url){
        if(url[i] === "/" && contadorBarraUrl < 5){
          if(contadorBarraUrl === 4){
            for(var j=i-1; url[j] !== "/"; j--){
              org += url[j];
            }
          }
          else{
            contadorBarraUrl++;
          }
        }
      }
  
      var user = reverse(org);
      user = user.replace(nomeDoRepo, '');
      console.log("user: ", user);

      return user;
    } 
    */

    /*Função que retorna a última página de um header link*/
    /*
    const paginaAtual = (url) => {  

      var pagina = 0;

      for(var i in url){
        if(url[i] === "!"){
          pagina += parseInt(url[i-1]);
        }
      }

      return pagina;
    } 
    */

    /*Pegando o ano do formato MM/DD/YYYY*/
    const getAnoAtual = (data) => {

      var ano = [];

      for(var i in data){
        if(data[i-2] === "0" && data[i-3] === "2"){
          ano += data[i-3];
          ano += data[i-2];
          ano += data[i-1];
          ano += data[i];
        }
      }   
      
      if (ano === []) { ano = 0; }

      return parseInt(ano); //exception
    }

    /*Pegando o mês do formato MM/DD/YYYY*/
    /*
    const getMesAtual = (data) => {

      var mes = data[0];
      if(data[1] !== "/"){ mes += data[1]; }        
      if (mes === []) { mes = 0; }

      return parseInt(mes); //exception
    }
    */

    /*Pegando os dias do formato MM/DD/YYYY*/
    /*
    const getDiaAtual = (data) => {

      var dia = [];

      for(var i in data){
        if(data[i-2] === "0" && data[i-3] === "2"){
          if(data[i-6] !== "/"){
            dia += data[i-6];
          }
          dia += data[i-5];
        }
      }  
      
      if (dia === []) { dia = 0; } //exception
      
      return parseInt(dia);
    }
    */

    /*Pegando o ano do formato YYYY-MM-DDTHH:MM:SSZ*/
    const getAnoGithub = (data) => {

      var ano = [];
      for(var i=0; i<4; i++) { ano += data[i]; }
      if (ano === []) { ano = 0; } //exception

      return parseInt(ano);
    }

    /*Pegando o mês do formato YYYY-MM-DDTHH:MM:SSZ*/
    /*
    const getMesGithub = (data) => {

      var mes = [];
      for(var i=5; i<7; i++) { mes += data[i]; }
      if (mes === []) { mes = 0; } //exception

      return parseInt(mes);
    }
    */

    /*Pegando os dias do formato YYYY-MM-DDTHH:MM:SSZ*/
    /*
    const getDiaGithub = (data) => {

      var dia = [];
      for(var i=8; i<10; i++) { dia += data[i]; }
      if (dia === []) { dia = 0; } //exception

      return parseInt(dia);
    }
    */

    /* Idade do projeto em anos */
    const idadeRepo = (data) => {  
      
      var dataAtual = new Date().toLocaleDateString('en-US');
      var idade = 0;

      /*
      var tempoAtual = getDiaAtual(dataAtual) + getMesAtual(dataAtual)*30 + getAnoAtual(dataAtual)*365;
      var tempoInicial = getDiaGithub(dataInicial) + getMesGithub(dataInicial)*30 + getAnoGithub(dataInicial)*365;
      
      var tempoTotal = tempoAtual - tempoInicial;
      var dias = tempoTotal /(1000 * 3600 * 24); 

      if (dias < 365){ idade = 1; }
      else{ idade = Math.round(dias/365); }
      */

      var anoAtual = getAnoAtual(dataAtual);
      var anoGithub = getAnoGithub(data);

      if(anoAtual - anoGithub === 0){
        idade = 1;
      }
      else{
        idade = anoAtual - anoGithub;
      }
      
      return idade;  
    }
   
    /*Função que retorna a soma dos elementos de uma lista*/
    const somaLista = (lista) => {  
    
      var valor = 0;  
      for(var i in lista){
        valor += lista[i];
      }
      return valor;
    }

    /*Função que retorna a média dos elementos de uma lista*/
    /*
    const mediaLista = (lista) => { 
  
      var valor = 0;
      for(var i in lista){
        valor += lista[i];
      }
      valor /= (parseInt(i, 10)+1);
      return valor;
    }
    */

    /*Função que retorna a metade do valor da soma dos elementos de uma lista*/
    const cct = (somaLista) => { 
      
      return somaLista/2; 
    }

    /*Função que retorna o truck factor de uma lista*/
    const truckFactor = (lista, cct) => { 

      var tf = 0;
      var valor = 0;

      for(var i in lista){       
        valor += lista[i];        
        if(valor > cct){ 
          break; 
        }        
        else{ 
          tf++; 
        }
      }

      if(tf===0){ tf = 1; }

      return tf;
    }

    /*Função que retorna o principal mantenedor de uma lista ou o grupo de mantenedores*/
    const mantenedor = (lista, truckFactor) => {	

      var listaNome = lista;
      var mantenedores = "";

      if(truckFactor===1){
        return "If " +listaNome[0] +" leaves this project, there will probably be no continuity.";
      }
      
      else{       

        for(var i=0; i<truckFactor; i++){

          mantenedores += listaNome[i];

          if(i===(truckFactor-1)){ 
            mantenedores += " " 
          }
          else if(i===(truckFactor-2)){ 
            mantenedores += " and " 
          }
          else{ 
            mantenedores += ", " 
          }       
        }
        return mantenedores +"are the main maintainers of this project.";
      }

    }

    /* Retorna a quantidade de contribuidores de uma lista */
    const contribuidor = (lista) => {	

      var contribuidores = lista.length;
      return contribuidores;
    }  

    /* Retorna o enésimo elemento da lista */
    const listaN = (lista, n) => {	

      var listaNome = lista;
      return listaNome[n];

    }

    /* -------------------------------- RELATÓRIOS -------------------------------- */

    /* Lista de commits da primeira página */
    const listaCommitsPag1 = githubRepo.map((name, index) => (name.contributions));

    /* Total de commits das primeiras páginas */
    const commitsPag1 = somaLista(githubRepo.map((name, index) => (name.contributions)));
    const commitsPag2 = somaLista(githubCommits2.map((name, index) => (name.contributions)));
    const commitsPag3 = somaLista(githubCommits3.map((name, index) => (name.contributions)));
    const commitsPag4 = somaLista(githubCommits4.map((name, index) => (name.contributions)));
    const commitsPag5 = somaLista(githubCommits5.map((name, index) => (name.contributions)));

    /* Lista de mantenedores da primeira página */
    const listaMantPag1 = githubRepo.map((name, index) => (name.login));

    /* Total de mantenedores das primeiras páginas */
    const mantPag1 = contribuidor(githubRepo.map((name, index) => (name.login)));
    const mantPag2 = contribuidor(githubCommits2.map((name, index) => (name.login)));
    const mantPag3 = contribuidor(githubCommits3.map((name, index) => (name.login)));
    const mantPag4 = contribuidor(githubCommits4.map((name, index) => (name.login)));
    const mantPag5 = contribuidor(githubCommits5.map((name, index) => (name.login)));

    const headers = [
      { label: 'Organization', key: 'org' },
      { label: 'Project', key: 'proj' },
      { label: 'Language', key: 'lang' },
      { label: 'Stars', key: 'star' },
      { label: 'Age', key: 'age' },
      { label: 'Maintainers', key: 'mant' },
      { label: 'Truck Factor', key: 'tf' },
    ];

    const headersSemTf = [
      { label: 'Organização', key: 'org' },
      { label: 'Projeto', key: 'proj' }
    ];

    const org = githubData.map((name, index) => (name.owner.login));
    const proj = githubData.map((name, index) => (name.name));
    const lang = githubData.map((name, index) => (name.language));
    const star = githubData.map((name, index) => (name.stargazers_count));
    const age = 
      githubData.map((name, index) => (
        getAnoAtual(new Date().toLocaleDateString('en-US')) - getAnoGithub(name.created_at) === 0 ?
          1 :
          getAnoAtual(new Date().toLocaleDateString('en-US')) - getAnoGithub(name.created_at)
       ));
    //const mant = mantPag1 + mantPag2 + mantPag3 + mantPag4 + mantPag5;
    //const tf = truckFactor(listaCommitsPag1, cct(commitsPag1 + commitsPag2 + commitsPag3 + commitsPag4 + commitsPag5));

    const data = [
      {org: listaN(org,0), proj: listaN(proj, 0)},
      {org: listaN(org,0), proj: listaN(proj, 1)},
      {org: listaN(org,0), proj: listaN(proj, 2)},
      {org: listaN(org,0), proj: listaN(proj, 3)},
      {org: listaN(org,0), proj: listaN(proj, 4)},
      {org: listaN(org,0), proj: listaN(proj, 5)},
      {org: listaN(org,0), proj: listaN(proj, 6)},
      {org: listaN(org,0), proj: listaN(proj, 7)},
      {org: listaN(org,0), proj: listaN(proj, 8)},
      {org: listaN(org,0), proj: listaN(proj, 9)},
      {org: listaN(org,0), proj: listaN(proj, 10)},
      {org: listaN(org,0), proj: listaN(proj, 11)},
      {org: listaN(org,0), proj: listaN(proj, 12)},
      {org: listaN(org,0), proj: listaN(proj, 13)},
      {org: listaN(org,0), proj: listaN(proj, 14)},
      {org: listaN(org,0), proj: listaN(proj, 15)},
      {org: listaN(org,0), proj: listaN(proj, 16)},
      {org: listaN(org,0), proj: listaN(proj, 17)},
      {org: listaN(org,0), proj: listaN(proj, 18)},
      {org: listaN(org,0), proj: listaN(proj, 19)},
      {org: listaN(org,0), proj: listaN(proj, 20)},
      {org: listaN(org,0), proj: listaN(proj, 21)},
      {org: listaN(org,0), proj: listaN(proj, 22)},
      {org: listaN(org,0), proj: listaN(proj, 23)},
      {org: listaN(org,0), proj: listaN(proj, 24)},
      {org: listaN(org,0), proj: listaN(proj, 25)},
      {org: listaN(org,0), proj: listaN(proj, 26)},
      {org: listaN(org,0), proj: listaN(proj, 27)},
      {org: listaN(org,0), proj: listaN(proj, 28)},
      {org: listaN(org,0), proj: listaN(proj, 29)},
      {org: listaN(org,0), proj: listaN(proj, 30)},
      {org: listaN(org,0), proj: listaN(proj, 31)},
      {org: listaN(org,0), proj: listaN(proj, 32)},
      {org: listaN(org,0), proj: listaN(proj, 33)},
      {org: listaN(org,0), proj: listaN(proj, 34)},
    ];

    const dataFacebook = [
      {org: listaN(org,0), proj: listaN(proj,0), lang: listaN(lang,0), star: listaN(star,0), age: listaN(age,0), mant: 431, tf: 4},
      {org: listaN(org,0), proj: listaN(proj,1), lang: listaN(lang,1), star: listaN(star,1), age: listaN(age,1), mant: 357, tf: 16},
      {org: listaN(org,0), proj: listaN(proj,2), lang: listaN(lang,2), star: listaN(star,2), age: listaN(age,2), mant: 471, tf: 3},
      {org: listaN(org,0), proj: listaN(proj,3), lang: listaN(lang,3), star: listaN(star,3), age: listaN(age,3), mant: 439, tf: 5},
      {org: listaN(org,0), proj: listaN(proj,4), lang: listaN(lang,4), star: listaN(star,4), age: listaN(age,4), mant: 455, tf: 3},
      {org: listaN(org,0), proj: listaN(proj,5), lang: listaN(lang,5), star: listaN(star,5), age: listaN(age,5), mant: 389, tf: 4},
      {org: listaN(org,0), proj: listaN(proj,6), lang: listaN(lang,6), star: listaN(star,6), age: listaN(age,6), mant: 243, tf: 7},
      {org: listaN(org,0), proj: listaN(proj,7), lang: listaN(lang,7), star: listaN(star,7), age: listaN(age,7), mant: 327, tf: 6},
      {org: listaN(org,0), proj: listaN(proj,8), lang: listaN(lang,8), star: listaN(star,8), age: listaN(age,8), mant: 126, tf: 3},
      {org: listaN(org,0), proj: listaN(proj,9), lang: listaN(lang,9), star: listaN(star,9), age: listaN(age,9), mant: 286, tf: 19},
      {org: listaN(org,0), proj: listaN(proj,10), lang: listaN(lang,10), star: listaN(star,10), age: listaN(age,10), mant: 303, tf: 9},
      {org: listaN(org,0), proj: listaN(proj,11), lang: listaN(lang,11), star: listaN(star,11), age: listaN(age,11), mant: 199, tf: 3},
      {org: listaN(org,0), proj: listaN(proj,12), lang: listaN(lang,12), star: listaN(star,12), age: listaN(age,12), mant: 367, tf: 4},
      {org: listaN(org,0), proj: listaN(proj,13), lang: listaN(lang,13), star: listaN(star,13), age: listaN(age,13), mant: 82, tf: 2},
      {org: listaN(org,0), proj: listaN(proj,14), lang: listaN(lang,14), star: listaN(star,14), age: listaN(age,14), mant: 179, tf: 1},
      {org: listaN(org,0), proj: listaN(proj,15), lang: listaN(lang,15), star: listaN(star,15), age: listaN(age,15), mant: 768, tf: 4},
      {org: listaN(org,0), proj: listaN(proj,16), lang: listaN(lang,16), star: listaN(star,16), age: listaN(age,16), mant: 114, tf: 1},
      {org: listaN(org,0), proj: listaN(proj,17), lang: listaN(lang,17), star: listaN(star,17), age: listaN(age,17), mant: 50, tf: 1},
      {org: listaN(org,0), proj: listaN(proj,18), lang: listaN(lang,18), star: listaN(star,18), age: listaN(age,18), mant: 124, tf: 3},
      {org: listaN(org,0), proj: listaN(proj,19), lang: "JavaScript", star: listaN(star,19), age: listaN(age,19), mant: 108, tf: 2},
      {org: listaN(org,0), proj: listaN(proj,20), lang: listaN(lang,20), star: listaN(star,20), age: listaN(age,20), mant: 170, tf: 1},
      {org: listaN(org,0), proj: listaN(proj,21), lang: listaN(lang,21), star: listaN(star,21), age: listaN(age,21), mant: 47, tf: 1},
      {org: listaN(org,0), proj: listaN(proj,22), lang: listaN(lang,22), star: listaN(star,22), age: listaN(age,22), mant: 192, tf: 3},
      {org: listaN(org,0), proj: listaN(proj,23), lang: listaN(lang,23), star: listaN(star,23), age: listaN(age,23), mant: 300, tf: 10},
      {org: listaN(org,0), proj: listaN(proj,24), lang: listaN(lang,24), star: listaN(star,24), age: listaN(age,24), mant: 227, tf: 5},
      {org: listaN(org,0), proj: listaN(proj,25), lang: listaN(lang,25), star: listaN(star,25), age: listaN(age,25), mant: 197, tf: 6},
      {org: listaN(org,0), proj: listaN(proj,26), lang: listaN(lang,26), star: listaN(star,26), age: listaN(age,26), mant: 114, tf: 3},
      {org: listaN(org,0), proj: listaN(proj,27), lang: listaN(lang,27), star: listaN(star,27), age: listaN(age,27), mant: 79, tf: 1},
      {org: listaN(org,0), proj: listaN(proj,28), lang: listaN(lang,28), star: listaN(star,28), age: listaN(age,28), mant: 98, tf: 3},
      {org: listaN(org,0), proj: listaN(proj,29), lang: listaN(lang,29), star: listaN(star,29), age: listaN(age,29), mant: 106, tf: 3},
      {org: listaN(org,0), proj: listaN(proj,30), lang: listaN(lang,30), star: listaN(star,30), age: listaN(age,30), mant: 105, tf: 5},
      {org: listaN(org,0), proj: listaN(proj,31), lang: listaN(lang,31), star: listaN(star,31), age: listaN(age,31), mant: 126, tf: 5},
      {org: listaN(org,0), proj: listaN(proj,32), lang: listaN(lang,32), star: listaN(star,32), age: listaN(age,32), mant: 106, tf: 2},
      {org: listaN(org,0), proj: listaN(proj,33), lang: listaN(lang,33), star: listaN(star,33), age: listaN(age,33), mant: 60, tf: 1},
      {org: listaN(org,0), proj: listaN(proj,34), lang: listaN(lang,34), star: listaN(star,34), age: listaN(age,34), mant: 24, tf: 1},
    ];                     
						   
    const dataGoogle = [  
      {org: listaN(org,0), proj: listaN(proj,0), lang: "JavaScript", star: listaN(star,0), age: listaN(age,0), mant: 21, tf: 1},
      {org: listaN(org,0), proj: listaN(proj,1), lang: listaN(lang,1), star: listaN(star,1), age: listaN(age,1), mant: 257, tf: 2},
      {org: listaN(org,0), proj: listaN(proj,2), lang: listaN(lang,2), star: listaN(star,2), age: listaN(age,2), mant: 167, tf: 1},
      {org: listaN(org,0), proj: listaN(proj,3), lang: listaN(lang,3), star: listaN(star,3), age: listaN(age,3), mant: 65, tf: 6},
      {org: listaN(org,0), proj: listaN(proj,4), lang: listaN(lang,4), star: listaN(star,4), age: listaN(age,4), mant: 35, tf: 1},
      {org: listaN(org,0), proj: listaN(proj,5), lang: listaN(lang,5), star: listaN(star,5), age: listaN(age,5), mant: 316, tf: 1},
      {org: listaN(org,0), proj: listaN(proj,6), lang: listaN(lang,6), star: listaN(star,6), age: listaN(age,6), mant: 56, tf: 3},
      {org: listaN(org,0), proj: listaN(proj,7), lang: listaN(lang,7), star: listaN(star,7), age: listaN(age,7), mant: 103, tf: 1},
      {org: listaN(org,0), proj: listaN(proj,8), lang: listaN(lang,8), star: listaN(star,8), age: listaN(age,8), mant: 43, tf: 1},
      {org: listaN(org,0), proj: listaN(proj,9), lang: listaN(lang,9), star: listaN(star,9), age: listaN(age,9), mant: 68, tf: 1},
      {org: listaN(org,0), proj: listaN(proj,10), lang: listaN(lang,10), star: listaN(star,10), age: listaN(age,10), mant: 190, tf: 1},
      {org: listaN(org,0), proj: listaN(proj,11), lang: listaN(lang,11), star: listaN(star,11), age: listaN(age,11), mant: 29, tf: 1},
      {org: listaN(org,0), proj: listaN(proj,12), lang: "JavaScript", star: listaN(star,12), age: listaN(age,12), mant: 12, tf: 1},
      {org: listaN(org,0), proj: listaN(proj,13), lang: listaN(lang,13), star: listaN(star,13), age: listaN(age,13), mant: 426, tf: 5},
      {org: listaN(org,0), proj: listaN(proj,14), lang: listaN(lang,14), star: listaN(star,14), age: listaN(age,14), mant: 58, tf: 1},
      {org: listaN(org,0), proj: listaN(proj,15), lang: "Python", star: listaN(star,15), age: listaN(age,15), mant: 5, tf: 1},
      {org: listaN(org,0), proj: listaN(proj,16), lang: listaN(lang,16), star: listaN(star,16), age: listaN(age,16), mant: 17, tf: 1},
      {org: listaN(org,0), proj: listaN(proj,17), lang: listaN(lang,17), star: listaN(star,17), age: listaN(age,17), mant: 260, tf: 1},
      {org: listaN(org,0), proj: listaN(proj,18), lang: listaN(lang,18), star: listaN(star,18), age: listaN(age,18), mant: 104, tf: 4},
      {org: listaN(org,0), proj: listaN(proj,19), lang: listaN(lang,19), star: listaN(star,19), age: listaN(age,19), mant: 254, tf: 3},
      {org: listaN(org,0), proj: listaN(proj,20), lang: listaN(lang,20), star: listaN(star,20), age: listaN(age,20), mant: 407, tf: 3},
      {org: listaN(org,0), proj: listaN(proj,21), lang: listaN(lang,21), star: listaN(star,21), age: listaN(age,21), mant: 115, tf: 1},
      {org: listaN(org,0), proj: listaN(proj,22), lang: listaN(lang,22), star: listaN(star,22), age: listaN(age,22), mant: 1, tf: 1},
      {org: listaN(org,0), proj: listaN(proj,23), lang: listaN(lang,23), star: listaN(star,23), age: listaN(age,23), mant: 82, tf: 3},
      {org: listaN(org,0), proj: listaN(proj,24), lang: listaN(lang,24), star: listaN(star,24), age: listaN(age,24), mant: 140, tf: 6},
      {org: listaN(org,0), proj: listaN(proj,25), lang: listaN(lang,25), star: listaN(star,25), age: listaN(age,25), mant: 77, tf: 1},
      {org: listaN(org,0), proj: listaN(proj,26), lang: listaN(lang,26), star: listaN(star,26), age: listaN(age,26), mant: 27, tf: 1},
      {org: listaN(org,0), proj: listaN(proj,27), lang: listaN(lang,27), star: listaN(star,27), age: listaN(age,27), mant: 60, tf: 1},
      {org: listaN(org,0), proj: listaN(proj,28), lang: listaN(lang,28), star: listaN(star,28), age: listaN(age,28), mant: 76, tf: 1},
      {org: listaN(org,0), proj: listaN(proj,29), lang: listaN(lang,29), star: listaN(star,29), age: listaN(age,29), mant: 8, tf: 1},
      {org: listaN(org,0), proj: listaN(proj,30), lang: listaN(lang,30), star: listaN(star,30), age: listaN(age,30), mant: 72, tf: 1},
      {org: listaN(org,0), proj: listaN(proj,31), lang: listaN(lang,31), star: listaN(star,31), age: listaN(age,31), mant: 141, tf: 2},
      {org: listaN(org,0), proj: listaN(proj,32), lang: listaN(lang,32), star: listaN(star,32), age: listaN(age,32), mant: 52, tf: 1},
      {org: listaN(org,0), proj: listaN(proj,33), lang: listaN(lang,33), star: listaN(star,33), age: listaN(age,33), mant: 86, tf: 1},
      {org: listaN(org,0), proj: listaN(proj,34), lang: listaN(lang,34), star: listaN(star,34), age: listaN(age,34), mant: 378, tf: 2},
    ];                     
						   
    const dataIbm = [      
      {org: listaN(org,0), proj: listaN(proj,0), lang: listaN(lang,0), star: listaN(star,0), age: listaN(age,0), mant: 14, tf: 1},
      {org: listaN(org,0), proj: listaN(proj,1), lang: listaN(lang,1), star: listaN(star,1), age: listaN(age,1), mant: 8, tf: 1},
      {org: listaN(org,0), proj: listaN(proj,2), lang: listaN(lang,2), star: listaN(star,2), age: listaN(age,2), mant: 7, tf: 1},
      {org: listaN(org,0), proj: listaN(proj,3), lang: listaN(lang,3), star: listaN(star,3), age: listaN(age,3), mant: 9, tf: 1},
      {org: listaN(org,0), proj: listaN(proj,4), lang: listaN(lang,4), star: listaN(star,4), age: listaN(age,4), mant: 14, tf: 1},
      {org: listaN(org,0), proj: listaN(proj,5), lang: listaN(lang,5), star: listaN(star,5), age: listaN(age,5), mant: 19, tf: 1},
      {org: listaN(org,0), proj: listaN(proj,6), lang: listaN(lang,6), star: listaN(star,6), age: listaN(age,6), mant: 51, tf: 2},
      {org: listaN(org,0), proj: listaN(proj,7), lang: listaN(lang,7), star: listaN(star,7), age: listaN(age,7), mant: 28, tf: 1},
      {org: listaN(org,0), proj: listaN(proj,8), lang: listaN(lang,8), star: listaN(star,8), age: listaN(age,8), mant: 10, tf: 1},
      {org: listaN(org,0), proj: listaN(proj,9), lang: listaN(lang,9), star: listaN(star,9), age: listaN(age,9), mant: 3, tf: 1},
      {org: listaN(org,0), proj: listaN(proj,10), lang: listaN(lang,10), star: listaN(star,10), age: listaN(age,10), mant: 13, tf: 1},
      {org: listaN(org,0), proj: listaN(proj,11), lang: listaN(lang,11), star: listaN(star,11), age: listaN(age,11), mant: 14, tf: 1},
      {org: listaN(org,0), proj: listaN(proj,12), lang: listaN(lang,12), star: listaN(star,12), age: listaN(age,12), mant: 16, tf: 1},
      {org: listaN(org,0), proj: listaN(proj,13), lang: listaN(lang,13), star: listaN(star,13), age: listaN(age,13), mant: 7, tf: 1},
      {org: listaN(org,0), proj: listaN(proj,14), lang: listaN(lang,14), star: listaN(star,14), age: listaN(age,14), mant: 12, tf: 1},
      {org: listaN(org,0), proj: listaN(proj,15), lang: listaN(lang,15), star: listaN(star,15), age: listaN(age,15), mant: 7, tf: 1},
      {org: listaN(org,0), proj: listaN(proj,16), lang: listaN(lang,16), star: listaN(star,16), age: listaN(age,16), mant: 12, tf: 1},
      {org: listaN(org,0), proj: listaN(proj,17), lang: listaN(lang,17), star: listaN(star,17), age: listaN(age,17), mant: 9, tf: 1},
      {org: listaN(org,0), proj: listaN(proj,18), lang: listaN(lang,18), star: listaN(star,18), age: listaN(age,18), mant: 23, tf: 1},
      {org: listaN(org,0), proj: listaN(proj,19), lang: listaN(lang,19), star: listaN(star,19), age: listaN(age,19), mant: 17, tf: 1},
      {org: listaN(org,0), proj: listaN(proj,20), lang: listaN(lang,20), star: listaN(star,20), age: listaN(age,20), mant: 9, tf: 1},
      {org: listaN(org,0), proj: listaN(proj,21), lang: listaN(lang,21), star: listaN(star,21), age: listaN(age,21), mant: 53, tf: 1},
      {org: listaN(org,0), proj: listaN(proj,22), lang: listaN(lang,22), star: listaN(star,22), age: listaN(age,22), mant: 9, tf: 1},
      {org: listaN(org,0), proj: listaN(proj,23), lang: listaN(lang,23), star: listaN(star,23), age: listaN(age,23), mant: 23, tf: 1},
      {org: listaN(org,0), proj: listaN(proj,24), lang: listaN(lang,24), star: listaN(star,24), age: listaN(age,24), mant: 14, tf: 1},
      {org: listaN(org,0), proj: listaN(proj,25), lang: listaN(lang,25), star: listaN(star,25), age: listaN(age,25), mant: 27, tf: 1},
      {org: listaN(org,0), proj: listaN(proj,26), lang: listaN(lang,26), star: listaN(star,26), age: listaN(age,26), mant: 14, tf: 1},
      {org: listaN(org,0), proj: listaN(proj,27), lang: listaN(lang,27), star: listaN(star,27), age: listaN(age,27), mant: 41, tf: 1},
      {org: listaN(org,0), proj: listaN(proj,28), lang: listaN(lang,28), star: listaN(star,28), age: listaN(age,28), mant: 4, tf: 1},
      {org: listaN(org,0), proj: listaN(proj,29), lang: listaN(lang,29), star: listaN(star,29), age: listaN(age,29), mant: 6, tf: 1},
      {org: listaN(org,0), proj: listaN(proj,30), lang: listaN(lang,30), star: listaN(star,30), age: listaN(age,30), mant: 20, tf: 2},
      {org: listaN(org,0), proj: listaN(proj,31), lang: listaN(lang,31), star: listaN(star,31), age: listaN(age,31), mant: 8, tf: 1},
      {org: listaN(org,0), proj: listaN(proj,32), lang: listaN(lang,32), star: listaN(star,32), age: listaN(age,32), mant: 22, tf: 2},
      {org: listaN(org,0), proj: listaN(proj,33), lang: listaN(lang,33), star: listaN(star,33), age: listaN(age,33), mant: 4, tf: 1},
      {org: listaN(org,0), proj: listaN(proj,34), lang: listaN(lang,34), star: listaN(star,34), age: listaN(age,34), mant: 6, tf: 1},
    ];                     
						   
    const dataMicrosoft = [
      {org: listaN(org,0), proj: listaN(proj,0), lang: listaN(lang,0), star: listaN(star,0), age: listaN(age,0), mant: 360, tf: 5},
      {org: listaN(org,0), proj: listaN(proj,1), lang: listaN(lang,1), star: listaN(star,1), age: listaN(age,1), mant: 272, tf: 2},
      {org: listaN(org,0), proj: listaN(proj,2), lang: listaN(lang,2), star: listaN(star,2), age: listaN(age,2), mant: 400, tf: 5},
      {org: listaN(org,0), proj: listaN(proj,3), lang: listaN(lang,3), star: listaN(star,3), age: listaN(age,3), mant: 226, tf: 5},
      {org: listaN(org,0), proj: listaN(proj,4), lang: listaN(lang,4), star: listaN(star,4), age: listaN(age,4), mant: 80, tf: 1},
      {org: listaN(org,0), proj: listaN(proj,5), lang: listaN(lang,5), star: listaN(star,5), age: listaN(age,5), mant: 98, tf: 2},
      {org: listaN(org,0), proj: listaN(proj,6), lang: listaN(lang,6), star: listaN(star,6), age: listaN(age,6), mant: 71, tf: 3},
      {org: listaN(org,0), proj: listaN(proj,7), lang: listaN(lang,7), star: listaN(star,7), age: listaN(age,7), mant: 60, tf: 3},
      {org: listaN(org,0), proj: listaN(proj,8), lang: listaN(lang,8), star: listaN(star,8), age: listaN(age,8), mant: 197, tf: 9},
      {org: listaN(org,0), proj: listaN(proj,9), lang: "JavaScript", star: listaN(star,9), age: listaN(age,9), mant: 51, tf: 4},
      {org: listaN(org,0), proj: listaN(proj,10), lang: listaN(lang,10), star: listaN(star,10), age: listaN(age,10), mant: 31, tf: 1},
      {org: listaN(org,0), proj: listaN(proj,11), lang: listaN(lang,11), star: listaN(star,11), age: listaN(age,11), mant: 12, tf: 1},
      {org: listaN(org,0), proj: listaN(proj,12), lang: listaN(lang,12), star: listaN(star,12), age: listaN(age,12), mant: 171, tf: 3},
      {org: listaN(org,0), proj: listaN(proj,13), lang: listaN(lang,13), star: listaN(star,13), age: listaN(age,13), mant: 210, tf: 1},
      {org: listaN(org,0), proj: listaN(proj,14), lang: listaN(lang,14), star: listaN(star,14), age: listaN(age,14), mant: 401, tf: 6},
      {org: listaN(org,0), proj: listaN(proj,15), lang: listaN(lang,15), star: listaN(star,15), age: listaN(age,15), mant: 295, tf: 7},
      {org: listaN(org,0), proj: listaN(proj,16), lang: listaN(lang,16), star: listaN(star,16), age: listaN(age,16), mant: 169, tf: 1},
      {org: listaN(org,0), proj: listaN(proj,17), lang: listaN(lang,17), star: listaN(star,17), age: listaN(age,17), mant: 46, tf: 1},
      {org: listaN(org,0), proj: listaN(proj,18), lang: listaN(lang,18), star: listaN(star,18), age: listaN(age,18), mant: 408, tf: 15},
      {org: listaN(org,0), proj: listaN(proj,19), lang: listaN(lang,19), star: listaN(star,19), age: listaN(age,19), mant: 35, tf: 3},
      {org: listaN(org,0), proj: listaN(proj,20), lang: listaN(lang,20), star: listaN(star,20), age: listaN(age,20), mant: 16, tf: 1},
      {org: listaN(org,0), proj: listaN(proj,21), lang: listaN(lang,21), star: listaN(star,21), age: listaN(age,21), mant: 39, tf: 1},
      {org: listaN(org,0), proj: listaN(proj,22), lang: listaN(lang,22), star: listaN(star,22), age: listaN(age,22), mant: 68, tf: 1},
      {org: listaN(org,0), proj: listaN(proj,23), lang: listaN(lang,23), star: listaN(star,23), age: listaN(age,23), mant: 115, tf: 5},
      {org: listaN(org,0), proj: listaN(proj,24), lang: listaN(lang,24), star: listaN(star,24), age: listaN(age,24), mant: 68, tf: 4},
      {org: listaN(org,0), proj: listaN(proj,25), lang: listaN(lang,25), star: listaN(star,25), age: listaN(age,25), mant: 41, tf: 2},
      {org: listaN(org,0), proj: listaN(proj,26), lang: listaN(lang,26), star: listaN(star,26), age: listaN(age,26), mant: 33, tf: 1},
      {org: listaN(org,0), proj: listaN(proj,27), lang: "JavaScript", star: listaN(star,27), age: listaN(age,27), mant: 32, tf: 2},
      {org: listaN(org,0), proj: listaN(proj,28), lang: listaN(lang,28), star: listaN(star,28), age: listaN(age,28), mant: 113, tf: 1},
      {org: listaN(org,0), proj: listaN(proj,29), lang: listaN(lang,29), star: listaN(star,29), age: listaN(age,29), mant: 5, tf: 1},
      {org: listaN(org,0), proj: listaN(proj,30), lang: listaN(lang,30), star: listaN(star,30), age: listaN(age,30), mant: 8, tf: 1},
      {org: listaN(org,0), proj: listaN(proj,31), lang: listaN(lang,31), star: listaN(star,31), age: listaN(age,31), mant: 37, tf: 1},
      {org: listaN(org,0), proj: listaN(proj,32), lang: listaN(lang,32), star: listaN(star,32), age: listaN(age,32), mant: 132, tf: 1},
      {org: listaN(org,0), proj: listaN(proj,33), lang: listaN(lang,33), star: listaN(star,33), age: listaN(age,33), mant: 6, tf: 1},
      {org: listaN(org,0), proj: listaN(proj,34), lang: "JavaScript", star: listaN(star,34), age: listaN(age,34), mant: 50, tf: 1},
    ];                     
						   
    const dataOracle = [   
      {org: listaN(org,0), proj: listaN(proj,0), lang: listaN(lang,0), star: listaN(star,0), age: listaN(age,0), mant: 206, tf: 10},
      {org: listaN(org,0), proj: listaN(proj,1), lang: listaN(lang,1), star: listaN(star,1), age: listaN(age,1), mant: 150, tf: 2},
      {org: listaN(org,0), proj: listaN(proj,2), lang: listaN(lang,2), star: listaN(star,2), age: listaN(age,2), mant: 93, tf: 1},
      {org: listaN(org,0), proj: listaN(proj,3), lang: listaN(lang,3), star: listaN(star,3), age: listaN(age,3), mant: 361, tf: 2},
      {org: listaN(org,0), proj: listaN(proj,4), lang: listaN(lang,4), star: listaN(star,4), age: listaN(age,4), mant: 57, tf: 3},
      {org: listaN(org,0), proj: listaN(proj,5), lang: listaN(lang,5), star: listaN(star,5), age: listaN(age,5), mant: 5, tf: 1},
      {org: listaN(org,0), proj: listaN(proj,6), lang: listaN(lang,6), star: listaN(star,6), age: listaN(age,6), mant: 12, tf: 1},
      {org: listaN(org,0), proj: listaN(proj,7), lang: listaN(lang,7), star: listaN(star,7), age: listaN(age,7), mant: 9, tf: 1},
      {org: listaN(org,0), proj: listaN(proj,8), lang: listaN(lang,8), star: listaN(star,8), age: listaN(age,8), mant: 390, tf: 10},
      {org: listaN(org,0), proj: listaN(proj,9), lang: listaN(lang,9), star: listaN(star,9), age: listaN(age,9), mant: 15, tf: 1},
      {org: listaN(org,0), proj: listaN(proj,10), lang: listaN(lang,10), star: listaN(star,10), age: listaN(age,10), mant: 7, tf: 1},
      {org: listaN(org,0), proj: listaN(proj,11), lang: listaN(lang,11), star: listaN(star,11), age: listaN(age,11), mant: 18, tf: 1},
      {org: listaN(org,0), proj: listaN(proj,12), lang: listaN(lang,12), star: listaN(star,12), age: listaN(age,12), mant: 24, tf: 2},
      {org: listaN(org,0), proj: listaN(proj,13), lang: listaN(lang,13), star: listaN(star,13), age: listaN(age,13), mant: 39, tf: 1},
      {org: listaN(org,0), proj: listaN(proj,14), lang: listaN(lang,14), star: listaN(star,14), age: listaN(age,14), mant: 3, tf: 1},
      {org: listaN(org,0), proj: listaN(proj,15), lang: listaN(lang,15), star: listaN(star,15), age: listaN(age,15), mant: 12, tf: 1},
      {org: listaN(org,0), proj: listaN(proj,16), lang: listaN(lang,16), star: listaN(star,16), age: listaN(age,16), mant: 14, tf: 2},
      {org: listaN(org,0), proj: listaN(proj,17), lang: listaN(lang,17), star: listaN(star,17), age: listaN(age,17), mant: 6, tf: 1},
      {org: listaN(org,0), proj: listaN(proj,18), lang: listaN(lang,18), star: listaN(star,18), age: listaN(age,18), mant: 233, tf: 12},
      {org: listaN(org,0), proj: listaN(proj,19), lang: listaN(lang,19), star: listaN(star,19), age: listaN(age,19), mant: 41, tf: 1},
      {org: listaN(org,0), proj: listaN(proj,20), lang: "JavaScript", star: listaN(star,20), age: listaN(age,20), mant: 1, tf: 1},
      {org: listaN(org,0), proj: listaN(proj,21), lang: listaN(lang,21), star: listaN(star,21), age: listaN(age,21), mant: 7, tf: 1},
      {org: listaN(org,0), proj: listaN(proj,22), lang: listaN(lang,22), star: listaN(star,22), age: listaN(age,22), mant: 13, tf: 3},
      {org: listaN(org,0), proj: listaN(proj,23), lang: listaN(lang,23), star: listaN(star,23), age: listaN(age,23), mant: 4, tf: 1},
      {org: listaN(org,0), proj: listaN(proj,24), lang: listaN(lang,24), star: listaN(star,24), age: listaN(age,24), mant: 3, tf: 1},
      {org: listaN(org,0), proj: listaN(proj,25), lang: listaN(lang,25), star: listaN(star,25), age: listaN(age,25), mant: 19, tf: 1},
      {org: listaN(org,0), proj: listaN(proj,26), lang: listaN(lang,26), star: listaN(star,26), age: listaN(age,26), mant: 23, tf: 1},
      {org: listaN(org,0), proj: listaN(proj,27), lang: listaN(lang,27), star: listaN(star,27), age: listaN(age,27), mant: 6, tf: 1},
      {org: listaN(org,0), proj: listaN(proj,28), lang: listaN(lang,28), star: listaN(star,28), age: listaN(age,28), mant: 10, tf: 1},
      {org: listaN(org,0), proj: listaN(proj,29), lang: "Shell", star: listaN(star,29), age: listaN(age,29), mant: 3, tf: 1},
      {org: listaN(org,0), proj: listaN(proj,30), lang: listaN(lang,30), star: listaN(star,30), age: listaN(age,30), mant: 46, tf: 3},
      {org: listaN(org,0), proj: listaN(proj,31), lang: listaN(lang,31), star: listaN(star,31), age: listaN(age,31), mant: 1, tf: 1},
      {org: listaN(org,0), proj: listaN(proj,32), lang: listaN(lang,32), star: listaN(star,32), age: listaN(age,32), mant: 20, tf: 1},
      {org: listaN(org,0), proj: listaN(proj,33), lang: listaN(lang,33), star: listaN(star,33), age: listaN(age,33), mant: 7, tf: 1},
      {org: listaN(org,0), proj: listaN(proj,34), lang: listaN(lang,34), star: listaN(star,34), age: listaN(age,34), mant: 14, tf: 1},
    ];

    var headersOrg = [];
    var dataOrg = [];
    var empresa = listaN(org,0);

    if (empresa === 'facebook' || empresa === 'FACEBOOK'){
      headersOrg = headers;
      dataOrg = dataFacebook;
      console.log('Success! Org: ' + empresa);
    }
    else if (empresa === 'google' || empresa === 'GOOGLE'){
      headersOrg = headers;
      dataOrg = dataGoogle;
      console.log('Success! Org: ' + empresa);
    }
    else if (empresa === 'ibm' || empresa === 'IBM'){
      headersOrg = headers;
      dataOrg = dataIbm;
      console.log('Success! Org: ' + empresa);
    }
    else if (empresa === 'microsoft' || empresa === 'MICROSOFT'){
      headersOrg = headers;
      dataOrg = dataMicrosoft;
      console.log('Success! Org: ' + empresa);
    }
    else if (empresa === 'oracle' || empresa === 'ORACLE'){
      headersOrg = headers;
      dataOrg = dataOracle;
      console.log('Success! Org: ' + empresa);
    }
    else{
      headersOrg = headersSemTf;
      dataOrg = data;
      console.log('Error! Org: ' + empresa);
    }

    return (
      <div className="container AppEn">
        
        {/*Cabeçalho do githubData em EN*/}
        <Navbar  
          classeNameDiv="card card-body mt-3 mb-3 text-center en"
          itemH1="Github API"
          itemStrong1="The most popular Github projects!" 
          itemStrong2="Sorted by number of stars."
          itemStrong3="Choose the organization: "
          idSelect="org"
          classeNameSelect="org"
          funSelect={mudaUrl}  
          op0={<ApiOption item={"---"} itemName={"---"}/>}
          op1={<ApiOption item={"facebook"} itemName={"facebook"}/>}
          op2={<ApiOption item={"google"} itemName={"google"}/>} 
          op3={<ApiOption item={"ibm"} itemName={"ibm"}/>}
          op4={<ApiOption item={"microsoft"} itemName={"microsoft"}/>}
          op5={<ApiOption item={"oracle"} itemName={"oracle"}/>}
        /> 

        {/*Janela que contém o githubData*/}
        <InfiniteScroll
          pageStart={1}
          mudaOrg={this.mudaOrg.bind(this)}
          hasMore={this.state.hasMoreItems}
          loader={loader}
        >
          <div className="card card-body mt-3 mb-3 text-center">
            <div className="row bg-row">
              <CSVLink 
                data={dataOrg} 
                headers={headersOrg}
                filename={"truck_factor_report.csv"} 
                enclosingCharacter={`'`} 
                separator={";"}
              >
                Truck Factor Report
              </CSVLink>
            </div>             
          </div>
          
          <div className="row bg-row">

            {/*Informações das organizações (githubData)*/}
            {githubData.map((name, index) => (
              <div className="col-sm-6 col-md-4 col-lg-3 repositorios" key={name.id}>
                {/*Capa do repositório*/}
                <img
                  src={name.owner.avatar_url}
                  className="repo-image"
                  alt="Project image"
                />
                {/*Informações básicas do repositório*/}
                <div className="repo-content">
                  <ApiItem itemName="Project: " item={name.name} classe="read-more" />
                  <ApiItem itemName="Language: " item={name.language} />
                  <ApiItem itemName="Age (Years): " item={idadeRepo(name.created_at)} />
                  <ApiItem itemName="Organization: " item={name.owner.login} />
                  <ApiItem itemName="Description: " item={name.description} classe="read-more" />
                  <ApiItem itemName="Stars: " item={name.stargazers_count} />
                  <ApiItem itemName="Forks: " item={name.forks_count} />

                  {/*Botão que leva ao modal que contém o githubRepo*/}
                  <div className="btn-container">
                    
                    <button className="myButton" 
                      onClick={
                        this.getModal.bind(
                          this, 
                          name.owner.login, 
                          name.name 
                          //,ultimaPagina(githubHeader)
                        )
                      }                      
                    >
                      Truck Factor
                    </button>

                  </div>

                </div>
                
                {/*Modal que contém o githubRepo - Projeto*/}
                <Modal 
                  isOpen={this.state.isActive} 
                  onRequestClose={voltaPagina}>                 
  
                  {/*Cabeçalho do githubRepo - Projeto*/}
                  <ApiInfor                    
                    classeNameDiv="card card-body mt-3 mb-3 text-center"  
                    item1={
                      <ApiItem 
                        itemName="Total Project Commits: " 
                        item={ commitsPag1 + commitsPag2 + commitsPag3 + commitsPag4 + commitsPag5 }
                      /> 
                    }
                    item2={
                      <ApiItem 
                        itemName="Project CCT: " 
                        item={ cct( commitsPag1 + commitsPag2 + commitsPag3 + commitsPag4 + commitsPag5 ) }
                      /> 
                    }
                    item3={
                      <ApiItem 
                        itemName="Number of contributors: " 
                        item={ mantPag1 + mantPag2 + mantPag3 + mantPag4 + mantPag5 }
                      /> 
                    }
                    item4={
                      <ApiItem 
                        itemName="Maintainers: " 
                        item={
                          mantenedor(
                              listaMantPag1,
                              truckFactor(
                                  listaCommitsPag1,
                                  cct( commitsPag1 + commitsPag2 + commitsPag3 + commitsPag4 + commitsPag5 )
                              )                       
                          )
                        }
                      /> 
                    }  
                    item5={
                      <ApiItem 
                        itemName="Project Truck Factor: " 
                        item={ 
                          truckFactor(
                            listaCommitsPag1, 
                            cct(commitsPag1 + commitsPag2 + commitsPag3 + commitsPag4 + commitsPag5)
                          ) 
                        }
                      /> 
                    }                                   
                  />

                  {/*Botão para fechar o modal e voltar para a página inicial*/}
                  <div className="close" onClick={voltaPagina}/>            
                  
                  {/*Informações dos desenvolvedores (githubRepo)*/}
                  {githubRepo.map((name, index) => (
                    <div key={name.id} className="col-md-12 pull-request">                          
                      
                      {/*Informações de cada desenvolvedor*/}
                      <ApiInfor 
                        classeNameDiv="card card-body mt-3 mb-3 text-center"                                            
                        item1={ <ApiItem classe="pull-body" itemName="Developer: " item={name.login}/> }
                        item2={ <ApiItem classe="pull-body" itemName="Commits: " item={name.contributions}/> }
                      />

                      <hr />
                      
                    </div>
                  ))}
                  {/*Fim do githubRepo*/}

                </Modal>
                {/*Fim do Modal que contém o githubRepo*/}

              </div>
            ))}
            {/*Fim do githubData*/}

          </div>
        </InfiniteScroll>
        {/*Janela que contém o githubData*/}

      </div>
      //Fim do projeto
    );
  }
}

export default AppEn;
