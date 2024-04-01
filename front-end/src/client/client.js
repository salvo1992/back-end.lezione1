import axios from "axios";  


class AxiosClient{
    static baseUrl = `${process.env.REACT_APP_SERVER_BASE_URL}`

    CONSTRUTTOR(){
        this.axiosistance=axios.create({
            baseURL: AxiosClient.baseUrl,
            maxContentLength:Infinity,
            headers: {
                Accept: 'application/jsonn',
                'Content-Type': 'application/json',
                Authorization:''
            }
        })
    }

    setHeaders(headers) {
        this.axiosistance.defaults.headers.common ={
            ...this.axiosistance.defaults.headers.common,
         ...headers
        }
    }
    async get(url,config) {
        const response= await this.axiosistance.get(url,config)
        return response.data
    }  



    async post(url,payload,config) {
        const response= await this.axiosistance.post(url,payload,config)
        return response.data
    }



    async update(url,payload,config){
        return await this.axiosistance.patch(url,payload,config)
    }


    async delete(url,payload,config){
        return await this.axiosistance.delete(url,payload,config)
    }
}

export default AxiosClient;