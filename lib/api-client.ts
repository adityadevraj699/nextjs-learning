import { IVideo } from "@/models/Video";

export type VideoFormData = Omit<IVideo, "_id">;

type FetchOptions = {
    method?: 'GET' | 'POST' | 'PUT' | 'DELETE';
    body?:any;
    headers?: Record<string, string>;

}
class ApiClient {
    private async fetch<T>(
        endpoint: string,
        options :  FetchOptions = {}
    ): Promise<T> {
        const {method = "GET", body, headers = {}} = options;
        const defaultHeaders = {
            "Content-Type" : "application/json",
            ...headers
        }

       const response =  await fetch(`/api${endpoint}`,{
            method,
            headers: defaultHeaders,
            body: body ? JSON.stringify(body) : undefined
        })

        if(!response.ok){
            throw new Error(await response.text());
        }
    }


    async getVideos(){
        return this.fetch<IVideo[]>("/videos");
    }

    async getAVideos(id: string){
        return this.fetch<IVideo>(`/videos/${id}`);
    }

    async createVideo(video : VideoFormData){
        return this.fetch<IVideo>("/videos", {
            method: "POST",
            body: video
        });
    }
}


export const apiClient = new ApiClient();
