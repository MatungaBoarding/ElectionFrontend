let base_url = "https://matungaboarding.pythonanywhere.com";
// let base_url = "https://3c91-2603-6081-2400-17f4-2dff-eb2d-2978-6a55.ngrok-free.app"

export let login_url = base_url + "/election/election_auth/";
export let global_search_url = base_url + "/election/global_search/"
export let member_election_filter_url = base_url + "/election/election_filter/"
export let member_by_id_url = base_url + "/election/member_by_id/"
export let create_slip_url = base_url + "/election/create_slip/"
export let ballot_info_url = base_url + "/election/ballot_id_info/"
export let confirm_presence_url = base_url + "/election/confirm_presence/"

export let register_url = base_url + "/auth/register/";
export let patient_form_url = base_url + "/service/patient_form/";
export let patient_filter_url = base_url + "/service/filter/";
export let filter_excel_url = base_url + "/service/excel/";
export let productivity_url = base_url + "/service/productivity/";
export let patient_update_url = base_url + "/service/patient_update/";
export let tab_filter_url = base_url + "/service/tab_filter/";
export let email_url = base_url + "/service/email/";
export let dashboard_url = base_url + "/service/dashboard/";
export let delete_user_url = base_url + "/service/accounts/";
export let calendar_url = base_url + "/service/calendar/";


export let unprotected_api_call = async (url, data, type="POST") => {
    try{
        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");
        var raw = JSON.stringify(data);
        var requestOptions = {
            method: type,
            headers: myHeaders,
            body: raw,
            redirect: "follow"
        };
        let response = await fetch(url, requestOptions);
        return response;
    } catch(e){
        console.log(e);
        alert("Server Error")
    }
}

export let protected_api_call = async (url, data={}, type="POST") => {
    try{
        let token = localStorage.getItem("user_data");
        token = JSON.parse(token)["tokens"]["access"];
        var myHeaders = new Headers();
        myHeaders.append("Authorization", "Bearer " + token);
        myHeaders.append("Content-Type", "application/json");

        let raw
        let requestOptions


        if(type === "GET"){
            requestOptions = {
                method: 'GET',
                redirect: 'follow',
                headers: myHeaders
            };
        }else{
            raw = JSON.stringify(data);
            requestOptions = {
                method: type,
                headers: myHeaders,
                body: raw,
                redirect: "follow"
            };    
        }
        
        let response = await fetch(url, requestOptions);
        return response;
    }catch(e){
        console.log(e);
        alert("Server Error")
    }
}