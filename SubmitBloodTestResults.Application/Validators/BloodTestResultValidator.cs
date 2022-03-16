using FluentValidation;
using SubmitBloodTestResults.Application.Requests;
using SubmitBloodTestResults.Application.Utils;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SubmitBloodTestResults.Application.Validators
{
    public class BloodTestResultValidator: AbstractValidator<BloodTestRequest>
    {
        public BloodTestResultValidator()
        {
            RuleFor(i => i.Name)
                .NotEmpty()
                .MinimumLength(Consts.MINIMUM_TEST_NAME_LENGTH)
                .NotNull()
                .WithMessage(Consts.NAME_INVALID);
            RuleFor(i => i.Value)
                .NotEmpty()
                .NotNull()
                .WithMessage(Consts.TEST_VALUE_INVALID);
        }
    }
}
