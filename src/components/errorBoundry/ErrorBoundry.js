import { Component } from "react";




class ErrorBoundry extends Component {
    constructor(props){
        super(props);
        this.state = {
            error:null,
            errorInfo:null
        };
    }

    componentDidCatch(error, errorInfo){
        this.setState({
            error:error,
            errorInfo:errorInfo
        })
    }
    render(){
        if(this.state.errorInfo){
        return (
            <div style={{display:"flex",flexDirection:"column",justifyContent:"center",alignItems:"center"}}>
                <h2>Something went wrong in {this.props.title}</h2>
                <div style={{fontSize:18,textDecoration:"underline",cursor:"pointer"}} onClick={()=>this.setState({error: null,errorInfo: null})}>retry</div>
            </div>
        )
        }
        return this.props.children;
    }
};


export default ErrorBoundry;