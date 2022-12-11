using System.Web.Mvc;

namespace Contract.Intimex.Areas.Contract
{
    public class ContractAreaRegistration : AreaRegistration
    {
        public override string AreaName
        {
            get
            {
                return "Contract";
            }
        }

        public override void RegisterArea(AreaRegistrationContext context)
        {
            context.MapRoute(
             "Contract_Intimex",
             "Contract/Intimex/{action}/{id}",
             defaults: new { Controller = "Intimex", action = "Intimex", id = UrlParameter.Optional }
           , namespaces: new[] { "Contract.Intimex.Areas.Contract.Controllers" }
         );
        }
    }
}
