import React from 'react'
import { VscLoading } from "react-icons/vsc";
import { protected_api_call, productivity_url } from '../api/api'


class Productivity extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      daily_report_date: "",
      loading: false,
    }
  }

  dailyRecord = []
  cumRecord = []

  componentDidMount = () => {
    this.dailyRecord = [
      {
        "name": "Date",
        "id_name": "daily_report_date",
        "type": "date"
      }]
    
    this.setState({})
 
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

  submit = async () => {
    let data = {
      "created_at": this.state.daily_report_date,
    }

    if(this.state.daily_report_date === ""){
      alert("Enter Date")
      return
    }
    
    this.setState({loading: true})

    let response = await protected_api_call(productivity_url, data, "POST")
    if(response.status === 200 || response.status === 201) {
        let filename = "daily_report.xlsx";
        response.blob().then(blob => this.download(blob, filename));
        this.setState({loading: false})
    } else {
        this.setState({loading: false})
        alert("Server Error")
    }
  }
  

  render() {
    return (
      <>
        <div className=' w-full flex justify-between'>
            <h1 className='font-semibold text-lg sm:text-xl py-2 text-center md:text-4xl heading text-purple-600 mb-2'>
                Productivity Report
            </h1>
        </div>

        <div className='flex flex-wrap justify-center '>
              {this.dailyRecord.map((data, key) => (
                data.type === "dropdown" ? (
                  <>
                    <div className='flex flex-col p-2 border border-gray-600 rounded  m-2 w-1/3 '>
                        <h1 className='text-purplegray-900 mb-2'>{data.name}</h1>
                        <select
                            className='bg-purple-200 text-gray-700 appearance-none py-2 px-3 border rounded focus:bg-purple-50 focus:border-gray-400 focus:shadow-outline focus:outline-none'
                            value={this.state[data.id_name]}
                            onChange = {e => this.setState({[data.id_name]: e.target.value})}>
                            <option value="None">None</option>
                            {data.options.map((option, key) => (
                                <option key={key} value={option}>{option}</option>
                            ))}
                        </select>
                    </div>
                  </>
                ) : (
                  <div className='flex flex-col p-2 border border-gray-600 rounded  m-2 w-1/3 '>
                      <h1 className='text-purplegray-900 mb-2'>{data.name}</h1>
                      <input
                          className='bg-purple-200 text-gray-700 appearance-none py-2 px-3 border rounded focus:bg-purple-50 focus:border-gray-400 focus:shadow-outline focus:outline-none'
                          type={data.type}
                          value={this.state[data.id_name]}
                          onChange = {e => this.setState({[data.id_name]: e.target.value})}
                      />
                  </div>
                )
              ))}

          <div className="w-full flex flex-col items-center mt-5">
                <button
                    type="submit"
                    className="w-1/3 h-12 flex justify-center items-center rounded-lg bg-purple-600 text-purplegray-100 text-lg hover:shadow-md"
                    onClick={this.submit}
                    >
                    {this.state.loading ? <VscLoading className='w-6 h-6 animate-spin' /> : <h1>Create Report</h1>}
                </button>
            </div>
          </div>
      </>
    )
  }

}

export default Productivity