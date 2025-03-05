import React from 'react'
import { count_report_url, unprotected_api_call } from '../api/api'

class CountReport extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
          results: {},
          loading: false,
          error_txt: "LOADING ...",
      }
    }

    componentDidMount = async () => {
        this.setState({loading: true})
        let response = await unprotected_api_call(count_report_url, {}, "GET")
        let data = await response.json()
        if(response["status"] === 200){
            this.setState({results: data["data"], loading: false})
            console.log(data)
            if(data["val"] === false) {
                this.setState({loading: false, error_txt: "NO RESULTS FOUND"})
            }
        }else{
            this.setState({loading: false})
        }
    }

    render(){
      return(
        <>
            <div className=' w-full flex justify-between'>
                <h1 className='font-semibold text-lg sm:text-xl py-2 text-center md:text-4xl heading text-purple-600 mb-2'>
                    Total Count Report
                </h1>
            </div>

            {Object.keys(this.state.results).length === 0 ? (
              <>
                <div className="flex flex-col">
                  <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
                    <div className="py-2 inline-block min-w-full sm:px-6 lg:px-8">
                      {this.state.error_txt}
                    </div>
                  </div>
               </div>
              </>
            ) : (
              <div className="flex flex-col">
              <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
                <div className="py-2 inline-block min-w-full sm:px-6 lg:px-8">
                  <div className="overflow-hidden">
                    {Object.keys(this.state.results).map((location, locationIndex) => {
                      if (location === "grandTotal") return null;
                      const { times, locationTotal } = this.state.results[location];

                      return (
                        <div key={locationIndex} className="mb-4">
                          {/* Table Header for each location */}
                          <table className="min-w-full border border-gray-300">
                            <thead className="border-b border-gray-400">
                              <tr className="bg-purple-800 uppercase">
                                <th rowSpan="2" className="text-md font-bold text-gray-100 px-6 py-4 text-center border-r border-gray-400">
                                  LOCATION
                                </th>
                                <th rowSpan="2" className="text-md font-bold text-gray-100 px-6 py-4 text-center border-r border-gray-400">
                                  TIME
                                </th>
                                <th colSpan="2" className="text-md font-bold text-gray-100 px-6 py-4 text-center border-r border-gray-400">
                                  KYC
                                </th>
                                <th colSpan="2" className="text-md font-bold text-gray-100 px-6 py-4 text-center border-r border-gray-400">
                                  NON KYC
                                </th>

                              </tr>
                              <tr className="bg-purple-700 uppercase">
                                <th className="text-md font-bold text-gray-100 px-6 py-3 text-center border-r border-gray-400">Slip Issued</th>
                                <th className="text-md font-bold text-gray-100 px-6 py-3 text-center border-r border-gray-400">Ballot Issued</th>
                                <th className="text-md font-bold text-gray-100 px-6 py-3 text-center border-r border-gray-400">Slip Issued</th>
                                <th className="text-md font-bold text-gray-100 px-6 py-3 text-center border-r border-gray-400">Ballot Issued</th>
                                <th className="text-md font-bold text-gray-100 px-6 py-3 text-center border-r border-gray-400">Slip Total</th>
                                <th className="text-md font-bold text-gray-100 px-6 py-3 text-center border-r border-gray-400">Ballot Total</th>
                              </tr>
                            </thead>

                            {/* Table Body */}
                            <tbody>
                              {times.map((slot, index) => (
                                <tr key={`${location}-${slot.time}`} className="border-b border-gray-300">
                                  {index === 0 && (
                                    <td rowSpan={times.length} className="px-6 py-4 text-center font-bold border-r border-gray-300 bg-gray-100">
                                      {location}
                                    </td>
                                  )}
                                  <td className="px-6 py-4 text-center border-r border-gray-300">{slot.time}</td>
                                  <td className="px-6 py-4 text-center border-r border-gray-300">{slot.kycSlip}</td>
                                  <td className="px-6 py-4 text-center border-r border-gray-300">{slot.kycBallot}</td>
                                  <td className="px-6 py-4 text-center border-r border-gray-300">{slot.nonKycSlip}</td>
                                  <td className="px-6 py-4 text-center border-r border-gray-300">{slot.nonKycBallot}</td>
                                  <td className="px-6 py-4 text-center border-r border-gray-300 font-bold">{slot.slipTotal}</td>
                                  <td className="px-6 py-4 text-center border-r border-gray-300 font-bold">{slot.ballotTotal}</td>
                                </tr>
                              ))}
                              <tr className="bg-gray-200 font-bold border-b border-gray-400">
                                <td colSpan="2" className="px-6 py-4 text-center border-r border-gray-400">Total</td>
                                {Object.values(locationTotal).map((value, i) => (
                                  <td key={i} className="px-6 py-4 text-center border-r border-gray-400">{value}</td>
                                ))}
                              </tr>
                            </tbody>
                          </table>
                        </div>
                      );
                    })}

                    {/* Grand Total Row */}
                    <table className="min-w-full border border-gray-300">
                      <thead className="border-b border-gray-500">
                        <tr className="bg-yellow-300 font-bold">
                          <td colSpan="2" className="px-6 py-4 text-center border-r border-gray-500">Grand Total</td>
                          {Object.values(this.state.results.grandTotal).map((value, i) => (
                            <td key={i} className="px-6 py-4 text-center border-r border-gray-500">{value}</td>
                          ))}
                        </tr>
                      </thead>
                    </table>
                  </div>
                </div>
              </div>
            </div>
            ) }

            
        </>
      )
    }



}


export default CountReport