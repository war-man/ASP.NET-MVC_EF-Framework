using Model.Context;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Business.BusinessInterface
{
    public interface IMasterYardBusiness
    {
        void CreateMaster(CHUSANQUANLY master);
        bool CheckEmailMaster(string Email);

        List<CHUSANQUANLY> GetMasterByActive(bool IsActive);

        void ActiveMaster(int MasterId);
    }
}
