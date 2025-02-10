import React from 'react'
import { dashboard_url, protected_api_call } from '../../api/api'
import { VscLoading } from "react-icons/vsc";
import { Link } from 'react-router-dom'



class Space extends React.Component {

    state = {
        list: []
    }

    componentDidMount = async () => {
        this.setState({
            "loading": true
        })
        let response = await protected_api_call(dashboard_url, {"type": this.props.type,"filter_data": this.props.filter_data}, "POST");
        let data = await response.json();
        data = data["data"]
        this.setState({
            "list": data,
            "loading": false,
            loadingxl: false,
            loadingexpand: false
        })
    }

    download = (blob, filename) => {
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.style.display = 'none';
        a.href = url;
        a.download = filename;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        window.URL.revokeObjectURL(url);
    }

    get_excel = async () => {
        this.setState({loadingxl: true})
        let response = await protected_api_call(dashboard_url, {"type": this.props.type, "filter_data": this.props.filter_data}, "PUT");
        if(response.status === 200 || response.status === 201) {
            let filename = this.props.title + ".xlsx";
            response.blob().then(blob => this.download(blob, filename));
            this.setState({loadingxl: false})
        } else {
            this.setState({loadingxl: false})
            alert("Server Error")
        }
    }

    componentDidUpdate = async (prevProps) => {
        if (JSON.stringify(this.props.filter_data) !== JSON.stringify(prevProps.filter_data)) {
            this.setState({
                "loading": true
            })
            let response = await protected_api_call(dashboard_url, {"type": this.props.type, "filter_data": this.props.filter_data}, "POST");
            let data = await response.json();
            data = data["data"]
            this.setState({
                "list": data,
                "loading": false,
                loadingxl: false,
                loadingexpand: false
            })
        }
      }

    render(){
        return (
            <>
                <div className='w-1/3 bg-gray-100 p-4 m-2 h-full'>
                    <div className='text-xl font-bold mb-2'>{this.props.title} ({this.state.list.length})</div>
                    
                    {this.state.loading ? (
                        <VscLoading className='w-6 h-6 animate-spin' />
                    ):(
                        this.state.list.length == 0 ? (
                            <div className='h-[48vh] overflow-y-scroll overflow-x-scroll'>
                                <>
                                    <div className='ml-4 mb-1 text-lg'>   - No Data</div>
                                    <hr className='my-1'></hr>
                                </>
                            </div>
                        ):(
                            <div className='h-[48vh] overflow-y-scroll overflow-x-scroll'>
                                {this.state.list.map((data, key) => (
                                    <>
                                        <div className='ml-4 mb-1 text-lg'>   - {data["FirstName"]} {data["LastName"]} ----  {data["Hospital"]} ---- {data["SchedulingFrequency"]}</div>
                                        <hr className='my-1'></hr>
                                    </>
                                ))}
                            </div>
                        )
                    )}

                    <div className='flex-grow flex flex-col mt-1'>
                        <div className='flex flex-grow justify-between w-[48vh] h-full'>
                        <button
                            type="submit"
                            className="mt-3 border-2 p-1 border-purple-200 text-purple-600 rounded-md ml-5 hover:bg-purple-200 hover:text-white"
                            onClick={this.get_excel}>
                            {this.state.loadingxl ? <VscLoading className='w-6 h-6 animate-spin' /> : <h1>GET EXCEL</h1>}
                        </button>
                        
                        <Link onClick={(event) => {}} target="_blank" rel="noopener noreferrer" to={`${this.props.url}`} state={{"list": this.state.list, "title": "Hello"}} className='mt-3 border-2 p-1 border-purple-200 text-purple-600 rounded-md ml-5 hover:bg-purple-200 hover:text-white'>
                            {this.state.loadingexpand ? <VscLoading className='w-6 h-6 animate-spin' /> : <h1>EXPAND LIST</h1>}
                        </Link>
                        </div>
                    </div>
                    
                    
                    
                </div>
                
            </>
        )
    }
}

export default Space