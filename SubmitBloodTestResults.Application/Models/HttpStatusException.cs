using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Text;
using System.Threading.Tasks;

namespace SubmitBloodTestResults.Application.Middlewares
{
    public class HttpStatusException : Exception
    {
        public HttpStatusException(string errorMessage, HttpStatusCode _statusCode, bool shouldLog = false)
          : base(errorMessage)
        {
            error = errorMessage;
            statusCode = _statusCode;
            ShouldLog = shouldLog;
        }

        public HttpStatusException(string _errorMessage, HttpStatusCode _statusCode, Exception innerException)
            : base(_errorMessage, innerException)
        {
            error = _errorMessage;
            statusCode = _statusCode;
        }

        public HttpStatusException(Exception innerException, HttpStatusCode _statusCode)
            : base(string.Empty, innerException)
        {
            statusCode = _statusCode;
        }

        public bool ShouldLog { get; set; }
        public string error { get; set; }
        public HttpStatusCode statusCode { get; set; }
    }
}
