using Microsoft.Extensions.Configuration;
using Newtonsoft.Json;
using SubmitBloodTestResults.Application.Interfaces;
using SubmitBloodTestResults.Application.Middlewares;
using SubmitBloodTestResults.Application.Models.ThirdPartiesClients;
using SubmitBloodTestResults.Application.Requests;
using SubmitBloodTestResults.Application.Utils;
using SubmitBloodTestResults.Application.ViewModels;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Threading.Tasks;

namespace SubmitBloodTestResults.Application.Services
{
    public class TestResultsService: ITestResultsService
    {
        private IConfiguration _configuration;
        private readonly string bloodTestResultDataAddress;
        private readonly HttpClient _httpClient;
        public TestResultsService(IConfiguration configuration)
        {
            _configuration = configuration;
            bloodTestResultDataAddress = _configuration.GetSection("ThirdParties").GetSection("BloodTestData").Value;
            _httpClient = new HttpClient()
            {
                BaseAddress = new Uri(bloodTestResultDataAddress)
            };
        }

        public async Task<BloodTestViewModel> GetBloodTestResults(BloodTestRequest body)
        {
            var result = new BloodTestViewModel();
            var data = await GetBloodTestData();
            var categoryName = GetBloodTestNameEvaluation(data, body.Name);

            if(categoryName.Key is not null)
            {
                result.TestResult = body.Value < categoryName.Value;
                result.TestCategory = categoryName.Key;
            }
            else
            {
                result.TestResult = false;
                result.TestCategory = BloodTestCategoryTypes.UNKNOWN;
            }
            return result;
        }

        private async Task<Dictionary<string,double>> GetBloodTestData()
        {
            try
            {
                var httpRequest = new HttpRequestMessage(HttpMethod.Get, bloodTestResultDataAddress);
                var httpResponse = await _httpClient.SendAsync(httpRequest);
                httpResponse.EnsureSuccessStatusCode();
                var responseString = await httpResponse.Content.ReadAsStringAsync();
                var data = JsonConvert.DeserializeObject<BloodTestResult>(responseString);
                var result = new Dictionary<string, double>();
                foreach (var item in data.BloodTestConfig)
                {
                    result.Add(item.Name, item.Threshold);
                }
                return result;
            }
            catch(Exception ex)
            {
                throw new HttpStatusException(Consts.NO_DATA_ERROR, HttpStatusCode.InternalServerError);
            }
        }

        private KeyValuePair<string, double> GetBloodTestNameEvaluation(Dictionary<string, double> data, string testName)
        {
            var results = FuzzySharp.Process.ExtractSorted(testName, data.Keys);
            if (results.Any(i => i.Score > Consts.MINIMUM_FUZZY_MATCHING_SCORE))
            {
                var greatestScore = results.Max(i => i.Score);
                var name = results.Where(i => i.Score == greatestScore).Select(i => i.Value).FirstOrDefault();
                return new KeyValuePair<string, double>(name, data[name]);
            }
            return new KeyValuePair<string, double>(null, 0.0);

        }
    }
}
