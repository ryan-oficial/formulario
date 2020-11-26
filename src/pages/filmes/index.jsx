import React, { Component } from 'react';
import Menu from '../../components/menu';
import Jumbotron from '../../components/jumbotron';

class Filmes extends Component{

    constructor(){
        super();

        this.state = {
            url: 'https://5f7f4f9bd6aabe00166f0238.mockapi.io/api/filmes',
            id : '',
            titulo : '',
            categoria : '',
            ano : '',
            filmes : []
        }
    }


    componentDidMount(){
        this.listar();
    }

    listar(){
        fetch(this.state.url)
                .then(response => response.json())
                .then(dados => {
                    
                    this.setState({filmes : dados});

                    console.log(this.state.filmes);
                })
                .catch(err => console.error(err))
    }

    remover(event){
        event.preventDefault();
        
        console.log(event.target.value);

            fetch(this.state.url + '/' + event.target.value, {
                method : 'DELETE'
            })
                .then(response => response.json())
                .then(data => {
                    alert('Filme removido');
                    this.listar();
                });
        
    }

    editar(event){
        event.preventDefault();

        fetch(this.state.url + '/' + event.target.value, 
        {method : 'GET'})
                .then(response => response.json())
                .then(dado => {
                    console.log(dado);
                    this.setState({id : dado.id});
                    this.setState({nome : dado.nome});
                    this.setState({categoria : dado.categoria});
                    this.setState({anoLançamento : dado.anoLançamento});

                });
    }

     

    render() {
        return(
            <div>
                <menu />
                <Jumbotron titulo='Filmes' descricao='Gerencie os seus filmes' />
                <div className="container">
                    <div className="bd-example" >
                    <form id="formFilme">
                        <div className="form-group">
                        <label htmlFor="nome">Nome</label>
                        <input type="text" className="form-control" value={this.state.nome} id="nome" aria-describedby="nome" placeholder="Informe o Nome"/>
                        </div>
                        <div className="form-group">
                        <label htmlFor="categoria">Categoria</label>
                        <input type="text" className="form-control" value={this.state.categoria} id="categoria" placeholder="Informe a Categoria"/>
                        </div>
                        <div className="form-group">
                            <label htmlFor="ano">Ano de Lançamento</label>
                            <input type="text" className="form-control small" value={this.state.anoLançamento}id="anoLancamento" placeholder="Informe o Ano de Lançamento"/>
                        </div>
                        <button type="reset" className="btn btn-secondary">Cancelar</button>
                        <button type="button" onClick="cadastrar()" className="btn btn-success">Cadastrar</button>
                    </form>

        <table className="table" style={{margintop: '40px'}}>
            <thead>
              <tr>
                <th scope="col">#</th>
                <th scope="col">Nome</th>
                <th scope="col">Categoria</th>
                <th scope="col">Ano Lançamento</th>
                <th scope="col">Ações</th>
                <th scope="col"><button type="reset" className="btn btn-primary" onClick="novoFilme()">Novo Filme</button></th>
              </tr>
            </thead>
            <tbody id="tabela-lista-corpo">
                {
                    this.state.filmes.map((item, index) =>{
                        return (
                            <tr key={index}>
                                <td>{item.id}</td>
                                <td>{item.nome}</td>
                                <td>{item.categoria}</td>
                                <td>{item.anoLançamento}</td>
                                <td>
                                    <button type='button' onClick={this.remover.bind(this)} value={this.id} className='btn btn-danger'>Remover</button>
                                    <button type='button' onClick={this.editar.bind(this)} value={this.id} className='btn btn-danger'>Editar</button>
                                </td>
                            </tr>
                        )
                    })
                }
            </tbody>
        </table>
    </div>
    </div>
            </div>
        )
    }

}

export default Filmes;