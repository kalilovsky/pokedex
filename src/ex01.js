function Name(props) {
    return (<p>{props.value}</p>)
}


function Image(props) {
    return (<img src={props.url}></img>)
}

function Searchcard(props){
    let items = [];
    let searchValue = props.value;
    const getInputValue = (e)=>{
        searchValue = e.target.value;
        }
    items.push(<div className={props.className} ><input type="text" placeholder = "search"  onChange={getInputValue}/><button onClick={()=>props.onClick(searchValue)} >search</button></div>);
    return (items);
}




class Card extends React.Component {
    constructor(props) {
        super(props);
        this.state = { id: null, }
    }

    render() {
        return (
            <div>
                <Image url={this.props.url} />
                <Name value={this.props.value} />
            </div>
        )
    }
}


class Board extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            data: Array(151).fill(""),
        }
        
    }
    componentDidMount(){
        this.getData();
    }
    render() {
        return (
            this.showData()
        )
    }
    getData() {
        const URL = "https://pokeapi.co/api/v2/pokemon-form/";
        for (let i = 0; i < this.state.data.length; i++) {
            fetch(URL + (i + 1)).then(response => response.json()).then(data => {
                this.dataReady(i, data);
            })
        }
    }
    dataReady(i, data) {
        const test = this.state.data.slice();
        test[i] = data;
        this.setState({ data: test });
        
    }
    
    showData() {
        const items = [];
        items.push(<Searchcard key={3000} className="searchBar" value={""} onClick={(e)=>this.handleSearch(e)}/>)
       
        for (let i = 0; i < this.state.data.length; i++) {
            items.push(<Card key={i}
                url={typeof (this.state.data[i]) === "object" ? this.state.data[i].sprites.front_default : null}
                value={typeof (this.state.data[i]) === "object" ? this.state.data[i].pokemon.name : null}
            />)

        }
        
        

        return items;
    }
    handleSearch(e){
        const result =[];
        
        // result.forEach(([key,value])=>{
        //     if(value.pokemon.name != e){
        //         result.slice(key,1);
        //     }
        // })
        if (e ==""){
            this.getData();
        }else{

            for (var i = 0; i < this.state.data.length; i++) {
            if (this.state.data[i].pokemon.name == e) {
                result.push(this.state.data[i]);
            }
            //console.log(i);
        }
        //console.log(result.length)
        if (result.length==0){
            this.getDataFromSearch(e);
        }
        this.setState({data : result});}
    }
    getDataFromSearch(searchtext){
        const URL = "https://pokeapi.co/api/v2/pokemon-form/";
        
            fetch(URL + searchtext).then(response => response.json()).then(data => {
                console.log();
                let items = [];
                items.push(data);
                    this.setState({ data: items });
                })
        
    }
}

ReactDOM.render(
    <Board />,
    document.getElementById("root")
)