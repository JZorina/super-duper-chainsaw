using SubmitBloodTestResults.Application.Requests;
using SubmitBloodTestResults.Application.ViewModels;
using System.Threading.Tasks;

namespace SubmitBloodTestResults.Application.Interfaces
{
    public interface ITestResultsService
    {
        Task<BloodTestViewModel> GetBloodTestResults(BloodTestRequest body);
    }
}
