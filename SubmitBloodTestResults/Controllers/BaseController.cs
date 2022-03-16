using Microsoft.AspNetCore.Mvc;
using SubmitBloodTestResults.Application.ViewModels;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Threading.Tasks;

namespace SubmitBloodTestResults.Frontend.Controllers
{

    [Route("api/[controller]")]
    [ApiController]
    public class BaseController : ControllerBase
    {
        public BaseController()
        {

        }

        protected IActionResult GetResponse<T>(T data)
        {
            return Ok(new ApiResponse<T>(HttpStatusCode.OK.GetHashCode(), data));
        }
    }
}
