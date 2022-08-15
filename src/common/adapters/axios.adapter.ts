import { BadRequestException, Injectable } from "@nestjs/common";
import axios, { AxiosInstance } from "axios";
import { HttpAdapter } from "../interfaces";

@Injectable()
export class AxiosAdapter implements HttpAdapter {

    private axios : AxiosInstance = axios;

    async get<T>(url: string): Promise<T> {
        try {
            const { data } = await this.axios.get( url );
            return data;
        } catch (error) {
            console.log(error)
            throw new BadRequestException("Axios filed");
        }
    }

 }