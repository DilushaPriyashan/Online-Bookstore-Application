import axios from "axios";

export const getCategories = async()=>{    // we used async to step by step ---> to stop everything load same ime
    try{                                // if it is real time whole run same time
        const response = await axios.get("http://localhost:9000/categories");  // getting uses from the backend, meka await karanwa response eka enakn
        return await response.data;    //if fetch used --->return as json file(or any other type) so we have to convert it to json file
    }catch(error){                         // but axios return json file
        return error;
    }
}

