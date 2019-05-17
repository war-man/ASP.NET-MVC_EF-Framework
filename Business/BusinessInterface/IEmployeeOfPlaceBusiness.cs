using Model.Context;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Business.BusinessInterface
{
    public interface IEmployeeOfPlaceBusiness
    {
        List<NHANVIEN> SearchEmployeeByPlaceId(int? placeId);
        List<NHANVIEN> SearchEmployeeByMasterId(int masterId);

        NHANVIEN SearchEmployeeById(int EmployeeId);

        void CreateEmployee(NHANVIEN nv);

        void DeleteEmployee(int EmployeeId);

        void UpdateEmployee(NHANVIEN nv);
    }
}
