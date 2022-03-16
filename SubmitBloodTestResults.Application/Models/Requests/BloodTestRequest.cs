using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SubmitBloodTestResults.Application.Requests
{
    public class BloodTestRequest
    {
        public string Name { get; set; }
        public double Value { get; set; }
    }
}
