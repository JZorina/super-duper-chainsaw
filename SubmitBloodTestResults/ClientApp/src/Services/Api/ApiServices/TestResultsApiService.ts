import axios from "axios";
import Config from "../../../Configurations";
import { ApiResponse } from "../../../Models";
import { GetTestResultsRequest, GetTestResultsResponse } from "../../../Models/TestResults";
import { IHttpService } from "../IHttpService";
import { ApiServiceBase } from "./ApiServiceBase";

export default class TestResultsApiService extends ApiServiceBase {
   constructor(client: IHttpService) {
      super(client)
   }

   //async getTestResults(body: GetTestResultsRequest): Promise<ApiResponse<GetTestResultsResponse>> {
   async getTestResults(body: GetTestResultsRequest) {
      console.log('getTestResults',body, Config.paths.getTestResult)
      //return await this._client.post<GetTestResultsResponse>(Config.paths.getTestResult, body);
      // return await axios.get('https://localhost:44351/api/TestResults/get-blood-tests', {  });

     return await this._client.get<GetTestResultsResponse>(Config.paths.getTestResult);
   }

}