import React from 'react'

import { Calendar } from './InputElements/Calendar'
// import { Checkbox } from './InputElements/Checkbox'
import { TextField } from './InputElements/TextField'
import { DropDown } from './InputElements/Dropdown';
import { VscLoading } from 'react-icons/vsc';
import { protected_api_call, patient_form_url } from '../api/api';



class Form extends React.Component {

    constructor(props){
        super(props);
        this.state = {
            first_name: "", last_name: "", phone: "", email: "", dob: new Date(),
            first_name_e: "", last_name_e: "", phone_e: "", email_e: "", dob_e: "",
            
            address: "",city: "", state: "", pincode: "",
            address_e: "",city_e: "", state_e: "", pincode_e: "",
            
            hospital: "None", diagonosis: "None", criticalitiy: "None", insurance: "None",
            esrd: "None", references: "None", policy_num: "", group_num: "",
            hospital_e: "", diagonosis_e: "", criticalitiy_e: "", insurance_e: "",
            esrd_e: "", references_e: "", policynum_e: "", groupnum_e: "",
            
            sfreq: "None", sdate: new Date(),
            sfreq_e: "", sdate_e: "", sched_state:"None", sched_state_e:"",
            
            comments: "",
            
            loading: false
        }
    }


    submit = async () => {
        let a = {}
        let err = false

        if(this.state.first_name == "" || this.state.first_name_e != ""){
            if(this.state.first_name == "") a.first_name_e = "This field is required"
            err = true
        }

        if(this.state.last_name == "" || this.state.last_name_e != ""){
            if(this.state.last_name == "") a.last_name_e = "This field is required"
            err = true
        }

        if(this.state.phone == "" || this.state.phone_e != ""){
            if(this.state.phone == "") a.phone_e = "This field is required"
            err = true
        }

        if(this.state.email_e != ""){
            if(this.state.email == "") a.email_e = "This field is required"
            err = true
        }

        if(this.state.address == "" || this.state.address_e != ""){
            if(this.state.address == "") a.address_e = "This field is required"
            err = true
        }

        if(this.state.city == "" || this.state.city_e != ""){
            if(this.state.city == "") a.city_e = "This field is required"
            err = true
        }

        if(this.state.state == "" || this.state.state_e != ""){
            if(this.state.state == "") a.state_e = "This field is required"
            err = true
        }

        if(this.state.pincode == "" || this.state.pincode_e != ""){
            if(this.state.pincode == "") a.pincode_e = "This field is required"
            err = true
        }

        if(this.state.hospital == "None" || this.state.hospital_e != ""){
            if(this.state.hospital == "None") a.hospital_e = "This field is required"
            err = true
        }

        if(this.state.diagonosis == "None" || this.state.diagonosis_e != ""){
            if(this.state.diagonosis == "None") a.diagonosis_e = "This field is required"
            err = true
        }

        if(this.state.criticalitiy == "None" || this.state.criticalitiy_e != ""){
            if(this.state.criticalitiy == "None") a.criticalitiy_e = "This field is required"
            err = true
        }

        if(this.state.insurance == "None" || this.state.insurance_e != ""){
            if(this.state.insurance == "None") a.insurance_e = "This field is required"
            err = true
        }

        if(this.state.esrd == "None" || this.state.esrd_e != ""){
            if(this.state.esrd == "None") a.esrd_e = "This field is required"
            err = true
        }

        if(this.state.references == "None" || this.state.references_e != ""){
            if(this.state.references == "None") a.references_e = "This field is required"
            err = true
        }

        if(this.state.sfreq == "None" || this.state.sfreq_e != ""){
            if(this.state.sfreq == "None") a.sfreq_e = "This field is required"
            err = true
        }

        if(this.state.sched_state == "None" || this.state.sched_state_e != ""){
            if(this.state.sched_state == "None") a.sched_state_e = "This field is required"
            err = true
        }
        

        if(!err){
            this.setState({loading: true})
            let dob = this.state.dob
            dob = dob.getDate() + "/"+ parseInt(dob.getMonth()+1) +"/"+ dob.getFullYear();
            let data = {
                FirstName: this.state.first_name, LastName: this.state.last_name, Phone: this.state.phone,
                Email: this.state.email, 
                DateOfBirth: this.state.dob.toISOString().substr(0, 10),
                Address: this.state.address, City: this.state.city, State: this.state.state,
                Pincode: this.state.pincode,
                Hospital: this.state.hospital, Diagonosis: this.state.diagonosis,
                Criticalitiy: this.state.criticalitiy, Insurance: this.state.insurance,
                ESRD: this.state.esrd, Referral: this.state.references,
                SchedulingFrequency: this.state.sfreq, 
                Comments: this.state.comments, ScheduledBoolean: this.state.sched_state,
                PolicyNumber: this.state.policy_num, GroupNumber: this.state.group_num
            }

            if(this.state.sdate === "") data.scheduled_date = ""
            else data.scheduled_date = this.state.sdate.toISOString().substr(0, 10)

            let response = await protected_api_call(patient_form_url, data)
            if(response.status === 200 || response.status === 201){
                this.setState({loading: false})
                alert("Form Submitted Successfully")
            }else if(response.status === 401){
                this.setState({loading: false})
                alert("Not authenticated for this operation")
            }else if(response.status === 400){
                let resp = JSON.parse(await response.text());
                this.setState({loading: false})
                console.log(resp["data"])
                alert(resp["data"])
            }
        }else{
            this.setState(a)
        }
    }

    render() {
        return (
            <>
            <div className=' w-full flex justify-between'>
                <h1 className='font-semibold text-lg sm:text-xl py-2 text-center md:text-4xl heading text-purple-600 mb-2'>
                    Personal Details
                </h1>
            </div>
            
            <TextField errorMsg={this.state.first_name_e} required={true} regex={/^([A-Za-z])+$/} question="First Name" name="Name" type='text' error={true} value={this.state.first_name} onChange={(e)=>{this.setState({first_name: e.target.value})}} onErrorChange={(err)=>{this.setState({first_name_e: err})}}/>

            <TextField errorMsg={this.state.last_name_e} required={true} regex={/^([A-Za-z])+$/} question="Last Name" name="Name" type='text' error={true} value={this.state.last_name} onChange={(e)=>{this.setState({last_name: e.target.value})}} onErrorChange={(err)=>{this.setState({last_name_e: err})}}/>
            
            <TextField errorMsg={this.state.phone_e} required={true} regex={/^(\+\d{1,2}\s)?\(?\d{3}\)?[\s.-]?\d{3}[\s.-]?\d{4}$/} question="Phone" name="Name" type='text' error={true} value={this.state.phone} onChange={(e)=>{this.setState({phone: e.target.value})}} onErrorChange={(err)=>{this.setState({phone_e: err})}}/>

            <TextField errorMsg={this.state.email_e} required={false} regex={/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/} question="Email" name="Name" type='text' error={true} value={this.state.email} onChange={(e)=>{this.setState({email: e.target.value})}} onErrorChange={(err)=>{this.setState({email_e: err})}}/>

            {/* <TextField errorMsg="" required={true} regex="" question="DOB (CHANGE)" name="Name" type='text' error={true} value={this.state.dob} onChange={(e)=>{this.setState({dob: e.target.value})}}/> */}
            <Calendar question="Date Of Birth (mm/dd/yyyy)" required={true} errorMsg="Invalid Input" value={this.state.dob} onChange={(e) => {this.setState({dob: e})}}/>

            <div className=' w-full flex justify-between mt-2'>
                <h1 className='font-semibold text-lg sm:text-xl py-2 text-center md:text-4xl heading text-purple-600 mb-2'>
                    Address Details
                </h1>
            </div>

            <TextField errorMsg={this.state.address_e} required={true} regex="" question="Address" name="Name" type='text' error={true} value={this.state.address} onChange={(e)=>{this.setState({address: e.target.value})}} onErrorChange={(err)=>{this.setState({address_e: err})}}/>

            <TextField errorMsg={this.state.city_e} required={true} regex={/^([A-Za-z])+$/} question="City" name="Name" type='text' error={true} value={this.state.city} onChange={(e)=>{this.setState({city: e.target.value})}} onErrorChange={(err)=>{this.setState({city_e: err})}}/>

            <TextField errorMsg={this.state.state_e} required={true} regex={/^([A-Za-z])+$/} question="State" name="Name" type='text' error={true} value={this.state.state} onChange={(e)=>{this.setState({state: e.target.value})}} onErrorChange={(err)=>{this.setState({state_e: err})}}/>

            <TextField errorMsg={this.state.pincode_e} required={true} regex={/^[0-9]{5}(?:-[0-9]{4})?$/} question="Pincode" name="Name" type='text' error={true} value={this.state.pincode} onChange={(e)=>{this.setState({pincode: e.target.value})}} onErrorChange={(err)=>{this.setState({pincode_e: err})}}/>

            <div className=' w-full flex justify-between mt-2'>
                <h1 className='font-semibold text-lg sm:text-xl py-2 text-center md:text-4xl heading text-purple-600 mb-2'>
                    Patient Details
                </h1>
            </div>

            <DropDown errorMsg={this.state.hospital_e} required={true} question="Hospital" row={true} 
                    options={["None", "Methodist-TW", "Hermann", "Lukes", "NorthWest", "Conroe", "Other-NP", "Other-External"]} 
                    error={true} value={this.state.hospital} onChange={(e) => {
                        if(e.target.value==="None") this.setState({hospital: e.target.value, hospital_e: "This is a required field"})
                        else this.setState({hospital: e.target.value, hospital_e: ""})
                    }}
                    />
            
            <DropDown errorMsg={this.state.diagonosis_e} required={true} question="Diagonosis" row={true} 
                    options={["None", "AKI", "CKD 2", "CKD 3", "CKD 4", "CKD 5", "ESRD", "Transplant", "Hyponatremia", "Hypercalcemia", "Hyper phosphate", "Kidney Stones", "Anemia", "Other"]} 
                    error={true} value={this.state.diagonosis} onChange={(e) => {
                        if(e.target.value==="None") this.setState({diagonosis: e.target.value, diagonosis_e: "This is a required field"})
                        else this.setState({diagonosis: e.target.value, diagonosis_e: ""})
                    }}/>

            <DropDown errorMsg={this.state.criticalitiy_e} required={true} question="Criticality" row={true} 
                    options={["None", "Critical", "Not Critical"]} 
                    error={true} value={this.state.criticalitiy} onChange={(e) => {
                        if(e.target.value==="None") this.setState({criticalitiy: e.target.value, criticalitiy_e: "This is a required field"})
                        else this.setState({criticalitiy: e.target.value, criticalitiy_e: ""})
                    }}/>
            
            <DropDown errorMsg={this.state.insurance_e} required={true} question="Insurance" row={true} 
                    options={["None", "Aetna", "Aetna MA", "Medicare", "UHC", "UHC MA", "BCBS", "BCBS MA", "Devoted", "Humana", "Humana MA", "Cigna", "Cigna MA", "Cigna Allegiance", "Tricare", "Veterans Adminstration", "Superior/Ambetter", "Market place plan", "Other"]} 
                    error={true} value={this.state.insurance} onChange={(e) => {
                        if(e.target.value==="None") this.setState({insurance: e.target.value, insurance_e: "This is a required field"})
                        else this.setState({insurance: e.target.value, insurance_e: ""})
                    }}/>
            
            <TextField errorMsg={this.state.policynum_e} required={false} regex="" question="Policy Number" name="Policy Number" error={true} type='text' value={this.state.policy_num} onChange={(e)=>{this.setState({policy_num: e.target.value})}} onErrorChange={(err)=>{this.setState({policynum_e: err})}}/>

            <TextField errorMsg={this.state.groupnum_e} required={false} regex="" question="Group Number" name="Group Number" error={true} type='text' value={this.state.group_num} onChange={(e)=>{this.setState({group_num: e.target.value})}} onErrorChange={(err)=>{this.setState({groupnum_e: err})}}/>

            <DropDown errorMsg={this.state.esrd_e} required={true} question="ESRD/CKD" row={true} 
                    options={["None", "ESRD", "CKD"]} 
                    error={true} value={this.state.esrd} onChange={(e) => {
                        if(e.target.value==="None") this.setState({esrd: e.target.value, esrd_e: "This is a required field"})
                        else this.setState({esrd: e.target.value, esrd_e: ""})
                    }}/>

            <DropDown errorMsg={this.state.references_e} required={true} question="Referral" row={true}
                    options={["None", "PCP", "Specialist", "Family", "NP-LTAC", "Other"]}
                    error={true} value={this.state.references} onChange={(e) => {
                        if(e.target.value==="None") this.setState({references: e.target.value, references_e: "This is a required field"})
                        else this.setState({references: e.target.value, references_e: ""})
                    }}/>

            <div className=' w-full flex justify-between mt-2'>
                <h1 className='font-semibold text-lg sm:text-xl py-2 text-center md:text-4xl heading text-purple-600 mb-2'>
                    Scheduling Details
                </h1>
            </div>

            <DropDown errorMsg={this.state.sfreq_e} required={true} question="Doctor" row={true} 
                    options={["None", "Dr Gandra", "Dr Vuppali", "Dr Patel", "Dr Khaja"]} 
                    error={true} value={this.state.sfreq} onChange={(e) => {
                        if(e.target.value==="None") this.setState({sfreq: e.target.value, sfreq_e: "This is a required field"})
                        else this.setState({sfreq: e.target.value, sfreq_e: ""})
                    }}/>

            <DropDown errorMsg={this.state.sched_state_e} required={true} question="Scheduling Status" row={true}
                    options={["None", "Not Scheduled", "Scheduled", "Left Voicemail"]}
                    error={true} value={this.state.sched_state} onChange={(e) => {
                        if(e.target.value==="None") this.setState({sched_state: e.target.value, sched_state_e: "This is a required field"})
                        else this.setState({sched_state: e.target.value, sched_state_e: ""})
                    }}/>
            
            <Calendar question="Scheduled Date (mm/dd/yyyy)" required={false} value={this.state.sdate} onChange={(e) => {this.setState({sdate: e})}}/>


            <div className=' w-full flex justify-between mt-2'>
                <h1 className='font-semibold text-lg sm:text-xl py-2 text-center md:text-4xl heading text-purple-600 mb-2'>
                    Comments
                </h1>
            </div>

            <TextField errorMsg="Invalid Input" required={false} regex="" question="Comments" name="Name" type='text' error={false} value={this.state.comments} onChange={(e)=>{this.setState({comments: e.target.value})}} onErrorChange={(e)=>{}}/>
            
            <div className="flex w-full justify-center mb-2">
                <button
                    type="button"
                    className="h-12 my-2 rounded bg-purplegray-900 uppercase font-semibold text-purplegray-100 text-lg hover:shadow-purplegray-600/1.7 hover:shadow-xl px-5 mr-20"
                    onClick={this.submit}>
                    {
                        (this.state.loading) ? <VscLoading className='w-6 h-6 animate-spin mx-auto'/> : <h1>Submit Form</h1>
                    }
                </button>
            </div>
            
            </>
        )
    }
}

export default Form